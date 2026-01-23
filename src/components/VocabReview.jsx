import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { vocabulary } from '../data/vocabulary';

export default function VocabReview() {
    const { isLessonCompleted } = useProgress();
    const [unlockedVocab, setUnlockedVocab] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Filter vocab based on completed lessons
    useEffect(() => {
        const available = vocabulary.filter(item => isLessonCompleted(item.lessonId));
        setUnlockedVocab(available);
    }, [isLessonCompleted]);

    const handleNext = () => {
        if (currentIndex < unlockedVocab.length - 1) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (unlockedVocab.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Vocabulary Unlocked Yet</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Complete lessons to unlock flashcards for review!
                </p>
                <Link to="/map" className="btn btn-primary">Go to Lessons</Link>
            </div>
        );
    }

    const currentCard = unlockedVocab[currentIndex];

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/map" style={{ color: 'var(--text-muted)' }}>← Back to Map</Link>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Vocabulary Review</h1>
                <div style={{ width: '80px' }}></div> {/* Spacer */}
            </header>

            {/* Flashcard Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                    onClick={handleFlip}
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        height: '350px',
                        perspective: '1000px',
                        cursor: 'pointer',
                        marginBottom: '2rem'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}>
                        {/* Front (Term) */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            backgroundColor: 'var(--bg-card)',
                            border: '2px solid var(--primary)',
                            borderRadius: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Term
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{currentCard.term}</h2>
                            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Click to Flip ↻
                            </div>
                        </div>

                        {/* Back (Definition) */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            backgroundColor: 'var(--bg-card)',
                            border: '2px solid var(--secondary)',
                            borderRadius: '1rem',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{ fontSize: '1rem', color: 'var(--secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Definition
                            </div>
                            <p style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>{currentCard.definition}</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="btn btn-outline"
                        style={{ padding: '0.75rem 1.5rem', opacity: currentIndex === 0 ? 0.5 : 1 }}
                    >
                        ← Prev
                    </button>

                    <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {currentIndex + 1} / {unlockedVocab.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === unlockedVocab.length - 1}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.5rem', opacity: currentIndex === unlockedVocab.length - 1 ? 0.5 : 1 }}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}
