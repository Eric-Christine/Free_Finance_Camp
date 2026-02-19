import { Link } from 'react-router-dom';
import SEO from './SEO';
import SiteFooter from './SiteFooter';

export default function PrivacyPage() {
    return (
        <main className="container" style={{ maxWidth: '860px', padding: '2.5rem 1rem 1rem' }}>
            <SEO
                title="Privacy Policy"
                description="Privacy policy for Free Finance Camp."
                path="/privacy"
            />

            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back Home</Link>
            <h1 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Privacy Policy</h1>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Free Finance Camp collects only the minimum information required to support authentication and
                learning progress. We do not sell personal data.
            </p>
            <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>What We Store</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Account identifiers and learning progress data such as completed lessons, quiz scores, and XP.
            </p>
            <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Analytics</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Aggregated analytics may be used to improve curriculum quality and user experience.
            </p>
            <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Contact</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                For privacy-related questions, contact the project maintainer through the repository or official channels.
            </p>
            <SiteFooter />
        </main>
    );
}
