import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import SEO from './SEO';

export default function InteractiveToolsPage() {
    const tools = useMemo(() => {
        const byWidget = new Map();

        for (const module of curriculum) {
            for (const lesson of module.lessons) {
                if (!lesson.widget) continue;

                if (!byWidget.has(lesson.widget)) {
                    byWidget.set(lesson.widget, {
                        widgetId: lesson.widget,
                        title: lesson.title,
                        description: lesson.description || 'Interactive financial tool',
                        modules: [module.title],
                        sampleLessonId: lesson.id
                    });
                    continue;
                }

                const existing = byWidget.get(lesson.widget);
                if (!existing.modules.includes(module.title)) {
                    existing.modules.push(module.title);
                }
            }
        }

        return Array.from(byWidget.values()).sort((a, b) => a.title.localeCompare(b.title));
    }, []);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <SEO
                title="Interactive Tools"
                description="Open interactive finance tools directly after login."
                path="/tools"
                noindex={true}
            />
            <div style={{ marginBottom: '1rem' }}>
                <Link to="/map" style={{ color: 'var(--text-muted)' }}>← Back to Map</Link>
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Interactive Tools</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                All tools are available anytime while logged in.
            </p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {tools.map((tool) => (
                    <div
                        key={tool.widgetId}
                        style={{
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-card)'
                        }}
                    >
                        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{tool.title}</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.7rem' }}>
                            {tool.description}
                        </p>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.9rem' }}>
                            Used in: {tool.modules.join(', ')}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <Link to={`/tools/${tool.widgetId}`} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                                Open Tool
                            </Link>
                            <Link to={`/learn/${tool.sampleLessonId}`} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                                Open Lesson
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
