import { useState, useEffect } from 'react';
import { quizzes } from '../data/quizzes';
import { useProgress } from '../context/ProgressContext';

export default function Quiz({ lessonId, xpReward, onPass }) {
    const { saveQuizScore, getQuizScore, completeLesson, isLessonCompleted } = useProgress();
    const questions = quizzes[lessonId] || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answered, setAnswered] = useState(false);

    // Reset quiz state when lesson changes
    useEffect(() => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResults(false);
        setAnswered(false);
    }, [lessonId]);

    const bestScore = getQuizScore(lessonId);
    const passed = bestScore >= 2;

    const handleAnswer = (optionIndex) => {
        if (answered) return;
        setSelectedAnswer(optionIndex);
        setAnswered(true);

        if (optionIndex === questions[currentIndex].correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswered(false);
        } else {
            // Quiz complete - score already includes all answers
            setShowResults(true);
            saveQuizScore(lessonId, score);

            if (score >= 2 && !isLessonCompleted(lessonId)) {
                completeLesson(lessonId, xpReward);
                if (onPass) onPass();
            }
        }
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResults(false);
        setAnswered(false);
    };

    if (questions.length === 0) {
        return null; // No quiz for this lesson
    }

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            marginTop: '2rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h3 style={{ margin: 0 }}>📝 Lesson Quiz</h3>
                {bestScore > 0 && (
                    <span style={{
                        backgroundColor: passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: passed ? '#10b981' : '#ef4444',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        Best: {bestScore}/3 {passed ? '✓' : ''}
                    </span>
                )}
            </div>

            {showResults ? (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                    }}>
                        {score >= 2 ? '🎉' : '😔'}
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>
                        {score >= 2 ? 'You Passed!' : 'Try Again'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        You scored {score}/3. {score >= 2 ? 'Great job!' : 'You need 2/3 to pass.'}
                    </p>
                    {score < 2 && (
                        <button className="btn btn-primary" onClick={handleRetry}>
                            Retry Quiz
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.75rem'
                    }}>
                        Question {currentIndex + 1} of {questions.length}
                    </div>

                    <p style={{
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        marginBottom: '1rem'
                    }}>
                        {questions[currentIndex].question}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {questions[currentIndex].options.map((option, idx) => {
                            let bgColor = 'var(--bg-main)';
                            let borderColor = 'var(--border)';

                            if (answered) {
                                if (idx === questions[currentIndex].correctIndex) {
                                    bgColor = 'rgba(16, 185, 129, 0.2)';
                                    borderColor = '#10b981';
                                } else if (idx === selectedAnswer && idx !== questions[currentIndex].correctIndex) {
                                    bgColor = 'rgba(239, 68, 68, 0.2)';
                                    borderColor = '#ef4444';
                                }
                            } else if (idx === selectedAnswer) {
                                bgColor = 'rgba(59, 130, 246, 0.2)';
                                borderColor = 'var(--secondary)';
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={answered}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        backgroundColor: bgColor,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: 'var(--radius)',
                                        cursor: answered ? 'default' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        color: 'var(--text-main)',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {answered && (
                        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                            <button className="btn btn-primary" onClick={handleNext}>
                                {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
