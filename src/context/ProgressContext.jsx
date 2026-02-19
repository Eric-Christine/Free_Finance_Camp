import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase, isRealAuth } from '../lib/supabase';
import { logGoalCompletion } from '../lib/analytics';

const ProgressContext = createContext();
const PROGRESS_TABLE = 'user_progress';

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function daysBetweenDateStrings(start, end) {
    const [sy, sm, sd] = String(start).split('-').map(Number);
    const [ey, em, ed] = String(end).split('-').map(Number);
    if (!sy || !sm || !sd || !ey || !em || !ed) return Number.POSITIVE_INFINITY;
    const startUtc = Date.UTC(sy, sm - 1, sd);
    const endUtc = Date.UTC(ey, em - 1, ed);
    return Math.round((endUtc - startUtc) / (1000 * 60 * 60 * 24));
}

// Level thresholds
const LEVELS = [
    { level: 1, title: 'Finance Newbie', minXp: 0 },
    { level: 2, title: 'Money Manager', minXp: 50 },
    { level: 3, title: 'Budget Boss', minXp: 150 },
    { level: 4, title: 'Investor-in-Training', minXp: 300 },
    { level: 5, title: 'Wealth Builder', minXp: 500 },
    { level: 6, title: 'Financial Master', minXp: 750 },
];

