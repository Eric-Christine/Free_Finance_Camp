import { useState, useEffect } from 'react';

export default function CarCalculator() {
    const [carPrice, setCarPrice] = useState(30000);
    const [downPayment, setDownPayment] = useState(5000);
    const [loanRate, setLoanRate] = useState(6);
    const [loanTerm, setLoanTerm] = useState(60); // months
    const [leaseMonthly, setLeaseMonthly] = useState(350);
    const [investmentReturn, setInvestmentReturn] = useState(10);

    const [results, setResults] = useState({ cash: 0, finance: 0, lease: 0 });

    useEffect(() => {
        // Cash: You pay full price, but lose investment opportunity
        const cashCost = carPrice;
        const cashOpportunityCost = carPrice * Math.pow((1 + investmentReturn / 100), 5) - carPrice;
        const totalCash = cashCost + cashOpportunityCost;

        // Finance: Monthly payments + interest
        const loanAmount = carPrice - downPayment;
        const monthlyRate = loanRate / 100 / 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
            (Math.pow(1 + monthlyRate, loanTerm) - 1);
        const totalFinancePayments = monthlyPayment * loanTerm;
        const financeInterest = totalFinancePayments - loanAmount;
        const totalFinance = downPayment + totalFinancePayments;

        // Lease: Monthly payments, no ownership
        const totalLease = leaseMonthly * 60; // 5 years

        setResults({
            cash: Math.round(totalCash),
            cashBase: cashCost,
            cashOpportunity: Math.round(cashOpportunityCost),
            finance: Math.round(totalFinance),
            financeInterest: Math.round(financeInterest),
            financeMonthly: Math.round(monthlyPayment),
            lease: totalLease,
            leaseMonthly: leaseMonthly
        });
    }, [carPrice, downPayment, loanRate, loanTerm, leaseMonthly, investmentReturn]);

    const cheapest = results.cash <= results.finance && results.cash <= results.lease ? 'cash' :
        results.finance <= results.lease ? 'finance' : 'lease';

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Car Cost Calculator (5 Year)</h3>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span>Car Price</span><span>${carPrice.toLocaleString()}</span>
                    </label>
                    <input type="range" min="10000" max="60000" step="1000" value={carPrice}
                        onChange={(e) => setCarPrice(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary)' }} />
                </div>
                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span>Down Payment</span><span>${downPayment.toLocaleString()}</span>
                    </label>
                    <input type="range" min="0" max={carPrice / 2} step="500" value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--secondary)' }} />
                </div>
                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span>Loan Interest Rate</span><span>{loanRate}%</span>
                    </label>
                    <input type="range" min="0" max="15" step="0.5" value={loanRate}
                        onChange={(e) => setLoanRate(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent)' }} />
                </div>
                <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span>Lease Monthly Payment</span><span>${leaseMonthly}/mo</span>
                    </label>
                    <input type="range" min="150" max="600" step="25" value={leaseMonthly}
                        onChange={(e) => setLeaseMonthly(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent)' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <ResultCard
                    title="PAY CASH"
                    total={results.cash}
                    subtitle={`+ $${results.cashOpportunity?.toLocaleString()} opportunity cost`}
                    isWinner={cheapest === 'cash'}
                />
                <ResultCard
                    title="FINANCE"
                    total={results.finance}
                    subtitle={`$${results.financeMonthly}/mo • $${results.financeInterest?.toLocaleString()} interest`}
                    isWinner={cheapest === 'finance'}
                />
                <ResultCard
                    title="LEASE"
                    total={results.lease}
                    subtitle={`$${results.leaseMonthly}/mo • No ownership`}
                    isWinner={cheapest === 'lease'}
                />
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
                Note: Cash cost includes opportunity cost (what you'd earn if invested at {investmentReturn}% instead).
            </p>
        </div>
    );
}

function ResultCard({ title, total, subtitle, isWinner }) {
    return (
        <div style={{
            padding: '1rem',
            backgroundColor: isWinner ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
            borderRadius: 'var(--radius)',
            border: isWinner ? '2px solid var(--primary)' : '1px solid var(--border)',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: isWinner ? 'var(--primary)' : 'var(--text-muted)' }}>
                {title} {isWinner && '✓'}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{subtitle}</div>
        </div>
    );
}
