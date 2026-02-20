import { Link, useParams } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import SEO from './SEO';
import { WIDGET_COMPONENTS } from './interactive/widgetRegistry';

export default function InteractiveToolPlayer() {
    const { widgetId } = useParams();
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

    return (
        <div className="container" style={{ padding: '1.2rem 1rem 2rem' }}>
            <SEO
                title={relatedLesson?.title || 'Interactive Tool'}
                description={relatedLesson?.description || 'Interactive financial tool'}
                path={`/tools/${widgetId}`}
                noindex={true}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link to="/tools" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Tools</Link>
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <span style={{ fontWeight: '600' }}>{relatedLesson?.title || widgetId}</span>
                </div>
                {relatedLesson && (
                    <Link to={`/learn/${relatedLesson.id}`} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                        Open Full Lesson
                    </Link>
                )}
            </div>

            {relatedLesson?.description && (
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.9rem', fontSize: '0.9rem' }}>
                    {relatedLesson.description}
                </p>
            )}

            <div style={{ height: 'clamp(620px, 86vh, 1080px)', minWidth: 0 }}>
                <WidgetComponent />
            </div>
        </div>
    );
}
