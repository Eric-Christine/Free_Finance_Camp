import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isRealAuth, supabase } from '../lib/supabase';
import SEO from './SEO';

const PERIODS = [
    { key: 'week', label: 'This Week' },
    { key: 'all_time', label: 'All Time' }
];

function formatXp(value) {
    return new Intl.NumberFormat().format(value || 0);
}

function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (parts.length === 0) return '??';
    return parts.map((part) => part[0]?.toUpperCase() || '').join('');
}

function getRankBadge(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
}

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [period, setPeriod] = useState('week');
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCancelled = false;

        async function fetchLeaderboard() {
            if (!user) {
                setEntries([]);
                setError('Sign in to view the leaderboard.');
                setIsLoading(false);
                return;
            }

            if (!isRealAuth || !supabase) {
                setEntries([]);
                setError('Leaderboard requires Supabase auth configuration.');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                const { data, error: rpcError } = await supabase.rpc('get_xp_leaderboard', {
                    p_period: period,
                    p_limit: 50
                });

                if (rpcError) throw rpcError;
                if (!isCancelled) {
                    setEntries(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (!isCancelled) {
                    setEntries([]);
                    setError(err?.message || 'Unable to load leaderboard right now.');
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        }

        fetchLeaderboard();

        return () => {
            isCancelled = true;
        };
    }, [period, user]);

    const currentUserEntry = useMemo(
        () => entries.find((entry) => entry.is_current_user || entry.user_id === user?.id),
        [entries, user?.id]
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <SEO
                title="Leaderboard"
                description="Compare your weekly and all-time XP ranking against other Free Finance Camp learners."
                path="/leaderboard"
                noindex={true}
            />

            <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>XP Leaderboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Compare your progress against other signed-in learners.
                    </p>
                </div>
                <Link to="/map" className="btn btn-outline">
                    ← Back to Map
                </Link>
            </header>

            <section style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-hover)', borderRadius: '999px', padding: '0.2rem', gap: '0.25rem' }}>
                    {PERIODS.map((option) => (
                        <button
                            key={option.key}
                            type="button"
                            onClick={() => setPeriod(option.key)}
                            style={{
                                border: 'none',
                                borderRadius: '999px',
                                padding: '0.45rem 0.85rem',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                backgroundColor: period === option.key ? 'var(--primary)' : 'transparent',
                                color: period === option.key ? '#fff' : 'var(--text-main)'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {currentUserEntry && (
                    <div style={{
                        padding: '0.5rem 0.8rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--primary)',
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        fontSize: '0.85rem'
                    }}>
                        You are <strong>#{currentUserEntry.rank}</strong> with <strong>{formatXp(currentUserEntry.xp)} XP</strong>
                    </div>
                )}
            </section>

            <section style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden'
            }}>
                {isLoading && (
                    <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>Loading leaderboard...</div>
                )}

                {!isLoading && error && (
                    <div style={{ padding: '1rem', color: '#ef4444' }}>{error}</div>
                )}

                {!isLoading && !error && entries.length === 0 && (
                    <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                        No leaderboard data yet. Complete a lesson to earn XP and appear here.
                    </div>
                )}

                {!isLoading && !error && entries.length > 0 && (
                    <div>
                        {entries.map((entry) => {
                            const isCurrentUser = entry.is_current_user || entry.user_id === user?.id;
                            return (
                                <div
                                    key={`${entry.user_id}-${entry.rank}`}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '88px minmax(0, 1fr) auto',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.85rem 1rem',
                                        borderBottom: '1px solid var(--border)',
                                        backgroundColor: isCurrentUser ? 'rgba(16, 185, 129, 0.08)' : 'transparent'
                                    }}
                                >
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{getRankBadge(entry.rank)}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                                        <div style={{
                                            width: '34px',
                                            height: '34px',
                                            borderRadius: '50%',
                                            backgroundColor: isCurrentUser ? 'var(--primary)' : 'var(--bg-hover)',
                                            color: isCurrentUser ? '#fff' : 'var(--text-main)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            flexShrink: 0
                                        }}>
                                            {getInitials(entry.display_name)}
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{
                                                fontWeight: isCurrentUser ? 700 : 600,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {entry.display_name || 'Learner'}
                                                {isCurrentUser ? ' (You)' : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{formatXp(entry.xp)} XP</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
