import { Link } from 'react-router-dom';
import SEO from './SEO';
import SiteFooter from './SiteFooter';

export default function AboutPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Free Finance Camp',
        url: 'https://freefinancecamp.com/about',
        mainEntity: {
            '@type': 'EducationalOrganization',
            name: 'Free Finance Camp',
            url: 'https://freefinancecamp.com',
            description: 'Open, practical financial education built around unbiased lessons and interactive tools.'
        }
    };

    return (
        <main className="container" style={{ maxWidth: '860px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title="About"
                description="Learn about Free Finance Camp's mission to provide open, practical financial education."
                path="/about"
                jsonLd={jsonLd}
            />

            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back Home</Link>
            <h1 style={{ marginTop: '1rem', marginBottom: '1rem' }}>About Free Finance Camp</h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Free Finance Camp is an open education project focused on practical, high-impact money skills.
                The curriculum is built to help learners make better day-to-day financial decisions across budgeting,
                debt, investing, insurance, and macroeconomic literacy.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                The goal is simple: make high-quality financial knowledge accessible without paywalls,
                upsells, or product bias.
            </p>
            <SiteFooter />
        </main>
    );
}
