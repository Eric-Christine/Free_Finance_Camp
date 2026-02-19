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

            <section style={{ display: 'grid', gap: '1rem' }}>
                {lessons.map((lesson) => (
                    <article
                        key={lesson.id}
                        style={{
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '1rem 1.25rem',
                            backgroundColor: 'var(--bg-card)'
                        }}
                    >
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
