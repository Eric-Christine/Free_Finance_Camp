import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { curriculum } from '../data/curriculum';
import SEO from './SEO';
import { WIDGET_COMPONENTS, FREE_TOOLS } from './interactive/widgetRegistry';

export default function InteractiveToolPlayer() {
    const { widgetId } = useParams();
    const { user } = useAuth();
    const WidgetComponent = widgetId ? WIDGET_COMPONENTS[widgetId] : null;

    const relatedLesson = curriculum
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.widget === widgetId);

    if (!WidgetComponent) {
        return (
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>Tool not found</h1>
                <Link to="/tools" className="btn btn-primary">Back to Tools</Link>
            </div>
        );
    }

    const isFree = FREE_TOOLS.includes(widgetId);

    if (!isFree && !user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container" style={{ padding: '1.2rem 1rem 2rem' }}>
            <SEO
                title={relatedLesson?.title || 'Interactive Tool'}
                description={relatedLesson?.description || 'Interactive financial tool'}
                path={`/tools/${widgetId}`}
                noindex={!isFree}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.9rem' }}>
                <div style={{ minWidth: 0 }}>
                    <Link to="/tools" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>&larr; Tools</Link>
                    <h1 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: '600', margin: '0.25rem 0 0' }}>{relatedLesson?.title || widgetId}</h1>
                </div>
                {relatedLesson && (
                    user ? (
                        <Link to={`/learn/${relatedLesson.id}`} className="btn btn-outline" style={{ fontSize: '0.8rem', flexShrink: 0 }}>
                            Open Full Lesson
                        </Link>
                    ) : (
                        <Link to={`/lesson/${relatedLesson.id}`} className="btn btn-outline" style={{ fontSize: '0.8rem', flexShrink: 0 }}>
                            Read Lesson
                        </Link>
                    )
                )}
            </div>

            {relatedLesson?.description && (
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.9rem', fontSize: '0.9rem' }}>
                    {relatedLesson.description}
                </p>
            )}

            <div style={{ minHeight: 'clamp(620px, 86vh, 1080px)', minWidth: 0 }}>
                <WidgetComponent />
            </div>
        </div>
    );
}
