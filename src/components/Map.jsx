import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Map() {
    const { isLessonCompleted, xp, getCurrentLevel, getNextLevel, getProgressToNextLevel, getQuizScore } = useProgress();
    const { signOut } = useAuth();
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    const progressPercent = getProgressToNextLevel();

    // Calculate total progress
    const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = curriculum.reduce((acc, m) =>
        acc + m.lessons.filter(l => isLessonCompleted(l.id)).length, 0);
    const overallProgress = Math.round((completedCount / totalLessons) * 100);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* User Stats Bar */}
            <div style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        {currentLevel.level}
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{currentLevel.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            ⭐ {xp} XP {nextLevel && `• ${nextLevel.minXp - xp} XP to Level ${nextLevel.level}`}
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        <span>Level Progress</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div style={{
                        height: '8px',
                        backgroundColor: 'var(--bg-hover)',
                        borderRadius: '999px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${progressPercent}%`,
                            backgroundColor: 'var(--accent)',
                            borderRadius: '999px',
                            transition: 'width 0.3s'
                        }} />
                    </div>
                </div>

                <Link to="/vocab" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                    📖 Review Vocab
                </Link>
                <button onClick={signOut} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                    Sign Out
                </button>
            </div>

            {/* Overall Progress */}
            <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 'var(--radius)',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
                border: '1px solid var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ fontSize: '2rem' }}>🎯</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Course Progress</span>
                        <span>{completedCount}/{totalLessons} lessons ({overallProgress}%)</span>
                    </div>
                    <div style={{
                        height: '10px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '999px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${overallProgress}%`,
                            backgroundColor: 'var(--primary)',
                            borderRadius: '999px',
                            transition: 'width 0.3s'
                        }} />
                    </div>
                </div>
            </div>

            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    Your Financial Roadmap
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    Complete lessons to earn XP and level up!
                </p>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {curriculum.map((module, index) => {
                    const moduleCompleted = module.lessons.filter(l => isLessonCompleted(l.id)).length;
                    const moduleProgress = Math.round((moduleCompleted / module.lessons.length) * 100);

                    return (
                        <div key={module.id} style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                backgroundColor: 'var(--bg-card)',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{
                                    padding: '1.25rem 1.5rem',
                                    borderBottom: '1px solid var(--border)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.02)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{
                                                backgroundColor: moduleProgress === 100 ? 'var(--primary)' : 'var(--bg-hover)',
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.8rem'
                                            }}>
                                                {moduleProgress === 100 ? '✓' : index + 1}
                                            </span>
                                            {module.title}
                                        </h2>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {module.xpReward && (
                                                <span style={{
                                                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                                    color: 'var(--accent)',
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: 'var(--radius)',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    +{module.xpReward} XP
                                                </span>
                                            )}
                                            <span style={{
                                                backgroundColor: moduleProgress === 100 ? 'var(--primary)' : 'var(--bg-hover)',
                                                color: 'white',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '999px',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {moduleCompleted}/{module.lessons.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '4px',
                                            backgroundColor: 'var(--bg-hover)',
                                            borderRadius: '999px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${moduleProgress}%`,
                                                backgroundColor: 'var(--primary)',
                                                borderRadius: '999px',
                                                transition: 'width 0.3s'
                                            }} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {module.lessons.map((lesson, lessonIndex) => {
                                        // Determine if lesson is locked
                                        // Lesson is locked if the previous lesson's quiz hasn't been passed
                                        let isLocked = false;

                                        if (lessonIndex === 0) {
                                            // First lesson of a module: check if previous module's last lesson was passed
                                            const moduleIndex = curriculum.indexOf(module);
                                            if (moduleIndex > 0) {
                                                const prevModule = curriculum[moduleIndex - 1];
                                                const prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
                                                isLocked = getQuizScore(prevLesson.id) < 2;
                                            }
                                        } else {
                                            // Check the previous lesson in this module
                                            const prevLesson = module.lessons[lessonIndex - 1];
                                            isLocked = getQuizScore(prevLesson.id) < 2;
                                        }

                                        return (
                                            <Link
                                                to={isLocked ? '#' : `/learn/${lesson.id}`}
                                                key={lesson.id}
                                                onClick={e => isLocked && e.preventDefault()}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '0.85rem 1.5rem',
                                                    borderBottom: '1px solid var(--border)',
                                                    color: isLocked ? 'var(--text-muted)' : 'var(--text-main)',
                                                    transition: 'background-color 0.2s',
                                                    opacity: isLocked ? 0.5 : 1,
                                                    cursor: isLocked ? 'not-allowed' : 'pointer'
                                                }}
                                                onMouseEnter={e => !isLocked && (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <div style={{
                                                    width: '22px',
                                                    height: '22px',
                                                    borderRadius: '50%',
                                                    border: '2px solid ' + (isLessonCompleted(lesson.id) ? 'var(--primary)' : isLocked ? 'var(--bg-hover)' : 'var(--text-muted)'),
                                                    backgroundColor: isLessonCompleted(lesson.id) ? 'var(--primary)' : 'transparent',
                                                    marginRight: '1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontSize: '0.7rem',
                                                    flexShrink: 0
                                                }}>
                                                    {isLocked ? '🔒' : isLessonCompleted(lesson.id) && '✓'}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '0.95rem', marginBottom: '0.15rem' }}>{lesson.title}</h3>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lesson.description}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {lesson.xpReward && (
                                                        <span style={{
                                                            fontSize: '0.7rem',
                                                            color: isLocked ? 'var(--text-muted)' : 'var(--accent)',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            +{lesson.xpReward} XP
                                                        </span>
                                                    )}
                                                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                                        {isLocked ? '' : '→'}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
