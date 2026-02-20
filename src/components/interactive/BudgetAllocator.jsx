import { useState } from 'react';

export default function BudgetAllocator() {
    const [income, setIncome] = useState(3000);
    const [rent, setRent] = useState(1200);
    const [food, setFood] = useState(400);
    const [fun, setFun] = useState(200);

    const totalExpenses = rent + food + fun;
    const savings = income - totalExpenses;
    const savingsRate = Math.round((savings / income) * 100);

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflowY: 'auto',
            overflowX: 'hidden'
        }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Monthly Budget Builder</h3>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Monthly Income</label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-main)',
                            color: 'var(--text-main)'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Housing & Utilities</span>
                        <span>${rent}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={income}
                        step="50"
                        value={rent}
                        onChange={(e) => setRent(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Food & Groceries</span>
                        <span>${food}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={income - rent}
                        step="50"
                        value={food}
                        onChange={(e) => setFood(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Fun & Entertainment</span>
                        <span>${fun}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={income - rent - food}
                        step="50"
                        value={fun}
                        onChange={(e) => setFun(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                    />
                </div>
            </div>

            <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: savings >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius)',
                textAlign: 'center',
                border: `1px solid ${savings >= 0 ? 'var(--primary)' : 'red'}`
            }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Monthly Savings</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: savings >= 0 ? 'var(--primary)' : 'red' }}>
                    ${savings.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Savings Rate: <strong>{savingsRate}%</strong>
                    {savingsRate >= 20 ? ' (Great job!)' : (savings < 0 ? ' (Over budget!)' : ' (Try to save 20%)')}
                </div>
            </div>
        </div>
    );
}
