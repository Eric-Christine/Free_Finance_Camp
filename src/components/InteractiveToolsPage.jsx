import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { curriculum } from '../data/curriculum';
import { FREE_TOOLS } from './interactive/widgetRegistry';
import SEO from './SEO';

export default function InteractiveToolsPage() {
    const { user } = useAuth();

    const { featured, locked } = useMemo(() => {
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

        const all = Array.from(byWidget.values());
        const feat = all.filter((t) => FREE_TOOLS.includes(t.widgetId));
        const lock = all.filter((t) => !FREE_TOOLS.includes(t.widgetId)).sort((a, b) => a.title.localeCompare(b.title));
        return { featured: feat, locked: lock };
    }, []);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <SEO
                title="Free Financial Calculators & Tools"
                description="Free interactive finance tools: compound interest calculator, budget allocator, home buying cost explorer, and more."
                path="/tools"
            />
            <div style={{ marginBottom: '1rem' }}>
                <Link to="/" style={{ color: 'var(--text-muted)' }}>&larr; Home</Link>
                {user && (
                    <Link to="/map" style={{ color: 'var(--text-muted)', marginLeft: '1.2rem' }}>&larr; Back to Map</Link>
                )}
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Interactive Tools</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Free calculators to help you make smarter money decisions.
            </p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {featured.map((tool) => (
                    <div
                        key={tool.widgetId}
                        style={{
                            border: '2px solid var(--primary)',
                            borderRadius: 'var(--radius)',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-card)',
                            position: 'relative'
                        }}
                    >
                        <span style={{
                            position: 'absolute',
                            top: '-0.55rem',
                            right: '0.75rem',
                            background: 'var(--primary)',
                            color: '#fff',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                        }}>Free</span>
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
                            <Link to={`/lesson/${tool.sampleLessonId}`} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                                Read Lesson
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {locked.length > 0 && (
                <>
                    <h2 style={{ fontSize: '1.4rem', marginTop: '2.5rem', marginBottom: '0.4rem' }}>More Tools</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                        {user ? 'All tools unlocked.' : 'Sign up free to unlock all tools, track progress, and earn XP.'}
                    </p>

                    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                        {locked.map((tool) => {
                            const unlocked = !!user;
                            return (
                                <div
                                    key={tool.widgetId}
                                    style={{
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius)',
                                        padding: '1rem',
                                        backgroundColor: 'var(--bg-card)',
                                        opacity: unlocked ? 1 : 0.7
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
                                        {unlocked ? (
                                            <>
                                                <Link to={`/tools/${tool.widgetId}`} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                                                    Open Tool
                                                </Link>
                                                <Link to={`/learn/${tool.sampleLessonId}`} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                                                    Open Lesson
                                                </Link>
                                            </>
                                        ) : (
                                            <Link to="/login" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                                                Sign Up to Unlock
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
