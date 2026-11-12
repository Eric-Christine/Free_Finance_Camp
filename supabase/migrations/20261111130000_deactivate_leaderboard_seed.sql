begin;

-- The seed entries were placeholder learners with more XP than the whole
-- curriculum awards, so real learners could never pass them. Hide them from
-- get_xp_leaderboard (it only reads active rows); set is_active = true to restore.
update public.leaderboard_seed_entries
set is_active = false
where is_active = true;

commit;
