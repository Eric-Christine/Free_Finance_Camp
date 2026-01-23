import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

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

    // Load progress when user changes
    useEffect(() => {
        if (user) {
            const savedProgress = localStorage.getItem(`ffc_progress_${user.id}`);
            if (savedProgress) {
                const { completed, userXp } = JSON.parse(savedProgress);
                setCompletedLessons(completed || []);
                setXp(userXp || 0);
            } else {
                setCompletedLessons([]);
                setXp(0);
            }
        } else {
            setCompletedLessons([]);
            setXp(0);
        }
    }, [user]);

    const completeLesson = (lessonId, xpReward = 10) => {
        if (!completedLessons.includes(lessonId)) {
            const newCompleted = [...completedLessons, lessonId];
            const newXp = xp + xpReward;

            setCompletedLessons(newCompleted);
            setXp(newXp);

            if (user) {
                localStorage.setItem(`ffc_progress_${user.id}`, JSON.stringify({
                    completed: newCompleted,
                    userXp: newXp
                }));
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
            completeLesson,
            isLessonCompleted,
            getCurrentLevel,
            getNextLevel,
            getProgressToNextLevel
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => useContext(ProgressContext);
