import { Link } from 'react-router-dom';
import SEO from './SEO';

export default function NotFoundPage() {
    return <main className="container" style={{ padding: '3rem 1rem' }}>
        <SEO title="Page Not Found" description="This page could not be found. Explore our free financial lessons and calculators." noindex />
        <h1>Page not found</h1>
        <p>The page you requested is unavailable.</p>
        <Link to="/">Home</Link> · <Link to="/tools">Free tools</Link> · <Link to="/lessons">Lessons</Link>
    </main>;
}
