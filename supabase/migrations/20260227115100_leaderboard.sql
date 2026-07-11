begin;

create table if not exists public.xp_events (
    id bigserial primary key,
    user_id uuid not null references auth.users (id) on delete cascade,
    source text not null,
    source_id text,
    xp_delta integer not null,
    metadata jsonb not null default '{}'::jsonb,
    earned_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    constraint xp_events_xp_delta_nonzero check (xp_delta <> 0)
);

create unique index if not exists xp_events_user_source_source_id_uidx
    on public.xp_events (user_id, source, source_id)
    where source_id is not null;

create index if not exists xp_events_user_id_earned_at_idx
    on public.xp_events (user_id, earned_at desc);

create index if not exists xp_events_earned_at_idx
    on public.xp_events (earned_at desc);

alter table public.xp_events enable row level security;

drop policy if exists xp_events_insert_own on public.xp_events;
create policy xp_events_insert_own
    on public.xp_events
    for insert
    to authenticated
    with check (auth.uid() = user_id);

drop policy if exists xp_events_select_own on public.xp_events;
create policy xp_events_select_own
    on public.xp_events
    for select
    to authenticated
    using (auth.uid() = user_id);

create or replace function public.record_xp_event(
    p_source text,
    p_source_id text default null,
    p_xp_delta integer default 0,
    p_metadata jsonb default '{}'::jsonb
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
    inserted_id bigint;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if coalesce(trim(p_source), '') = '' then
        raise exception 'p_source is required';
    end if;

    if p_xp_delta = 0 then
        raise exception 'p_xp_delta cannot be zero';
    end if;

    insert into public.xp_events (
        user_id,
        source,
        source_id,
        xp_delta,
        metadata
    ) values (
        auth.uid(),
        p_source,
        nullif(trim(p_source_id), ''),
        p_xp_delta,
        coalesce(p_metadata, '{}'::jsonb)
    )
    on conflict (user_id, source, source_id)
    where source_id is not null
    do nothing
    returning id into inserted_id;

    return inserted_id is not null;
end;
$$;

revoke all on function public.record_xp_event(text, text, integer, jsonb) from public;
grant execute on function public.record_xp_event(text, text, integer, jsonb) to authenticated;

create or replace function public.get_xp_leaderboard(
    p_period text default 'all_time',
    p_limit integer default 25
)
returns table (
    rank bigint,
    user_id uuid,
    display_name text,
    xp bigint,
    is_current_user boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
    safe_limit integer := greatest(1, least(coalesce(p_limit, 25), 100));
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if p_period not in ('week', 'all_time') then
        raise exception 'p_period must be week or all_time';
    end if;

    return query
    with base as (
        select
            e.user_id,
            sum(e.xp_delta)::bigint as xp
        from public.xp_events e
        where p_period = 'week'
          and e.earned_at >= date_trunc('week', now())
        group by e.user_id

        union all

        select
            p.user_id,
            coalesce(p.xp, 0)::bigint as xp
        from public.user_progress p
        where p_period = 'all_time'
    ),
    filtered as (
        select
            b.user_id,
            b.xp
        from base b
        where b.xp > 0
    ),
    ranked as (
        select
            f.user_id,
            f.xp,
            dense_rank() over (order by f.xp desc, f.user_id) as rank
        from filtered f
    )
    select
        r.rank,
        r.user_id,
        coalesce(
            nullif(u.raw_user_meta_data ->> 'full_name', ''),
            nullif(u.raw_user_meta_data ->> 'name', ''),
            nullif(u.raw_user_meta_data ->> 'user_name', ''),
            nullif(split_part(u.email, '@', 1), ''),
            'Learner'
        ) as display_name,
        r.xp,
        (r.user_id = auth.uid()) as is_current_user
    from ranked r
    left join auth.users u
      on u.id = r.user_id
    where r.rank <= safe_limit
       or r.user_id = auth.uid()
    order by r.rank, r.user_id;
end;
$$;

revoke all on function public.get_xp_leaderboard(text, integer) from public;
grant execute on function public.get_xp_leaderboard(text, integer) to authenticated;

commit;
