import { Link } from 'react-router-dom';
import SEO from './SEO';
import { curriculum } from '../data/curriculum';
import SiteFooter from './SiteFooter';

export default function CurriculumPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Free Finance Camp Curriculum',
        url: 'https://freefinancecamp.com/curriculum',
        itemListElement: curriculum.map((module, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
                '@type': 'Course',
                name: module.title,
                description: module.description,
                provider: {
                    '@type': 'EducationalOrganization',
                    name: 'Free Finance Camp',
                    url: 'https://freefinancecamp.com'
                }
            }
        }))
    };

    return (
        <main className="container" style={{ maxWidth: '960px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title="Curriculum"
                description="Explore the full Free Finance Camp curriculum, including modules on budgeting, investing, debt, and rates."
                path="/curriculum"
                jsonLd={jsonLd}
            />

            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back Home</Link>
            <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Full Curriculum</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {curriculum.length} modules and {curriculum.reduce((acc, mod) => acc + mod.lessons.length, 0)} lessons.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link to="/lessons" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                    Browse Public Lesson Guides
                </Link>
                <Link to="/resources" className="btn btn-outline" style={{ fontSize: '0.82rem', marginLeft: '0.65rem' }}>
                    View Trusted Resources
                </Link>
            </div>

            <section style={{ display: 'grid', gap: '1rem' }}>
                {curriculum.map((module, idx) => (
                    <article key={module.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                        <h2 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                            Module {idx + 1}: {module.title}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{module.description}</p>
                        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-muted)' }}>
                            {module.lessons.map((lesson) => (
                                <li key={lesson.id} style={{ marginBottom: '0.35rem' }}>{lesson.title}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/login" className="btn btn-primary">Start Learning</Link>
            </div>
            <SiteFooter />
        </main>
    );
}
