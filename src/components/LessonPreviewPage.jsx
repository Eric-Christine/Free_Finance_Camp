import { Link, useParams } from 'react-router-dom';
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

function splitContent(lesson) {
    if (lesson.screens && lesson.screens.length > 0) {
        return lesson.screens.map((screen) => ({
            title: screen.title || null,
            content: screen.content || []
        }));
    }
    return [{ title: null, content: lesson.content || [] }];
}

function renderParagraph(paragraph, idx) {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    return (
        <p key={idx} style={{ marginBottom: paragraph === '' ? '0.5rem' : '1rem', color: 'var(--text-light)', lineHeight: '1.7' }}>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </p>
    );
}

export default function LessonPreviewPage() {
    const { lessonId } = useParams();
    const allLessons = flattenLessons();
    const index = allLessons.findIndex((lesson) => lesson.id === lessonId);
    const lesson = allLessons[index];

    if (!lesson) {
        return (
            <main className="container" style={{ maxWidth: '860px', padding: '2.5rem 1rem 1rem' }}>
                <SEO title="Lesson Not Found" description="The requested lesson could not be found." path={`/lesson/${lessonId}`} noindex={true} />
                <h1>Lesson not found</h1>
                <Link to="/lessons" className="btn btn-primary">Back to lessons</Link>
                <SiteFooter />
            </main>
        );
    }

    const sections = splitContent(lesson);
    const prevLesson = index > 0 ? allLessons[index - 1] : null;
    const nextLesson = index < allLessons.length - 1 ? allLessons[index + 1] : null;
    const lessonUrl = `https://freefinancecamp.com/lesson/${lesson.id}`;
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: lesson.title,
            description: lesson.description,
            url: lessonUrl,
            educationalLevel: 'Beginner',
            isPartOf: {
                '@type': 'Course',
                name: lesson.moduleTitle,
                url: 'https://freefinancecamp.com/curriculum'
            },
            provider: {
                '@type': 'EducationalOrganization',
                name: 'Free Finance Camp',
                url: 'https://freefinancecamp.com'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freefinancecamp.com/' },
                { '@type': 'ListItem', position: 2, name: 'Lessons', item: 'https://freefinancecamp.com/lessons' },
                { '@type': 'ListItem', position: 3, name: lesson.title, item: lessonUrl }
            ]
        }
    ];

    return (
        <main className="container" style={{ maxWidth: '920px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title={`${lesson.title} (Guide)`}
                description={lesson.description}
                path={`/lesson/${lesson.id}`}
                jsonLd={jsonLd}
            />

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/lessons" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← All lessons</Link>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{lesson.moduleTitle}</span>
            </div>

            <h1 style={{ marginTop: '1rem', marginBottom: '0.6rem', fontSize: '2rem' }}>{lesson.title}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.02rem' }}>
                {lesson.description}
            </p>

            <div style={{
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1.5rem'
            }}>
                <strong>Want the interactive version?</strong>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0.9rem' }}>
                    Sign in to access quizzes, progress tracking, and hands-on tools for this lesson.
                </p>
                <Link to={`/learn/${lesson.id}`} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                    Open Interactive Lesson
                </Link>
            </div>

            <section>
                {sections.map((section, sectionIndex) => (
                    <article key={sectionIndex} style={{ marginBottom: '1.5rem' }}>
                        {section.title && (
                            <h2 style={{ marginBottom: '0.8rem', fontSize: '1.28rem' }}>{section.title}</h2>
                        )}
                        {(section.content || []).map((paragraph, idx) => renderParagraph(paragraph, idx))}
                    </article>
                ))}
            </section>

            <nav style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                {prevLesson ? (
                    <Link to={`/lesson/${prevLesson.id}`} className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                        ← {prevLesson.title}
                    </Link>
                ) : <span />}
                {nextLesson ? (
                    <Link to={`/lesson/${nextLesson.id}`} className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                        {nextLesson.title} →
                    </Link>
                ) : <span />}
            </nav>
            <SiteFooter />
        </main>
    );
}
