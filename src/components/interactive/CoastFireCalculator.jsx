import { useEffect, useMemo, useState } from 'react';
import {
    Area,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const DEFAULTS = {
    currentAge: 27,
    retirementAge: 65,
    annualSpending: 30000,
    currentAssets: 100000,
    monthlyContribution: 500,
    growthRate: 0.07,
    inflationRate: 0.03,
    withdrawalRate: 0.04
};

const LIMITS = {
    currentAge: { min: 18, max: 75, step: 1 },
    retirementAge: { min: 40, max: 80, step: 1 },
    annualSpending: { min: 10000, max: 250000, step: 1000 },
    currentAssets: { min: 0, max: 5000000, step: 1000 },
    monthlyContribution: { min: 0, max: 10000, step: 50 },
    growthRate: { min: 0.04, max: 0.14, step: 0.001 },
    inflationRate: { min: 0.01, max: 0.07, step: 0.001 },
    withdrawalRate: { min: 0.02, max: 0.06, step: 0.001 }
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function monthlyRateFromAnnual(annualRate) {
    const safeRate = clamp(annualRate, -0.95, 0.3);
    return Math.pow(1 + safeRate, 1 / 12) - 1;
}

function formatCurrency(value, digits = 0) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return safeValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: digits,
        minimumFractionDigits: digits
    });
}

function formatCompactCurrency(value) {
    if (!Number.isFinite(value)) return '$0';

    const abs = Math.abs(value);
    if (abs >= 1000000) {
        return `$${(value / 1000000).toFixed(abs >= 10000000 ? 0 : 1)}M`;
    }

    if (abs >= 1000) {
        return `$${(value / 1000).toFixed(abs >= 100000 ? 0 : 1)}k`;
    }

    return `$${Math.round(value)}`;
}

function niceStep(rawStep) {
    if (!Number.isFinite(rawStep) || rawStep <= 0) return 1;

    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const normalized = rawStep / magnitude;

    if (normalized <= 1.5) return 1 * magnitude;
    if (normalized <= 3) return 2 * magnitude;
    if (normalized <= 4) return 2.5 * magnitude;
    if (normalized <= 7) return 5 * magnitude;
    return 10 * magnitude;
}

function buildYAxis(maxValue, targetTicks = 6) {
    if (!Number.isFinite(maxValue) || maxValue <= 0) {
        return { maxY: 1000000, ticks: [0, 250000, 500000, 750000, 1000000] };
    }

    const roughStep = maxValue / Math.max(targetTicks - 1, 1);
    const step = niceStep(roughStep);
    const roundedMax = Math.ceil(maxValue / step) * step;
    const ticks = [];

    for (let tick = 0; tick <= roundedMax + step * 0.001; tick += step) {
        ticks.push(tick);
    }

    return { maxY: roundedMax, ticks };
}

function parseNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

