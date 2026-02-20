import { useState } from 'react';

export default function InsuranceCompare() {
    const [expectedVisits, setExpectedVisits] = useState(4);
    const [prescriptions, setPrescriptions] = useState(2);
    const [majorEvent, setMajorEvent] = useState(false);

    const plans = [
        { name: 'Bronze (High Deductible)', premium: 150, deductible: 6000, copay: 50, coinsurance: 0.4, oopMax: 8000 },
        { name: 'Silver (Mid-tier)', premium: 300, deductible: 2500, copay: 30, coinsurance: 0.2, oopMax: 6000 },
        { name: 'Gold (Low Deductible)', premium: 450, deductible: 1000, copay: 20, coinsurance: 0.1, oopMax: 4000 }
    ];

    const calculateYearlyCost = (plan) => {
        const yearlyPremium = plan.premium * 12;
        const visitCosts = expectedVisits * plan.copay;
        const rxCosts = prescriptions * 12 * 15; // Assume $15/prescription

        let medicalCosts = visitCosts + rxCosts;

        if (majorEvent) {
            // Simulate a $15,000 surgery
            const surgeryBill = 15000;
            const afterDeductible = Math.max(0, surgeryBill - plan.deductible);
            const patientShare = afterDeductible * plan.coinsurance;
            const surgeryTotal = Math.min(plan.deductible + patientShare, plan.oopMax);
            medicalCosts += surgeryTotal;
        }

        return yearlyPremium + medicalCosts;
    };

    const costs = plans.map(p => ({ ...p, total: calculateYearlyCost(p) }));
    const cheapest = costs.reduce((min, p) => p.total < min.total ? p : min);

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
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Health Insurance Comparison</h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Adjust your expected healthcare usage to see which plan is best for you:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span>Doctor Visits per Year</span><span>{expectedVisits}</span>
                        </label>
                        <input type="range" min="0" max="12" value={expectedVisits}
                            onChange={(e) => setExpectedVisits(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--primary)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span>Monthly Prescriptions</span><span>{prescriptions}</span>
                        </label>
                        <input type="range" min="0" max="5" value={prescriptions}
                            onChange={(e) => setPrescriptions(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--secondary)' }} />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={majorEvent} onChange={(e) => setMajorEvent(e.target.checked)} />
                        <span style={{ fontSize: '0.85rem' }}>Include a major medical event ($15,000 surgery)</span>
                    </label>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem', flex: 1 }}>
                {costs.map((plan) => (
                    <div key={plan.name} style={{
                        padding: '1rem',
                        backgroundColor: plan.name === cheapest.name ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius)',
                        border: plan.name === cheapest.name ? '2px solid var(--primary)' : '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.55rem'
                    }}>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                {plan.name} {plan.name === cheapest.name && <span style={{ color: 'var(--primary)' }}>← Best for You</span>}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                ${plan.premium}/mo premium • ${plan.deductible} deductible
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: plan.name === cheapest.name ? 'var(--primary)' : 'inherit' }}>
                                ${plan.total.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>yearly cost</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
