import { Link } from 'react-router-dom';
import SEO from './SEO';
import SiteFooter from './SiteFooter';

const learningResources = [
    {
        title: 'SEC Investor.gov',
        url: 'https://www.investor.gov/',
        source: 'U.S. Securities and Exchange Commission',
        note: 'Beginner-friendly investing basics, fraud alerts, and compound interest tools.'
    },
    {
        title: 'CFPB Consumer Tools',
        url: 'https://www.consumerfinance.gov/consumer-tools/',
        source: 'Consumer Financial Protection Bureau',
        note: 'Credit cards, debt collection rights, mortgages, and complaint guidance.'
    },
    {
        title: 'FDIC Money Smart',
        url: 'https://www.fdic.gov/resources/consumers/money-smart/',
        source: 'Federal Deposit Insurance Corporation',
        note: 'Free financial education curriculum and worksheets.'
    },
    {
        title: 'Federal Reserve Education',
        url: 'https://www.federalreserveeducation.org/',
        source: 'Federal Reserve System',
        note: 'Economic literacy lessons, data explainers, and classroom resources.'
    },
    {
        title: 'BLS CPI Inflation Data',
        url: 'https://www.bls.gov/cpi/',
        source: 'U.S. Bureau of Labor Statistics',
        note: 'Official U.S. inflation series and methodology.'
    },
    {
        title: 'TreasuryDirect',
        url: 'https://www.treasurydirect.gov/',
        source: 'U.S. Department of the Treasury',
        note: 'Primary source for U.S. savings bonds and Treasury securities.'
    },
    {
        title: 'IRS Retirement Topics',
        url: 'https://www.irs.gov/retirement-plans',
        source: 'Internal Revenue Service',
        note: 'Authoritative IRA, 401(k), and retirement plan rules.'
    },
    {
        title: 'HUD Homebuying Resources',
        url: 'https://www.hud.gov/topics/homebuying',
        source: 'U.S. Department of Housing and Urban Development',
        note: 'First-time homebuyer guidance and housing counseling resources.'
    },
    {
        title: 'Investopedia',
        url: 'https://www.investopedia.com/',
        source: 'Investopedia',
        note: 'Plain-language explanations for investing and economic concepts.'
    },
    {
        title: 'FINRA BrokerCheck',
        url: 'https://brokercheck.finra.org/',
        source: 'FINRA',
        note: 'Verify broker/advisor registration and disciplinary history.'
    }
];

export default function ResourcesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Finance Learning Resources',
        url: 'https://freefinancecamp.com/resources',
        description: 'Government and trusted finance learning links for deeper financial education.'
    };

    return (
        <main className="container" style={{ maxWidth: '980px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title="Resources"
                description="Government and trusted finance learning resources for deeper study."
                path="/resources"
                jsonLd={jsonLd}
            />

            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back Home</Link>
            <h1 style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>Learning Resources</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.7rem' }}>
                Use these primary resources to deepen your financial knowledge.
            </p>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '0.8rem', fontSize: '1.45rem' }}>Trusted Learning Sources</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Prioritized government and high-trust reference sites.
                </p>
                <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {learningResources.map((resource) => (
                        <article
                            key={resource.url}
                            style={{
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '1rem',
                                backgroundColor: 'var(--bg-card)'
                            }}
                        >
                            <h3 style={{ marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--text-main)' }}
                                >
                                    {resource.title}
                                </a>
                            </h3>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                                {resource.source}
                            </div>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>{resource.note}</p>
                        </article>
                    ))}
                </div>
            </section>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link to="/lessons" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Read Lesson Guides</Link>
                <Link to="/curriculum" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>See Full Curriculum</Link>
            </div>

            <SiteFooter />
        </main>
    );
}
