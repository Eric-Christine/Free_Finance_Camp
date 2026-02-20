import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import SiteFooter from './SiteFooter';
import { curriculum } from '../data/curriculum';

function flattenLessons() {
    return curriculum.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
            moduleId: module.id,
            moduleTitle: module.title,
            moduleIndex,
            lessonIndex,
            ...lesson
        }))
    );
}

export default function LessonsHubPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const lessons = flattenLessons();
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Finance Lessons',
        url: 'https://freefinancecamp.com/lessons',
        itemListElement: lessons.map((lesson, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
                '@type': 'LearningResource',
                name: lesson.title,
                description: lesson.description,
                url: `https://freefinancecamp.com/lesson/${lesson.id}`
            }
        }))
    };

    // Calculate Search Results & Sorted Array
    let displayLessons = [...lessons];
    if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();

        // Compute relevance scores
        const scoredLessons = displayLessons.map(lesson => {
            let score = 0;
            const title = lesson.title.toLowerCase();
            const moduleTitle = lesson.moduleTitle.toLowerCase();

            // Priority 1: Match in Title
            if (title.includes(query)) {
                score = 3;
            }
            // Priority 2: Match in Module Title
            else if (moduleTitle.includes(query)) {
                score = 2;
            }
            // Priority 3: Match in content deeply
            else {
                let contentMatched = false;

                // Deep scan `content` arrays natively or in `screens`
                if (lesson.content && Array.isArray(lesson.content) && lesson.content.join(' ').toLowerCase().includes(query)) {
                    contentMatched = true;
                } else if (lesson.screens) {
                    for (const screen of lesson.screens) {
                        if (screen.title && screen.title.toLowerCase().includes(query)) {
                            contentMatched = true;
                            break;
                        }
                        if (screen.content && Array.isArray(screen.content) && screen.content.join(' ').toLowerCase().includes(query)) {
                            contentMatched = true;
                            break;
                        }
                    }
                }

                if (contentMatched) score = 1;
            }

            return { ...lesson, _score: score };
        });

        // Filter out zero scores and sort descending by score
        displayLessons = scoredLessons
            .filter(l => l._score > 0)
            .sort((a, b) => b._score - a._score);
    }

    return (
        <main className="container" style={{ maxWidth: '980px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title="Finance Lessons"
                description="Browse all Free Finance Camp lessons on budgeting, investing, debt, inflation, and economic literacy."
                path="/lessons"
                jsonLd={jsonLd}
            />

            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back Home</Link>
            <h1 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>All Finance Lessons</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Public reading versions of every lesson. For quizzes, progress tracking, and interactive widgets, sign in.
            </p>

            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search for a lesson, topic, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.9rem 1.25rem',
                        fontSize: '1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
            </div>

            {displayLessons.length === 0 && searchQuery.trim() !== '' && (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    No lessons found matching "{searchQuery}".
                </div>
            )}

            <section style={{ display: 'grid', gap: '1rem' }}>
                {displayLessons.map((lesson) => (
                    <article
                        key={lesson.id}
                        style={{
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '1rem 1.25rem',
                            backgroundColor: 'var(--bg-card)',
                            position: 'relative'
                        }}
                    >
                        {searchQuery.trim() !== '' && lesson._score && (
                            <span style={{ position: 'absolute', top: '1rem', right: '1.25rem', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                {lesson._score === 3 ? 'Title Match' : lesson._score === 2 ? 'Module Match' : 'Content Match'}
                            </span>
                        )}
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                            {lesson.moduleTitle}
                        </div>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{lesson.title}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.9rem' }}>{lesson.description}</p>
                        <Link to={`/lesson/${lesson.id}`} className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                            Read lesson
                        </Link>
                    </article>
                ))}
            </section>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/login" className="btn btn-primary">Start Interactive Learning</Link>
            </div>
            <SiteFooter />
        </main>
    );
}