export function ProgressProvider({ children }) {
    const { user } = useAuth();
    const [completedLessons, setCompletedLessons] = useState([]);
    const [xp, setXp] = useState(0);
    const [quizScores, setQuizScores] = useState({});
    const [streakCount, setStreakCount] = useState(0);
    const [lastActiveDate, setLastActiveDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showStreakModal, setShowStreakModal] = useState(false);

    // Haptic Feedback Utility
    const triggerHaptics = useCallback(() => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([50, 30, 50]); // Short double pulse
        }
    }, []);

    // Streak Logic
    const updateStreak = useCallback(() => {
        const today = getLocalDateString();

        if (lastActiveDate === today) return; // Already active today

        let newStreak = 1;
        if (lastActiveDate) {
            const diffDays = daysBetweenDateStrings(lastActiveDate, today);

            if (diffDays === 1) {
                newStreak = streakCount + 1;
            }
        }

        setStreakCount(newStreak);
        setLastActiveDate(today);
        setShowStreakModal(true);
        triggerHaptics();

        return newStreak;
    }, [lastActiveDate, streakCount, triggerHaptics]);

    // Save to localStorage (fallback)
    const saveToLocalStorage = useCallback((completed, userXp, quizzes, streak, lastActive) => {
        if (user) {
            localStorage.setItem(`ffc_progress_${user.id}`, JSON.stringify({
                completed,
                userXp,
                quizzes,
                streak,
                lastActive
            }));
        }
    }, [user]);

    // Sync to Supabase
    const syncToSupabase = useCallback(async (completed, userXp, quizzes, streak, lastActive) => {
        if (!user || !isRealAuth) return;

        try {
            const { error } = await supabase
                .from(PROGRESS_TABLE)
                .upsert({
                    user_id: user.id,
                    completed_lessons: completed,
                    xp: userXp,
                    quiz_scores: quizzes,
                    streak_count: streak,
                    last_active_date: lastActive
                }, { onConflict: 'user_id' });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Failed to sync to Supabase:', error);
        }
    }, [user]);

    // Load progress when user changes
    useEffect(() => {
        async function loadProgress() {
            setIsLoading(true);

            if (!user) {
                setCompletedLessons([]);
                setXp(0);
                setQuizScores({});
                setStreakCount(0);
                setLastActiveDate(null);
                setIsLoading(false);
                return;
            }

            // Try Supabase first (if real auth)
            if (isRealAuth) {
                try {
                    const { data, error } = await supabase
                        .from(PROGRESS_TABLE)
                        .select('xp, completed_lessons, quiz_scores, streak_count, last_active_date')
                        .eq('user_id', user.id)
                        .maybeSingle();

                    if (data && !error) {
                        setCompletedLessons(data.completed_lessons || []);
                        setXp(data.xp || 0);
                        setQuizScores(data.quiz_scores || {});
                        setStreakCount(data.streak_count || 0);
                        setLastActiveDate(data.last_active_date || null);
                        setIsLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error('Failed to load from Supabase:', error);
                }
            }

            // Fallback to localStorage
            const savedProgress = localStorage.getItem(`ffc_progress_${user.id}`);
            if (savedProgress) {
                const { completed, userXp, quizzes, streak, lastActive } = JSON.parse(savedProgress);
                setCompletedLessons(completed || []);
                setXp(userXp || 0);
                setQuizScores(quizzes || {});
                setStreakCount(streak || 0);
                setLastActiveDate(lastActive || null);
            } else {
                setCompletedLessons([]);
                setXp(0);
                setQuizScores({});
                setStreakCount(0);
                setLastActiveDate(null);
            }
            setIsLoading(false);
        }

        loadProgress();
    }, [user]);

    // Save quiz score (keep best score)
    const saveQuizScore = (lessonId, score) => {
        const currentBest = quizScores[lessonId] || 0;
        const bestScore = Math.max(score, currentBest);
        const newStreak = updateStreak();

        if (bestScore > currentBest || newStreak) {
            const shouldUpdateScore = bestScore > currentBest;
            const newScores = shouldUpdateScore ? { ...quizScores, [lessonId]: bestScore } : quizScores;
            if (shouldUpdateScore) {
                setQuizScores(newScores);
            }

            const finalStreak = newStreak || streakCount;
            const finalDate = newStreak ? getLocalDateString() : lastActiveDate;

            saveToLocalStorage(completedLessons, xp, newScores, finalStreak, finalDate);
            syncToSupabase(completedLessons, xp, newScores, finalStreak, finalDate);
        }
    };

    const getQuizScore = (lessonId) => quizScores[lessonId] || 0;

    const completeLesson = (lessonId, xpReward = 10) => {
        const newStreak = updateStreak();

        if (!completedLessons.includes(lessonId) || newStreak) {
            const isNewLesson = !completedLessons.includes(lessonId);
            const newCompleted = isNewLesson ? [...completedLessons, lessonId] : completedLessons;
            const newXp = isNewLesson ? xp + xpReward : xp;

            const finalStreak = newStreak || streakCount;
            const finalDate = newStreak ? getLocalDateString() : lastActiveDate;

            setCompletedLessons(newCompleted);
            setXp(newXp);
            saveToLocalStorage(newCompleted, newXp, quizScores, finalStreak, finalDate);
            syncToSupabase(newCompleted, newXp, quizScores, finalStreak, finalDate);

            if (isNewLesson) {
                void logGoalCompletion('lesson_completion', {
                    lesson_id: lessonId,
                    xp_awarded: xpReward,
                    total_xp: newXp,
                    streak_count: finalStreak
                });
            }
        }
    };

    const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

    // Get current level info
    const getCurrentLevel = () => {
        let currentLevel = LEVELS[0];
        for (const level of LEVELS) {
            if (xp >= level.minXp) {
                currentLevel = level;
            } else {
                break;
            }
        }
        return currentLevel;
    };

    const getNextLevel = () => {
        const current = getCurrentLevel();
        const nextIdx = LEVELS.findIndex(l => l.level === current.level) + 1;
        return LEVELS[nextIdx] || null;
    };

    const getProgressToNextLevel = () => {
        const current = getCurrentLevel();
        const next = getNextLevel();
        if (!next) return 100; // Max level
        const xpIntoLevel = xp - current.minXp;
        const xpNeeded = next.minXp - current.minXp;
        return Math.round((xpIntoLevel / xpNeeded) * 100);
    };

    return (
        <ProgressContext.Provider value={{
            completedLessons,
            xp,
            streakCount,
            showStreakModal,
            setShowStreakModal,
            completeLesson,
            isLessonCompleted,
            getCurrentLevel,
            getNextLevel,
            getProgressToNextLevel,
            saveQuizScore,
            getQuizScore,
            isLoading
        }}>
            {children}
            {/* Streak Modal */}
            {showStreakModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '3rem 2rem',
                        borderRadius: '24px',
                        border: '1px solid var(--primary)',
                        textAlign: 'center',
                        maxWidth: '350px',
                        boxShadow: '0 0 50px rgba(16, 185, 129, 0.3)',
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1rem',
                            filter: 'drop-shadow(0 0 10px var(--primary))'
                        }}>🔥</div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{streakCount} Day Streak!</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You're on fire! Keep the learning momentum going.</p>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontWeight: 'bold' }}
                            onClick={() => setShowStreakModal(false)}
                        >
                            Continue Learning
                        </button>
                    </div>
                    <style>{`
                        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes popIn { 
                            from { opacity: 0; transform: scale(0.8); } 
                            to { opacity: 1; transform: scale(1); } 
                        }
                    `}</style>
                </div>
            )}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => useContext(ProgressContext);
