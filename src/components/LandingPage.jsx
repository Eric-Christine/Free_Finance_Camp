import { Link } from 'react-router-dom';
import CompoundInterest from './interactive/CompoundInterest';

export default function LandingPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem 2rem 4rem',
                background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.1) 0%, transparent 60%)'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem'
                }}>
                    A Free & Open Educational Resource
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                    marginBottom: '1.5rem',
                    color: 'var(--text-main)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                }}>
                    Practical Finance<br />
                    <span style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>For Everyone</span>
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '650px',
                    marginBottom: '2.5rem',
                    lineHeight: '1.7',
                    fontWeight: '400'
                }}>
                    Free Finance Camp is a nonprofit-spirited initiative providing
                    accessible, high-quality financial education. Master the fundamentals
                    of budgeting, investing, and economic systems through
                    unbiased, open-source curriculum.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link
                        to="/login"
                        className="btn btn-primary"
                        style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', fontWeight: '600' }}
                    >
                        Start Learning
                    </Link>
                    <a
                        href="#curriculum"
                        style={{
                            padding: '0.9rem 2.2rem',
                            fontSize: '1.05rem',
                            fontWeight: '600',
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        View Curriculum
                    </a>
                </div>

                {/* Live Widget Preview */}
                <div style={{
                    marginTop: '5rem',
                    width: '100%',
                    maxWidth: '850px',
                }}>
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            padding: '0.8rem 1.2rem',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'rgba(255,255,255,0.01)'
                        }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid var(--border)' }}></div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Demo: Compound Interest Simulation</span>
                        </div>
                        <div style={{ height: '480px', textAlign: 'left' }}>
                            <CompoundInterest />
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '3.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                }}>
                    Support open financial education. Always free.
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: '6rem 2rem',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2.25rem',
                        marginBottom: '1rem',
                        color: 'var(--text-main)',
                        fontWeight: '700'
                    }}>
                        The Mission
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        maxWidth: '650px',
                        margin: '0 auto 4rem',
                        lineHeight: '1.6',
                        fontSize: '1.1rem'
                    }}>
                        We believe financial literacy is a fundamental right. Our platform is designed to provide clear, actionable knowledge without commercial bias.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        <FeatureCard
                            iconLetter="E"
                            title="Empowerment First"
                            description="Focusing on long-term stability and informed decision-making over quick wins or commercial products."
                        />
                        <FeatureCard
                            iconLetter="C"
                            title="Curated Curriculum"
                            description="9 precise modules covering the modern financial landscape, from basic budgeting to complex economic theories."
                        />
                        <FeatureCard
                            iconLetter="O"
                            title="Open Access"
                            description="Every lesson and simulation is available to anyone, anywhere, with no cost or requirement for personal data."
                        />
                        <FeatureCard
                            iconLetter="I"
                            title="Interactive Learning"
                            description="Practical tools like the Market Timer and Budgeting Simulator allow you to apply concepts in a risk-free environment."
                        />
                        <FeatureCard
                            iconLetter="S"
                            title="Story-Based Scenarios"
                            description="Real-world case studies help bridge the gap between abstract theory and daily life decisions."
                        />
                        <FeatureCard
                            iconLetter="P"
                            title="Privacy Focused"
                            description="We don't track your data or sell your information. Your learning journey is yours alone."
                        />
                    </div>
                </div>
            </section>

            {/* Curriculum Preview */}
            <section id="curriculum" style={{ padding: '6rem 2rem' }}>
                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{
                            fontSize: '2.25rem',
                            marginBottom: '1rem',
                            color: 'var(--text-main)',
                            fontWeight: '700'
                        }}>
                            Comprehensive Curriculum
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            A structured path toward financial independence.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.25rem' }}>
                        <ModulePreview num={1} title="The Wealth Mindset" desc="Psychology of money, Needs vs. Wants, and Compounding" />
                        <ModulePreview num={2} title="Budgeting Foundations" desc="Systemic saving and the 50/30/20 framework" />
                        <ModulePreview num={3} title="Investing Fundamentals" desc="Market dynamics, index funds, and risk management" />
                        <ModulePreview num={4} title="Critical Purchases" desc="Analyzing major lifecycle expenses and debt structures" />
                        <ModulePreview num={5} title="Risk Management" desc="Understanding insurance, deductibles, and protection" />
                        <ModulePreview num={6} title="Credit & Debt" desc="Managing credit hygiene and navigating debt types" />
                        <ModulePreview num={7} title="Advanced Investing" desc="ETFs, options theory, and market anomalies" />
                        <ModulePreview num={8} title="Macro Economics" desc="The Federal Reserve, interest rates, and bond markets" />
                        <ModulePreview num={9} title="Future of Finance" desc="Evolving assets, blockchain, and new markets" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '6rem 2rem',
                textAlign: 'center',
                backgroundColor: 'rgba(16, 185, 129, 0.03)',
                borderTop: '1px solid var(--border)'
            }}>
                <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem', color: 'var(--text-main)', fontWeight: '700' }}>
                    Begin Your Education Today
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
                    Access all resources immediately and advance your understanding of the financial world.
                </p>
                <Link
                    to="/login"
                    className="btn btn-primary"
                    style={{ padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: '600' }}
                >
                    Access Curriculum
                </Link>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                borderTop: '1px solid var(--border)'
            }}>
                <div style={{ marginBottom: '1rem' }}>
                    © 2025 Free Finance Camp · An Open Educational Project
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.8rem' }}>
                    <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About the Mission</Link>
                    <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link to="/curriculum" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Full Syllabus</Link>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ iconLetter, title, description }) {
    return (
        <div style={{
            backgroundColor: 'var(--bg-main)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                fontWeight: '700',
                fontSize: '1.2rem',
                color: 'var(--primary)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
                {iconLetter}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: '600' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{description}</p>
        </div>
    );
}

function ModulePreview({ num, title, desc }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            transition: 'border-color 0.2s'
        }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                flexShrink: 0,
                border: '1px solid var(--border)'
            }}>
                {num.toString().padStart(2, '0')}
            </div>
            <div>
                <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1.05rem' }}>{title}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{desc}</div>
            </div>
        </div>
    );
}