export default function CoastFireCalculator() {
    const [currentAge, setCurrentAge] = useState(DEFAULTS.currentAge);
    const [retirementAge, setRetirementAge] = useState(DEFAULTS.retirementAge);
    const [annualSpending, setAnnualSpending] = useState(DEFAULTS.annualSpending);
    const [currentAssets, setCurrentAssets] = useState(DEFAULTS.currentAssets);
    const [monthlyContribution, setMonthlyContribution] = useState(DEFAULTS.monthlyContribution);
    const [growthRate, setGrowthRate] = useState(DEFAULTS.growthRate);
    const [inflationRate, setInflationRate] = useState(DEFAULTS.inflationRate);
    const [withdrawalRate, setWithdrawalRate] = useState(DEFAULTS.withdrawalRate);

    const {
        data,
        maxY,
        yTicks,
        fireNumber,
        coastNumberNow,
        coastMilestoneAge,
        yearsToCoast,
        yearsToRetirement,
        realReturn,
        endingWithContributions,
        endingCoastPlan
    } = useMemo(() => {
        const safeCurrentAge = clamp(
            Math.round(parseNumber(currentAge, DEFAULTS.currentAge)),
            LIMITS.currentAge.min,
            LIMITS.currentAge.max
        );

        const minimumRetirementAge = Math.max(safeCurrentAge + 1, LIMITS.retirementAge.min);
        const safeRetirementAge = clamp(
            Math.round(parseNumber(retirementAge, DEFAULTS.retirementAge)),
            minimumRetirementAge,
            LIMITS.retirementAge.max
        );

        const safeAnnualSpending = clamp(
            parseNumber(annualSpending, DEFAULTS.annualSpending),
            LIMITS.annualSpending.min,
            LIMITS.annualSpending.max
        );

        const safeCurrentAssets = clamp(
            parseNumber(currentAssets, DEFAULTS.currentAssets),
            LIMITS.currentAssets.min,
            LIMITS.currentAssets.max
        );

        const safeMonthlyContribution = clamp(
            parseNumber(monthlyContribution, DEFAULTS.monthlyContribution),
            LIMITS.monthlyContribution.min,
            LIMITS.monthlyContribution.max
        );

        const safeGrowthRate = clamp(
            parseNumber(growthRate, DEFAULTS.growthRate),
            LIMITS.growthRate.min,
            LIMITS.growthRate.max
        );

        const safeInflationRate = clamp(
            parseNumber(inflationRate, DEFAULTS.inflationRate),
            LIMITS.inflationRate.min,
            LIMITS.inflationRate.max
        );

        const safeWithdrawalRate = clamp(
            parseNumber(withdrawalRate, DEFAULTS.withdrawalRate),
            LIMITS.withdrawalRate.min,
            LIMITS.withdrawalRate.max
        );

        const yearsRemaining = safeRetirementAge - safeCurrentAge;
        const fire = safeAnnualSpending / safeWithdrawalRate;
        const annualRealReturn = clamp(safeGrowthRate - safeInflationRate, -0.95, 0.3);
        const monthlyRealReturn = monthlyRateFromAnnual(annualRealReturn);

        const rows = [];
        let balanceWithContrib = safeCurrentAssets;
        let reachedCoastAge = null;

        for (let age = safeCurrentAge; age <= safeRetirementAge; age += 1) {
            const yearsToGoal = safeRetirementAge - age;
            const coastTarget = fire / Math.pow(1 + annualRealReturn, yearsToGoal);

            rows.push({
                age,
                withContrib: balanceWithContrib,
                coastNumber: coastTarget,
                fireNumber: fire
            });

            if (reachedCoastAge === null && balanceWithContrib >= coastTarget) {
                reachedCoastAge = age;
            }

            if (age < safeRetirementAge) {
                for (let month = 0; month < 12; month += 1) {
                    balanceWithContrib = balanceWithContrib * (1 + monthlyRealReturn) + safeMonthlyContribution;
                }
            }
        }

        let balanceCoastPlan = safeCurrentAssets;
        for (let index = 0; index < rows.length; index += 1) {
            const age = rows[index].age;
            rows[index].coastPlan = balanceCoastPlan;

            if (age < safeRetirementAge) {
                const monthlyDeposit = reachedCoastAge === null || age < reachedCoastAge
                    ? safeMonthlyContribution
                    : 0;

                for (let month = 0; month < 12; month += 1) {
                    balanceCoastPlan = balanceCoastPlan * (1 + monthlyRealReturn) + monthlyDeposit;
                }
            }
        }

        const points = rows.length > 0 ? rows : [{
            age: safeCurrentAge,
            withContrib: safeCurrentAssets,
            coastPlan: safeCurrentAssets,
            coastNumber: fire,
            fireNumber: fire
        }];

        const highestValue = points.reduce((highest, row) => {
            return Math.max(
                highest,
                row.withContrib,
                row.coastPlan,
                row.coastNumber,
                row.fireNumber
            );
        }, 0);

        const { maxY: chartMaxY, ticks } = buildYAxis(highestValue * 1.05, 6);
        const coastNow = points[0].coastNumber;
        const endingWith = points[points.length - 1].withContrib;
        const endingCoast = points[points.length - 1].coastPlan;

        return {
            data: points,
            maxY: chartMaxY,
            yTicks: ticks,
            fireNumber: fire,
            coastNumberNow: coastNow,
            coastMilestoneAge: reachedCoastAge,
            yearsToCoast: reachedCoastAge === null ? null : reachedCoastAge - safeCurrentAge,
            yearsToRetirement: yearsRemaining,
            realReturn: annualRealReturn,
            endingWithContributions: endingWith,
            endingCoastPlan: endingCoast
        };
    }, [
        annualSpending,
        currentAge,
        currentAssets,
        growthRate,
        inflationRate,
        monthlyContribution,
        retirementAge,
        withdrawalRate
    ]);

    const growthProgress = ((growthRate - LIMITS.growthRate.min) / (LIMITS.growthRate.max - LIMITS.growthRate.min)) * 100;
    const inflationProgress = ((inflationRate - LIMITS.inflationRate.min) / (LIMITS.inflationRate.max - LIMITS.inflationRate.min)) * 100;
    const withdrawalProgress = ((withdrawalRate - LIMITS.withdrawalRate.min) / (LIMITS.withdrawalRate.max - LIMITS.withdrawalRate.min)) * 100;

    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.4rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden'
        }}>
            <h3 style={{
                marginBottom: '0.35rem',
                color: 'var(--primary)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '-0.01em'
            }}>
                Coast FIRE Calculator
            </h3>
            <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginBottom: '1rem'
            }}>
                Find the point where your investments can grow to your FIRE goal without future contributions.
            </p>

            <div style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                minHeight: 0,
                flex: 1
            }}>
                <div style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                    background: 'rgba(15, 23, 42, 0.02)',
                    minWidth: 0
                }}>
                    <InputRow
                        label="Current age"
                        value={currentAge}
                        min={LIMITS.currentAge.min}
                        max={LIMITS.currentAge.max}
                        step={LIMITS.currentAge.step}
                        onChange={(value) => setCurrentAge(
                            clamp(Math.round(value), LIMITS.currentAge.min, LIMITS.currentAge.max)
                        )}
                    />
                    <InputRow
                        label="Retirement age"
                        value={retirementAge}
                        min={Math.max(currentAge + 1, LIMITS.retirementAge.min)}
                        max={LIMITS.retirementAge.max}
                        step={LIMITS.retirementAge.step}
                        onChange={(value) => setRetirementAge(
                            clamp(Math.round(value), Math.max(currentAge + 1, LIMITS.retirementAge.min), LIMITS.retirementAge.max)
                        )}
                    />
                    <InputRow
                        label="Annual spending in retirement"
                        value={annualSpending}
                        min={LIMITS.annualSpending.min}
                        max={LIMITS.annualSpending.max}
                        step={LIMITS.annualSpending.step}
                        prefix="$"
                        onChange={(value) => setAnnualSpending(
                            clamp(value, LIMITS.annualSpending.min, LIMITS.annualSpending.max)
                        )}
                    />
                    <InputRow
                        label="Current invested assets"
                        value={currentAssets}
                        min={LIMITS.currentAssets.min}
                        max={LIMITS.currentAssets.max}
                        step={LIMITS.currentAssets.step}
                        prefix="$"
                        onChange={(value) => setCurrentAssets(
                            clamp(value, LIMITS.currentAssets.min, LIMITS.currentAssets.max)
                        )}
                    />
                    <InputRow
                        label="Monthly contribution"
                        value={monthlyContribution}
                        min={LIMITS.monthlyContribution.min}
                        max={LIMITS.monthlyContribution.max}
                        step={LIMITS.monthlyContribution.step}
                        prefix="$"
                        onChange={(value) => setMonthlyContribution(
                            clamp(value, LIMITS.monthlyContribution.min, LIMITS.monthlyContribution.max)
                        )}
                    />

                    <RateRow
                        label="Investment growth rate"
                        value={growthRate}
                        min={LIMITS.growthRate.min}
                        max={LIMITS.growthRate.max}
                        step={LIMITS.growthRate.step}
                        progress={growthProgress}
                        onChange={(value) => setGrowthRate(clamp(value, LIMITS.growthRate.min, LIMITS.growthRate.max))}
                    />
                    <RateRow
                        label="Inflation rate"
                        value={inflationRate}
                        min={LIMITS.inflationRate.min}
                        max={LIMITS.inflationRate.max}
                        step={LIMITS.inflationRate.step}
                        progress={inflationProgress}
                        onChange={(value) => setInflationRate(clamp(value, LIMITS.inflationRate.min, LIMITS.inflationRate.max))}
                    />
                    <RateRow
                        label="Safe withdrawal rate"
                        value={withdrawalRate}
                        min={LIMITS.withdrawalRate.min}
                        max={LIMITS.withdrawalRate.max}
                        step={LIMITS.withdrawalRate.step}
                        progress={withdrawalProgress}
                        onChange={(value) => setWithdrawalRate(clamp(value, LIMITS.withdrawalRate.min, LIMITS.withdrawalRate.max))}
                    />

                    <div style={{
                        marginTop: '0.2rem',
                        display: 'grid',
                        gap: '0.65rem'
                    }}>
                        <MetricCard
                            label="Coast FIRE number at current age"
                            value={formatCurrency(coastNumberNow)}
                        />
                        <MetricCard
                            label="FIRE number"
                            value={formatCurrency(fireNumber)}
                        />
                        <MetricCard
                            label="Real return assumption"
                            value={`${(realReturn * 100).toFixed(1)}%`}
                        />
                        <div style={{
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                            borderRadius: '10px',
                            padding: '0.75rem 0.8rem',
                            fontWeight: 600
                        }}>
                            {yearsToCoast === null && 'At these settings, you do not reach Coast FIRE before retirement.'}
                            {yearsToCoast === 0 && 'You have already reached Coast FIRE.'}
                            {yearsToCoast > 0 && `You are ${yearsToCoast} years from Coast FIRE (age ${coastMilestoneAge}).`}
                        </div>
                    </div>
                </div>

                <div style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '0.9rem 0.9rem 0.2rem',
                    backgroundColor: 'var(--bg-card)',
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        marginBottom: '0.45rem'
                    }}>
                        <span>Retirement in {yearsToRetirement} years</span>
                        <span>With contributions: {formatCurrency(endingWithContributions)}</span>
                        <span>Coast plan: {formatCurrency(endingCoastPlan)}</span>
                    </div>

                    <div style={{ height: '100%', minHeight: '460px', minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 12, right: 8, left: 2, bottom: 8 }}>
                                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                                <XAxis
                                    dataKey="age"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    stroke="var(--text-muted)"
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'Age (years)', position: 'insideBottomRight', offset: -2, fill: 'var(--text-muted)', fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[0, maxY]}
                                    ticks={yTicks}
                                    tickFormatter={formatCompactCurrency}
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    stroke="var(--text-muted)"
                                    width={78}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        boxShadow: 'var(--shadow)',
                                        color: 'var(--text-main)'
                                    }}
                                    labelFormatter={(age) => `Age ${age}`}
                                    formatter={(value) => formatCurrency(value)}
                                />
                                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 8, fontSize: '0.82rem' }} />

                                <Area
                                    type="monotone"
                                    dataKey="coastPlan"
                                    stroke="#22c55e"
                                    fill="rgba(34, 197, 94, 0.2)"
                                    strokeWidth={2}
                                    name="Net worth with no contributions after Coast FIRE milestone"
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="withContrib"
                                    stroke="#9ca3af"
                                    strokeWidth={2}
                                    strokeDasharray="8 6"
                                    name="Net worth with continued contributions"
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="coastNumber"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    name="Coast FIRE number"
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="fireNumber"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    name="FIRE number"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputRow({
    label,
    value,
    min,
    max,
    step,
    onChange,
    prefix = ''
}) {
    const [draftValue, setDraftValue] = useState(String(value));

    useEffect(() => {
        setDraftValue(String(value));
    }, [value]);

    const commitDraftValue = () => {
        onChange(parseNumber(draftValue, value));
    };

    return (
        <label style={{ display: 'grid', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {label}
            </span>
            <div style={{ position: 'relative' }}>
                {prefix && (
                    <span style={{
                        position: 'absolute',
                        left: '0.65rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none',
                        fontWeight: 600
                    }}>
                        {prefix}
                    </span>
                )}
                <input
                    type="number"
                    value={draftValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={(event) => setDraftValue(event.target.value)}
                    onBlur={commitDraftValue}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.currentTarget.blur();
                        }
                    }}
                    style={{
                        width: '100%',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: prefix ? '0.58rem 0.7rem 0.58rem 1.5rem' : '0.58rem 0.7rem',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem'
                    }}
                />
            </div>
        </label>
    );
}

