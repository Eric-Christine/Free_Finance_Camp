import { useMemo, useState } from 'react';

const LOAN_TERMS = [48, 60, 72, 84];

function monthlyPayment(principal, annualRate, months) {
    const monthlyRate = annualRate / 100 / 12;

    if (monthlyRate === 0) {
        return principal / months;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
}

function money(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

export default function LoanTermTrapCalculator() {
    const [vehiclePrice, setVehiclePrice] = useState(32000);
    const [downPayment, setDownPayment] = useState(4000);
    const [apr, setApr] = useState(7.5);
    const [feesRolledIn, setFeesRolledIn] = useState(0);

    const principal = Math.max(0, vehiclePrice - downPayment + feesRolledIn);

    const comparisons = useMemo(() => {
        return LOAN_TERMS.map((term) => {
            const monthly = monthlyPayment(principal, apr, term);
            const totalPaid = monthly * term;
            const interest = totalPaid - principal;

            return {
                term,
                monthly,
                totalPaid,
                interest
            };
        });
    }, [principal, apr]);

    const base = comparisons[0];
    const longest = comparisons[comparisons.length - 1];
    const monthlyDrop = base.monthly - longest.monthly;
    const extraInterest = longest.interest - base.interest;

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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Monthly Payment Trap Simulator</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Sales pitch: "We can lower your monthly payment." Reality: extending the loan term can increase total interest cost.
            </p>

            <div style={{ display: 'grid', gap: '0.9rem', marginBottom: '1rem' }}>
                <Slider
                    label="Vehicle price"
                    value={vehiclePrice}
                    min={12000}
                    max={70000}
                    step={1000}
                    display={money(vehiclePrice)}
                    onChange={setVehiclePrice}
                />
                <Slider
                    label="Down payment"
                    value={downPayment}
                    min={0}
                    max={Math.round(vehiclePrice * 0.5)}
                    step={500}
                    display={money(downPayment)}
                    onChange={setDownPayment}
                />
                <Slider
                    label="APR"
                    value={apr}
                    min={0}
                    max={18}
                    step={0.25}
                    display={`${apr.toFixed(2)}%`}
                    onChange={setApr}
                />
                <Slider
                    label="Fees/Add-ons rolled into loan"
                    value={feesRolledIn}
                    min={0}
                    max={8000}
                    step={250}
                    display={money(feesRolledIn)}
                    onChange={setFeesRolledIn}
                />
            </div>

            <div style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                marginBottom: '1rem',
                fontSize: '0.85rem'
            }}>
                Estimated financed amount: <strong>{money(principal)}</strong>
            </div>

            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
                {comparisons.map((row) => (
                    <div key={row.term} style={{
                        display: 'grid',
                        gridTemplateColumns: '0.9fr 1fr 1fr',
                        gap: '0.5rem',
                        alignItems: 'center',
                        padding: '0.7rem',
                        borderRadius: '10px',
                        border: row.term === 48 ? '1px solid var(--primary)' : '1px solid var(--border)',
                        backgroundColor: row.term === 48 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)'
                    }}>
                        <div style={{ fontWeight: '600' }}>{row.term} mo</div>
                        <div style={{ fontSize: '0.85rem' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Monthly</div>
                            <div>{money(row.monthly)}</div>
                        </div>
                        <div style={{ fontSize: '0.85rem' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Total Interest</div>
                            <div>{money(row.interest)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                padding: '0.8rem',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fontSize: '0.85rem',
                lineHeight: '1.45'
            }}>
                Extending from 48 to 84 months lowers payment by about <strong>{money(monthlyDrop)}/month</strong>,
                but adds roughly <strong>{money(extraInterest)}</strong> in interest.
            </div>

            <div style={{ marginTop: '0.9rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Ask every lender/salesperson for this exact comparison: "same loan amount, show 48/60/72/84-month monthly payment and total interest."
            </div>
        </div>
    );
}

function Slider({ label, value, min, max, step, display, onChange }) {
    return (
        <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span>{label}</span>
                <span>{display}</span>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
        </div>
    );
}
