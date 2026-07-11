begin;

create table if not exists public.leaderboard_seed_entries (
    id uuid primary key default gen_random_uuid(),
    display_name text not null,
    weekly_xp integer not null check (weekly_xp >= 0),
    all_time_xp integer not null check (all_time_xp >= 0),
    is_active boolean not null default true,
    created_at timestamptz not null default now()
);

insert into public.leaderboard_seed_entries (display_name, weekly_xp, all_time_xp)
select v.display_name, v.weekly_xp, v.all_time_xp
from (
    values
        ('Avery Chen', 520, 6810),
        ('Noah Patel', 490, 6340),
        ('Mia Thompson', 455, 5925),
        ('Luca Hernandez', 430, 5480),
        ('Zoe Kim', 402, 5235),
        ('Ethan Rivera', 380, 4970),
        ('Sofia Brooks', 348, 4715),
        ('Mason Nguyen', 330, 4550),
        ('Amelia Scott', 305, 4310),
        ('Logan Price', 288, 4140),
        ('Chloe Davis', 270, 3975),
        ('James Foster', 252, 3795),
        ('Ella Morgan', 236, 3620),
        ('Benjamin Ward', 218, 3440),
        ('Aria Bell', 205, 3290)
) as v(display_name, weekly_xp, all_time_xp)
where not exists (
    select 1
    from public.leaderboard_seed_entries s
);

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
        where p_period = 'week'
          and e.earned_at >= date_trunc('week', now())
        group by e.user_id

        union all

        select
            p.user_id,
            coalesce(p.xp, 0)::bigint as xp,
            null::text as seed_display_name
        from public.user_progress p
        where p_period = 'all_time'
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