function RateRow({
    label,
    value,
    min,
    max,
    step,
    progress,
    onChange
}) {
    const [draftPercent, setDraftPercent] = useState((value * 100).toFixed(1));

    useEffect(() => {
        setDraftPercent((value * 100).toFixed(1));
    }, [value]);

    const commitDraftPercent = () => {
        const parsedPercent = parseNumber(draftPercent, value * 100);
        onChange(parsedPercent / 100);
    };

    return (
        <div style={{ display: 'grid', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {label}
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    {(value * 100).toFixed(1)}%
                </span>
            </div>

            <div style={{ display: 'grid', gap: '0.55rem', gridTemplateColumns: '1fr 82px', alignItems: 'center' }}>
                <div>
                    <input
                        type="range"
                        className="landing-slider"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(event) => onChange(parseNumber(event.target.value, value))}
                        style={{
                            background: `linear-gradient(to right, var(--primary) ${progress}%, var(--slider-track-empty) ${progress}%)`
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.73rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.15rem'
                    }}>
                        <span>{(min * 100).toFixed(0)}%</span>
                        <span>{(max * 100).toFixed(0)}%</span>
                    </div>
                </div>

                <input
                    type="number"
                    value={draftPercent}
                    min={min * 100}
                    max={max * 100}
                    step={step * 100}
                    onChange={(event) => setDraftPercent(event.target.value)}
                    onBlur={commitDraftPercent}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.currentTarget.blur();
                        }
                    }}
                    style={{
                        width: '100%',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '0.48rem 0.55rem',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem'
                    }}
                />
            </div>
        </div>
    );
}

function MetricCard({ label, value }) {
    return (
        <div style={{
            border: '1px solid rgba(16, 185, 129, 0.45)',
            borderRadius: '10px',
            padding: '0.65rem 0.75rem',
            backgroundColor: 'rgba(16, 185, 129, 0.08)'
        }}>
            <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                {label}
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {value}
            </div>
        </div>
    );
}
