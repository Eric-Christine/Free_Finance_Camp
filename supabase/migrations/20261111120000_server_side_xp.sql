begin;

-- XP is now decided server-side. Previously the client sent its own xp_delta
-- (and wrote user_progress.xp directly), so anyone could set any leaderboard score.

create table if not exists public.lesson_xp_rewards (
    lesson_id text primary key,
    xp integer not null check (xp > 0)
);

-- No policies: only the security definer functions below read this table.
alter table public.lesson_xp_rewards enable row level security;

-- Keep in sync with the curriculum via `node scripts/generate-lesson-xp-sql.mjs`.
insert into public.lesson_xp_rewards (lesson_id, xp)
values
    ('lesson-1-0', 20),
    ('lesson-1-1', 15),
    ('lesson-1-2', 20),
    ('lesson-1-3', 25),
    ('lesson-1-4', 25),
    ('lesson-2-1', 25),
    ('lesson-2-2', 25),
    ('lesson-2-3', 25),
    ('lesson-10-1', 40),
    ('lesson-10-2', 50),
    ('lesson-10-3', 60),
    ('lesson-15-1', 30),
    ('lesson-15-2', 30),
    ('lesson-15-3', 35),
    ('lesson-15-4', 40),
    ('lesson-6-1', 30),
    ('lesson-6-2', 25),
    ('lesson-6-3', 30),
    ('lesson-6-4', 35),
    ('lesson-22-1', 45),
    ('lesson-22-2', 50),
    ('lesson-22-3', 50),
    ('lesson-22-4', 55),
    ('lesson-22-5', 55),
    ('lesson-3-1', 20),
    ('lesson-3-2', 35),
    ('lesson-3-3', 25),
    ('lesson-3-4', 30),
    ('lesson-3-5', 35),
    ('lesson-3-6', 40),
    ('lesson-roth-1', 30),
    ('lesson-roth-2', 30),
    ('lesson-roth-3', 30),
    ('lesson-roth-4', 35),
    ('lesson-401k-1', 25),
    ('lesson-401k-2', 35),
    ('lesson-401k-3', 25),
    ('lesson-401k-4', 25),
    ('lesson-401k-5', 30),
    ('lesson-21-1', 40),
    ('lesson-21-2', 45),
    ('lesson-21-3', 50),
    ('lesson-21-4', 50),
    ('lesson-21-5', 55),
    ('lesson-14-1', 35),
    ('lesson-14-2', 40),
    ('lesson-14-3', 35),
    ('lesson-14-4', 35),
    ('lesson-12-1', 35),
    ('lesson-12-2', 30),
    ('lesson-12-3', 35),
    ('lesson-12-4', 40),
    ('lesson-12-5', 45),
    ('lesson-12-6', 35),
    ('lesson-13-1', 35),
    ('lesson-13-2', 35),
    ('lesson-13-3', 30),
    ('lesson-13-4', 40),
    ('lesson-5-1', 35),
    ('lesson-5-2', 25),
    ('lesson-5-3', 30),
    ('lesson-5-4', 35),
    ('lesson-4-1', 35),
    ('lesson-4-2', 30),
    ('lesson-4-3', 35),
    ('lesson-11-1', 35),
    ('lesson-11-2', 30),
    ('lesson-11-3', 40),
    ('lesson-11-4', 30),
    ('lesson-11-5', 40),
    ('lesson-7-1', 40),
    ('lesson-7-2', 40),
    ('lesson-7-3', 50),
    ('lesson-26-1', 40),
    ('lesson-26-2', 45),
    ('lesson-26-3', 45),
    ('lesson-26-4', 50),
    ('lesson-26-5', 55),
    ('lesson-8-1', 40),
    ('lesson-8-2', 40),
    ('lesson-8-3', 45),
    ('lesson-8-4', 45),
    ('lesson-16-1', 35),
    ('lesson-16-2', 40),
    ('lesson-16-3', 45),
    ('lesson-16-4', 55),
    ('lesson-16-5', 55),
    ('lesson-9-1', 50),
    ('lesson-9-2', 50),
    ('lesson-9-3', 50),
    ('lesson-9-4', 60),
    ('lesson-24-1', 45),
    ('lesson-24-2', 50),
    ('lesson-24-3', 50),
    ('lesson-24-4', 55),
    ('lesson-24-5', 55),
    ('lesson-kids-1', 35),
    ('lesson-kids-2', 40),
    ('lesson-kids-3', 45),
    ('lesson-23-1', 45),
    ('lesson-23-2', 50),
    ('lesson-23-3', 50),
    ('lesson-23-4', 55),
    ('lesson-23-5', 55),
    ('lesson-25-1', 45),
    ('lesson-25-2', 50),
    ('lesson-25-3', 55),
    ('lesson-25-4', 55),
    ('lesson-25-5', 60),
    ('lesson-17-1', 40),
    ('lesson-27-1', 35),
    ('lesson-28-1', 40)
