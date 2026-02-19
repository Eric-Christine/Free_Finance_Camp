import { useMemo, useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

function money(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

function fvFactor(monthlyRate, months) {
    if (months <= 0) return 0;
    if (monthlyRate === 0) return months;
    return (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
}

function recurringFutureValue(monthlyContribution, monthlyRate, startAge, currentAge) {
    const months = Math.max(0, Math.round((currentAge - startAge) * 12));
    return monthlyContribution * fvFactor(monthlyRate, months);
}

function lumpFutureValue(lumpAmount, monthlyRate, startAge, currentAge) {
    if (currentAge < startAge) return 0;
    const months = Math.max(0, Math.round((currentAge - startAge) * 12));
    return lumpAmount * Math.pow(1 + monthlyRate, months);
}

export default function MoneyMultiplier() {
    const [earlyStartAge, setEarlyStartAge] = useState(22);
    const [lateStartAge, setLateStartAge] = useState(35);
    const [endAge, setEndAge] = useState(65);
    const [monthlyContribution, setMonthlyContribution] = useState(300);
    const [earlyLumpSum, setEarlyLumpSum] = useState(10000);
    const [annualReturn, setAnnualReturn] = useState(8);

    const monthlyRate = annualReturn / 100 / 12;
    const monthsEarly = (endAge - earlyStartAge) * 12;
    const monthsLate = (endAge - lateStartAge) * 12;

    const earlyRecurringFinal = recurringFutureValue(monthlyContribution, monthlyRate, earlyStartAge, endAge);
    const lateRecurringSameFinal = recurringFutureValue(monthlyContribution, monthlyRate, lateStartAge, endAge);
    const requiredLateMonthly = monthsLate > 0 ? earlyRecurringFinal / fvFactor(monthlyRate, monthsLate) : 0;

    const earlyLumpFinal = lumpFutureValue(earlyLumpSum, monthlyRate, earlyStartAge, endAge);
    const lateLumpSameFinal = lumpFutureValue(earlyLumpSum, monthlyRate, lateStartAge, endAge);
    const requiredLateLump = monthsLate > 0 ? earlyLumpFinal / Math.pow(1 + monthlyRate, monthsLate) : 0;

    const data = useMemo(() => {
        const startAge = 18;
        const rows = [];

        for (let age = startAge; age <= endAge; age++) {
            rows.push({
                age,
                earlyRecurring: recurringFutureValue(monthlyContribution, monthlyRate, earlyStartAge, age),
                lateRecurringSame: recurringFutureValue(monthlyContribution, monthlyRate, lateStartAge, age),
                lateRecurringCatchup: recurringFutureValue(requiredLateMonthly, monthlyRate, lateStartAge, age),
                earlyLump: lumpFutureValue(earlyLumpSum, monthlyRate, earlyStartAge, age),
                lateLumpSame: lumpFutureValue(earlyLumpSum, monthlyRate, lateStartAge, age),
                lateLumpCatchup: lumpFutureValue(requiredLateLump, monthlyRate, lateStartAge, age)
            });
        }

        return rows;
    }, [monthlyContribution, monthlyRate, earlyStartAge, lateStartAge, endAge, requiredLateMonthly, earlyLumpSum, requiredLateLump]);

    const earlyContribTotal = monthlyContribution * monthsEarly;
    const lateCatchupContribTotal = requiredLateMonthly * monthsLate;
    const recurringSeries = [
        { dataKey: 'earlyRecurring', stroke: '#3b82f6', name: 'Early Start (Auto-Invest)' },
        { dataKey: 'lateRecurringCatchup', stroke: '#10b981', name: 'Late Start (Catch-Up Monthly)', strokeDasharray: '6 4' },
        { dataKey: 'lateRecurringSame', stroke: '#f59e0b', name: 'Late Start (Same Monthly)' }
    ];
    const lumpSeries = [
        { dataKey: 'earlyLump', stroke: '#8b5cf6', name: 'Early Lump Sum' },
        { dataKey: 'lateLumpSame', stroke: '#f97316', name: 'Late Lump (Same Amount)' },
        { dataKey: 'lateLumpCatchup', stroke: '#ef4444', name: 'Late Lump (Required Catch-Up)', strokeDasharray: '6 4' }
    ];

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
            <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)' }}>Money Multiplier: Start Age Advantage</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                See how starting early with recurring, automatic investing can beat late catch-up strategies.
            </p>

            <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '1rem' }}>
                <Slider
                    label="Early start age"
                    value={earlyStartAge}
                    min={18}
                    max={40}
                    step={1}
                    display={`${earlyStartAge}`}
                    onChange={(next) => {
                        setEarlyStartAge(next);
                        if (lateStartAge <= next) setLateStartAge(next + 1);
                    }}
                />
                <Slider
                    label="Late start age"
                    value={lateStartAge}
                    min={earlyStartAge + 1}
                    max={55}
                    step={1}
                    display={`${lateStartAge}`}
                    onChange={(next) => {
                        setLateStartAge(next);
                        if (endAge <= next) setEndAge(next + 5);
                    }}
                />
                <Slider
                    label="Goal age"
                    value={endAge}
                    min={lateStartAge + 5}
                    max={75}
                    step={1}
                    display={`${endAge}`}
                    onChange={setEndAge}
                />
                <Slider
                    label="Monthly auto-invest amount"
                    value={monthlyContribution}
                    min={50}
                    max={2500}
                    step={25}
                    display={`${money(monthlyContribution)}/mo`}
                    onChange={setMonthlyContribution}
                />
                <Slider
                    label="Early lump sum"
                    value={earlyLumpSum}
                    min={1000}
                    max={100000}
                    step={500}
                    display={money(earlyLumpSum)}
                    onChange={setEarlyLumpSum}
                />
                <Slider
                    label="Annual return assumption"
                    value={annualReturn}
                    min={4}
                    max={12}
                    step={0.5}
                    display={`${annualReturn.toFixed(1)}%`}
                    onChange={setAnnualReturn}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <SummaryCard
                    title="Early Automatic Investing"
                    body={`Final value: ${money(earlyRecurringFinal)}\nTotal contributed: ${money(earlyContribTotal)}`}
                    color="#3b82f6"
                />
                <SummaryCard
                    title="Late Catch-Up Needed"
                    body={`Late start at same monthly: ${money(lateRecurringSameFinal)}\nRequired monthly: ${money(requiredLateMonthly)}/mo\nTotal contributed: ${money(lateCatchupContribTotal)}`}
                    color="#ef4444"
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Recurring Investing Comparison
                </div>
                <div style={{ height: 'clamp(220px, 34vh, 290px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="age" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                            <YAxis
                                stroke="var(--text-muted)"
                                width={56}
                                tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                                formatter={(value) => [money(value), '']}
                            />
                            {recurringSeries.map((series) => (
                                <Line
                                    key={series.dataKey}
                                    type="monotone"
                                    dataKey={series.dataKey}
                                    stroke={series.stroke}
                                    strokeWidth={2.5}
                                    strokeDasharray={series.strokeDasharray}
                                    dot={false}
                                    name={series.name}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <ChartLegend items={recurringSeries} />
            </div>

            <div style={{ marginBottom: '0.9rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    Lump Sum Early vs Later
                </div>
                <div style={{ height: 'clamp(210px, 30vh, 250px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="age" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                            <YAxis
                                stroke="var(--text-muted)"
                                width={56}
                                tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                                formatter={(value) => [money(value), '']}
                            />
                            {lumpSeries.map((series) => (
                                <Line
                                    key={series.dataKey}
                                    type="monotone"
                                    dataKey={series.dataKey}
                                    stroke={series.stroke}
                                    strokeWidth={2.5}
                                    strokeDasharray={series.strokeDasharray}
                                    dot={false}
                                    name={series.name}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <ChartLegend items={lumpSeries} />
            </div>

            <div style={{
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.02)',
                fontSize: '0.78rem',
                lineHeight: '1.45'
            }}>
                Starting early, recurring, and automatic usually lowers the monthly burden needed to hit the same long-term goal.
                Even small amounts can snowball when given enough time.
                <br />
                <strong>Late lump sum with same amount:</strong> {money(lateLumpSameFinal)} | <strong>Lump-sum catch-up needed later:</strong> {money(requiredLateLump)}
            </div>
        </div>
    );
}

function Slider({ label, value, min, max, step, display, onChange }) {
    return (
        <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem', gap: '0.5rem' }}>
                <span style={{ minWidth: 0 }}>{label}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{display}</span>
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

function SummaryCard({ title, body, color }) {
    return (
        <div style={{
            border: `1px solid ${color}`,
            borderRadius: '10px',
            padding: '0.7rem',
            minWidth: 0,
            whiteSpace: 'pre-line',
            overflowWrap: 'anywhere'
        }}>
            <div style={{ fontSize: '0.76rem', fontWeight: '600', color, marginBottom: '0.3rem' }}>{title}</div>
            <div style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>{body}</div>
        </div>
    );
}

function ChartLegend({ items }) {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem 0.95rem',
            marginTop: '0.45rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.35
        }}>
            {items.map((item) => (
                <div key={item.dataKey} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: 0 }}>
                    <span style={{
                        width: '13px',
                        height: 0,
                        borderRadius: '999px',
                        borderTop: item.strokeDasharray ? `2px dashed ${item.stroke}` : `2px solid ${item.stroke}`
                    }} />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
}
