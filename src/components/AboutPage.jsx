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
                Free Finance Camp is an open education project for anyone who wants to feel more comfortable
                with money. The curriculum explains budgeting, debt, investing, insurance, and the broader
                economy in plain language, with room to learn at your own pace.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                You do not need a certain income, a finance background, or a perfect financial history to
                begin. Our goal is to make useful financial knowledge available without paywalls, pressure,
                upsells, or product bias.
            </p>
            <SiteFooter />
        </main>
    );
}