on conflict (lesson_id) do update set xp = excluded.xp;

-- Clients may only record XP through record_xp_event.
drop policy if exists xp_events_insert_own on public.xp_events;

-- Remove events that never matched a real lesson, and correct inflated amounts.
delete from public.xp_events e
where e.source <> 'lesson_completion'
   or not exists (
        select 1
        from public.lesson_xp_rewards r
        where r.lesson_id = e.source_id
   );

update public.xp_events e
set xp_delta = r.xp
from public.lesson_xp_rewards r
where e.source = 'lesson_completion'
  and e.source_id = r.lesson_id
  and e.xp_delta <> r.xp;

-- Backfill lessons completed before XP events existed, so all-time totals can
-- come from xp_events. Dated in the past so they do not count toward this week.
insert into public.xp_events (user_id, source, source_id, xp_delta, metadata, earned_at)
select
    p.user_id,
    'lesson_completion',
    r.lesson_id,
    r.xp,
    '{"backfill": true}'::jsonb,
    timestamptz '2026-02-27 00:00:00+00'
from public.user_progress p
join auth.users u
  on u.id = p.user_id
cross join lateral jsonb_array_elements_text(to_jsonb(p.completed_lessons)) as c(lesson_id)
join public.lesson_xp_rewards r
  on r.lesson_id = c.lesson_id
on conflict (user_id, source, source_id)
where source_id is not null
do nothing;

-- Same signature as before so existing clients keep working; p_xp_delta and
-- p_metadata are ignored and the amount comes from lesson_xp_rewards.
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
    v_lesson_id text := nullif(trim(p_source_id), '');
    reward integer;
    inserted_id bigint;
begin
    if auth.uid() is null then
        raise exception 'Authentication required';
    end if;

    if p_source is distinct from 'lesson_completion' then
        raise exception 'Unsupported XP source';
    end if;

    select r.xp
    into reward
    from public.lesson_xp_rewards r
    where r.lesson_id = v_lesson_id;

    if reward is null then
        raise exception 'Unknown lesson';
    end if;

    insert into public.xp_events (
        user_id,
        source,
        source_id,
        xp_delta
    ) values (
        auth.uid(),
        'lesson_completion',
        v_lesson_id,
        reward
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

-- All-time totals now come from xp_events instead of the client-written
-- user_progress.xp, and display names no longer fall back to email addresses.
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
    with real_base as (
        select
            e.user_id,
            sum(e.xp_delta)::bigint as xp,
            null::text as seed_display_name
        from public.xp_events e
        where p_period = 'all_time'
           or e.earned_at >= date_trunc('week', now())
        group by e.user_id
    ),
    seed_base as (
        select
            s.id as user_id,
            case
                when p_period = 'week' then s.weekly_xp::bigint
                else s.all_time_xp::bigint
            end as xp,
            s.display_name as seed_display_name
        from public.leaderboard_seed_entries s
        where s.is_active = true
    ),
    combined as (
        select
            b.user_id,
            b.xp,
            b.seed_display_name
        from real_base b
        where b.xp > 0

        union all

        select
            s.user_id,
            s.xp,
            s.seed_display_name
        from seed_base s
        where s.xp > 0
    ),
    ranked as (
        select
            c.user_id,
            c.xp,
            c.seed_display_name,
            dense_rank() over (order by c.xp desc, c.user_id) as rank
        from combined c
    )
    select
        r.rank,
        r.user_id,
        coalesce(
            r.seed_display_name,
            -- "First L." from the OAuth profile name; anything email-like is hidden.
            case
                when n.full_name is null or n.full_name like '%@%' then null
                when n.full_name !~ '\s' then n.full_name
                else split_part(n.full_name, ' ', 1) || ' ' || left(substring(n.full_name from '(\S+)$'), 1) || '.'
            end,
            'Learner'
        ) as display_name,
        r.xp,
        (r.user_id = auth.uid()) as is_current_user
    from ranked r
    left join auth.users u
      on u.id = r.user_id
    left join lateral (
        select nullif(regexp_replace(trim(coalesce(
            nullif(trim(u.raw_user_meta_data ->> 'full_name'), ''),
            u.raw_user_meta_data ->> 'name'
        )), '\s+', ' ', 'g'), '') as full_name
    ) n on true
    where r.rank <= safe_limit
       or r.user_id = auth.uid()
    order by r.rank, r.user_id;
end;
$$;

revoke all on function public.get_xp_leaderboard(text, integer) from public;
grant execute on function public.get_xp_leaderboard(text, integer) to authenticated;

commit;
