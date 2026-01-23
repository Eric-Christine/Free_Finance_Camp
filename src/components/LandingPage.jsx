import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--primary)',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    marginBottom: '1.5rem'
                }}>
                    🎓 100% Free • No Credit Card Required
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '800',
                    lineHeight: '1.1'
                }}>
                    Learn Money Skills<br />They Don't Teach in School
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '600px',
                    marginBottom: '2.5rem',
                    lineHeight: '1.7'
                }}>
                    Master budgeting, investing, and wealth-building through
                    interactive simulations and bite-sized lessons.
                    No jargon, no fluff—just real skills for real life.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link
                        to="/login"
                        className="btn btn-primary"
                        style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '600' }}
                    >
                        Start Learning Free →
                    </Link>
                </div>

                <div style={{
                    marginTop: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <span style={{ color: 'var(--accent)' }}>⭐⭐⭐⭐⭐</span>
                    <span>Loved by 1,000+ learners</span>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: '5rem 2rem',
                backgroundColor: 'var(--bg-card)'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: 'var(--text-main)'
                    }}>
                        Financial Literacy, Gamified
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.6'
                    }}>
                        Learn by doing. Our interactive approach makes complex topics simple.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <FeatureCard
                            icon="🎮"
                            title="Interactive Simulations"
                            description="Practice investing with our Market Timer game. See compound interest grow in real-time."
                        />
                        <FeatureCard
                            icon="📚"
                            title="Bite-Sized Lessons"
                            description="9 modules covering budgeting, investing, debt, insurance, and more. Each takes 5 minutes."
                        />
                        <FeatureCard
                            icon="🏆"
                            title="Earn XP & Level Up"
                            description="Track your progress, earn points, and unlock new content as you master each topic."
                        />
                        <FeatureCard
                            icon="📝"
                            title="Quizzes & Flashcards"
                            description="Reinforce your learning with quizzes at the end of each lesson and vocab review."
                        />
                        <FeatureCard
                            icon="💡"
                            title="Real-World Examples"
                            description="Story-based scenarios help you apply knowledge to actual financial decisions."
                        />
                        <FeatureCard
                            icon="🔓"
                            title="Always Free"
                            description="No subscriptions, no paywalls. Financial education should be accessible to everyone."
                        />
                    </div>
                </div>
            </section>

            {/* Curriculum Preview */}
            <section style={{ padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        marginBottom: '2.5rem',
                        color: 'var(--text-main)'
                    }}>
                        What You'll Learn
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <ModulePreview num={1} title="The Wealth Mindset" desc="Needs vs. Wants, Compound Interest" />
                        <ModulePreview num={2} title="Budgeting & Saving" desc="The 50/30/20 Rule" />
                        <ModulePreview num={3} title="Investing 101" desc="Stocks, Index Funds, Market Timing" />
                        <ModulePreview num={4} title="Big Purchases" desc="Buy vs. Lease vs. Finance a Car" />
                        <ModulePreview num={5} title="Insurance Essentials" desc="Health, Auto, Deductibles & Premiums" />
                        <ModulePreview num={6} title="Credit & Debt" desc="Credit Scores, Good vs. Bad Debt" />
                        <ModulePreview num={7} title="Investing 201" desc="ETFs, Options, Meme Stocks" />
                        <ModulePreview num={8} title="The Economic Machine" desc="The Fed, Interest Rates, Bonds" />
                        <ModulePreview num={9} title="Future Finance" desc="Crypto, Prediction Markets, Assets" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '5rem 2rem',
                textAlign: 'center',
                background: 'linear-gradient(to top, rgba(16, 185, 129, 0.1) 0%, transparent 100%)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                    Ready to Take Control of Your Finances?
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Join thousands who are building wealth knowledge, one lesson at a time.
                </p>
                <Link
                    to="/login"
                    className="btn btn-primary"
                    style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '600' }}
                >
                    Get Started Free →
                </Link>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                borderTop: '1px solid var(--border)'
            }}>
                © 2025 Free Finance Camp. Made with ❤️ for financial literacy.
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div style={{
            backgroundColor: 'var(--bg-main)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{description}</p>
        </div>
    );
}

function ModulePreview({ num, title, desc }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
        }}>
            <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                flexShrink: 0
            }}>
                {num}
            </div>
            <div>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</div>
            </div>
        </div>
    );
}
