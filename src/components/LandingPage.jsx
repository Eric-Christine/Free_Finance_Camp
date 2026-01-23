import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(to bottom right, var(--bg-main), var(--bg-card))'
        }}>
            <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '1rem',
                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800'
            }}>
                Free Finance Camp
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-muted)',
                maxWidth: '600px',
                marginBottom: '2.5rem',
                lineHeight: '1.6'
            }}>
                Learn how to manage money, invest, and build wealth. <br />
                Interactive, free, and designed for real life.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                    to="/login"
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
                >
                    Get Started (It's Free)
                </Link>
                {/* <Link 
          to="/map" 
          className="btn btn-outline"
          style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
        >
          View Curriculum
        </Link> */}
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Feature title="Interactive Simulation" icon="🎮" />
                <Feature title="Real-World Skills" icon="💼" />
                <Feature title="Track Progress" icon="📈" />
            </div>
        </div>
    );
}

function Feature({ title, icon }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-light)'
        }}>
            <span style={{ fontSize: '2rem' }}>{icon}</span>
            <span style={{ fontWeight: '500' }}>{title}</span>
        </div>
    );
}
