import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const MAIN_SITE_URL = 'https://ericchristine.com';
const CONTACT_EMAIL = 'ejcdevs@gmail.com';

export default function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            borderTop: '1px solid var(--border)',
            marginTop: '2.5rem'
        }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <ThemeToggle />
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
                © {year} Free Finance Camp · Built by{' '}
                <a
                    href={MAIN_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-main)' }}
                >
                    Eric Christine
                </a>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                fontSize: '0.82rem',
                flexWrap: 'wrap'
            }}>
                <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</Link>
                <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</Link>
                <Link to="/curriculum" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Curriculum</Link>
                <Link to="/resources" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Resources</Link>
                <Link to="/lessons" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Lessons</Link>
                <a href={`mailto:${CONTACT_EMAIL}?subject=Free%20Finance%20Camp%20Question`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    Questions / Comments
                </a>
            </div>
        </footer>
    );
}
