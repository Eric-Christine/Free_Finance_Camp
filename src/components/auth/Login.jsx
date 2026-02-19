import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../SEO';

export default function Login() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('email'); // 'email', 'otp', or 'check-email'
    const { signInWithOtp, verifyOtp, signInWithOAuth, isRealAuth, isMockAuth, isAuthAvailable } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleOAuthLogin = async (provider) => {
        setError('');
        const { error } = await signInWithOAuth(provider);
        if (error) {
            setError(error.message);
        } else if (!isRealAuth) {
            // Mock auth redirects instantly
            navigate('/map');
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!isAuthAvailable) {
            setError('Authentication is currently unavailable. Please contact support.');
            return;
        }
        const { error } = await signInWithOtp(email);
        if (error) {
            setError(error.message);
        } else {
            // Real auth uses magic link (email), mock uses OTP code
            setStep(isRealAuth ? 'check-email' : 'otp');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        const { error } = await verifyOtp(email, otp);
        if (error) {
            setError(error.message);
        } else {
            navigate('/map');
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem'
        }}>
            <SEO
                title="Sign In"
                description="Sign in to Free Finance Camp to save your lesson progress."
                path="/login"
                noindex={true}
            />
            <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                width: '100%',
                maxWidth: '400px',
                boxShadow: 'var(--shadow)'
            }}>
                <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
                    ← Back to Home
                </Link>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary)' }}>
                    Free Finance Camp
                </h1>
                {!isAuthAvailable && (
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
                        Authentication is temporarily unavailable.
                    </p>
                )}

                {step === 'email' && (
                    <>
                        <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid var(--border)',
                                        backgroundColor: 'var(--bg-main)',
                                        color: 'var(--text-main)'
                                    }}
                                />
                            </div>
                            {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
                            <button type="submit" className="btn btn-primary">
                                {isRealAuth ? 'Send Magic Link' : 'Send Login Code'}
                            </button>
                        </form>

                        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
                            <span style={{ padding: '0 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                                onClick={() => handleOAuthLogin('google')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'white',
                                    color: '#333',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </>
                )}

                {step === 'check-email' && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                        <h2 style={{ marginBottom: '0.5rem' }}>Check Your Email</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            We sent a magic link to <strong>{email}</strong>.<br />
                            Click the link to sign in.
                        </p>
                        <button
                            onClick={() => setStep('email')}
                            className="btn btn-outline"
                        >
                            Use a Different Email
                        </button>
                    </div>
                )}

                {step === 'otp' && (
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <p>Enter the code sent to <strong>{email}</strong></p>
                            {isMockAuth && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Dev mode test code: 123456)</p>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Verification Code</label>
                            <input
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    textAlign: 'center',
                                    letterSpacing: '0.2rem',
                                    fontSize: '1.2rem'
                                }}
                            />
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
                        <button type="submit" className="btn btn-primary">
                            Verify & Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('email')}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', cursor: 'pointer' }}
                        >
                            Back to Email
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
}
