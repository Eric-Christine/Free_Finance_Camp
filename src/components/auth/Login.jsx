import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const { signInWithOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        const { error } = await signInWithOtp(email);
        if (error) {
            setError(error.message);
        } else {
            setStep('otp');
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
            <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                width: '100%',
                maxWidth: '400px',
                boxShadow: 'var(--shadow)'
            }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary)' }}>
                    Free Finance Camp
                </h1>

                {step === 'email' ? (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@school.edu"
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
                        <button type="submit" className="btn btn-primary">
                            Send Login Code
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <p>Enter the code sent to <strong>{email}</strong></p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Hint: use 123456)</p>
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
        </div>
    );
}
