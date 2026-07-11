import { useState } from 'react';

export default function BudgetAllocator() {
    const [income, setIncome] = useState(3000);
    const [rent, setRent] = useState(1200);
    const [food, setFood] = useState(400);
    const [fun, setFun] = useState(200);

    const totalExpenses = rent + food + fun;
    const savings = income - totalExpenses;
    const savingsRate = income > 0 ? Math.round((savings / income) * 100) : null;

    const updateIncome = (rawValue) => {
        const nextIncome = Math.max(0, Number(rawValue) || 0);
        const nextRent = Math.min(rent, nextIncome);
        const nextFood = Math.min(food, Math.max(0, nextIncome - nextRent));
        const nextFun = Math.min(fun, Math.max(0, nextIncome - nextRent - nextFood));

        setIncome(nextIncome);
        setRent(nextRent);
        setFood(nextFood);
        setFun(nextFun);
    };

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
                    <label htmlFor="budget-income" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Monthly Income</label>
                    <input
                        id="budget-income"
                        type="number"
                        min="0"
                        step="50"
                        value={income}
                        onChange={(e) => updateIncome(e.target.value)}
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
                        aria-label="Housing and utilities"
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
                        aria-label="Food and groceries"
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
                        aria-label="Fun and entertainment"
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
                    {savingsRate === null ? (
                        'Add monthly income to calculate a savings rate.'
                    ) : (
                        <>Savings Rate: <strong>{savingsRate}%</strong></>
                    )}
                </div>
            </div>
        </div>
    );
}
