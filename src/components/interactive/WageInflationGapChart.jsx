import { useMemo, useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const YEARS = Array.from({ length: 26 }, (_, i) => 2000 + i);

// Annual % changes from 2001 through the latest full-year point in this lesson dataset.
const INFLATION_GROWTH = [
    2.8, 1.6, 2.3, 2.7, 3.4, 3.2, 2.8, 3.8, -0.4, 1.6,
    3.2, 2.1, 1.5, 1.6, 0.1, 1.3, 2.1, 2.4, 1.8, 1.2,
    4.7, 8.0, 4.1, 3.4, 2.9
];

const WAGE_GROWTH = [
    2.2, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.2, 1.2, 1.3,
    1.6, 1.8, 1.8, 1.9, 2.0, 2.1, 2.2, 2.4, 2.5, 2.3,
    3.2, 4.0, 3.5, 3.3, 3.1
];

function buildTrendData() {
    let inflationIndex = 100;
    let wageIndex = 100;

    const rows = [
        {
            year: YEARS[0],
            inflationIndex: 100,
            wageIndex: 100,
            cashPowerIndex: 100
        }
    ];

    for (let i = 1; i < YEARS.length; i++) {
        inflationIndex *= (1 + INFLATION_GROWTH[i - 1] / 100);
        wageIndex *= (1 + WAGE_GROWTH[i - 1] / 100);

        rows.push({
            year: YEARS[i],
            inflationIndex: Number(inflationIndex.toFixed(1)),
            wageIndex: Number(wageIndex.toFixed(1)),
            cashPowerIndex: Number(((100 / inflationIndex) * 100).toFixed(1))
        });
    }

    return rows;
}

function money(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

export default function WageInflationGapChart() {
    const [idleCash, setIdleCash] = useState(10000);
    const data = useMemo(() => buildTrendData(), []);

    const latest = data[data.length - 1];
    const realCashValue = idleCash * (latest.cashPowerIndex / 100);
    const purchasingPowerLoss = idleCash - realCashValue;

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
            <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)' }}>
                Wage Growth vs Inflation (2000-Present Trend)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Indexed to 100 in 2000. When inflation rises faster than wages, purchasing power falls.
            </p>

            <div style={{ height: '320px', marginBottom: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fontSize: 11 }} />
                        <YAxis stroke="var(--text-muted)" width={50} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                            formatter={(value, name) => [`${value}`, name]}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="wageIndex"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            dot={false}
                            name="Wage Growth Index"
                        />
                        <Line
                            type="monotone"
                            dataKey="inflationIndex"
                            stroke="#ef4444"
                            strokeWidth={2.5}
                            dot={false}
                            name="Inflation (CPI) Index"
                        />
                        <Line
                            type="monotone"
                            dataKey="cashPowerIndex"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="6 4"
                            dot={false}
                            name="Idle Cash Purchasing Power"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.6rem',
                marginBottom: '1rem'
            }}>
                <MetricCard label="Wage Index" value={latest.wageIndex} color="#3b82f6" />
                <MetricCard label="Inflation Index" value={latest.inflationIndex} color="#ef4444" />
                <MetricCard label="Idle Cash Power" value={`${latest.cashPowerIndex}%`} color="#f59e0b" />
            </div>

            <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '0.9rem',
                marginBottom: '0.9rem',
                backgroundColor: 'rgba(255,255,255,0.02)'
            }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.82rem' }}>
                    <span>Idle Cash Amount</span>
                    <span>{money(idleCash)}</span>
                </label>
                <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={idleCash}
                    onChange={(e) => setIdleCash(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent)' }}
                />

                <div style={{ marginTop: '0.65rem', fontSize: '0.8rem' }}>
                    Estimated purchasing power today: <strong>{money(realCashValue)}</strong>
                </div>
                <div style={{ marginTop: '0.2rem', fontSize: '0.8rem', color: '#ef4444' }}>
                    Purchasing power lost to inflation: <strong>{money(purchasingPowerLoss)}</strong>
                </div>
            </div>

            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Teaching dataset shows 2000 through the latest full-year trend point. Keep emergency cash liquid, but avoid leaving
                long-term money idle in near-zero-yield accounts.
            </p>
        </div>
    );
}

function MetricCard({ label, value, color }) {
    return (
        <div style={{
            border: `1px solid ${color}`,
            borderRadius: '10px',
            padding: '0.6rem'
        }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '700', color }}>{value}</div>
        </div>
    );
}
