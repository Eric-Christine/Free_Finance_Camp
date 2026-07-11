import { useEffect, useMemo, useState } from 'react';
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const DEFAULTS = {
    currentAge: 27,
    retirementAge: 65,
    salary: 70000,
    salaryGrowth: 3,
    contributionRate: 6,
    matchRate: 50,
    matchCap: 6,
    currentBalance: 0,
    annualReturn: 7
};

const LIMITS = {
    currentAge: { min: 18, max: 64 },
    retirementAge: { min: 30, max: 75 },
    salary: { min: 20000, max: 400000, step: 5000 },
    salaryGrowth: { min: 0, max: 8, step: 0.5 },
    contributionRate: { min: 0, max: 23, step: 1 },
    matchRate: { min: 0, max: 200, step: 5 },
    matchCap: { min: 0, max: 15, step: 1 },
    currentBalance: { min: 0, max: 1000000, step: 5000 },
    annualReturn: { min: 3, max: 12, step: 0.5 }
};

const IRS_LIMIT_2026 = 24500;
const CATCH_UP_AGE = 50;
const CATCH_UP_AMOUNT_2026 = 8000;
const HIGHER_CATCH_UP_MIN_AGE = 60;
const HIGHER_CATCH_UP_MAX_AGE = 63;
const HIGHER_CATCH_UP_AMOUNT_2026 = 11250;

function getEmployeeContributionLimit(age) {
    if (age >= HIGHER_CATCH_UP_MIN_AGE && age <= HIGHER_CATCH_UP_MAX_AGE) {
        return IRS_LIMIT_2026 + HIGHER_CATCH_UP_AMOUNT_2026;
    }
    if (age >= CATCH_UP_AGE) {
        return IRS_LIMIT_2026 + CATCH_UP_AMOUNT_2026;
    }
    return IRS_LIMIT_2026;
}

function formatCurrency(value) {
    if (!Number.isFinite(value)) return '$0';
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
}

function formatCompact(value) {
    if (!Number.isFinite(value)) return '$0';
    const abs = Math.abs(value);
    if (abs >= 1000000) return `$${(value / 1000000).toFixed(abs >= 10000000 ? 0 : 1)}M`;
    if (abs >= 1000) return `$${(value / 1000).toFixed(abs >= 100000 ? 0 : 1)}k`;
    return `$${Math.round(value)}`;
}

function progress(value, min, max) {
    return ((value - min) / (max - min)) * 100;
}

export default function FourOhOneKCalculator() {
    const [currentAge, setCurrentAge] = useState(DEFAULTS.currentAge);
    const [retirementAge, setRetirementAge] = useState(DEFAULTS.retirementAge);
    const [salary, setSalary] = useState(DEFAULTS.salary);
    const [salaryGrowth, setSalaryGrowth] = useState(DEFAULTS.salaryGrowth);
    const [contributionRate, setContributionRate] = useState(DEFAULTS.contributionRate);
    const [matchRate, setMatchRate] = useState(DEFAULTS.matchRate);
    const [matchCap, setMatchCap] = useState(DEFAULTS.matchCap);
    const [currentBalance, setCurrentBalance] = useState(DEFAULTS.currentBalance);
    const [annualReturn, setAnnualReturn] = useState(DEFAULTS.annualReturn);
    const [isWideLayout, setIsWideLayout] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(min-width: 1100px)').matches
    );

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia('(min-width: 1100px)');
        const handler = (e) => setIsWideLayout(e.matches);
        setIsWideLayout(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const results = useMemo(() => {
        const safeCurrentAge = Math.max(LIMITS.currentAge.min, Math.min(currentAge, LIMITS.currentAge.max));
        const safeRetirementAge = Math.max(safeCurrentAge + 1, Math.min(retirementAge, LIMITS.retirementAge.max));
        const monthlyReturn = annualReturn / 100 / 12;
        const years = safeRetirementAge - safeCurrentAge;

        const data = [];
        let balance = currentBalance;
        let totalEmployeeContrib = 0;
        let totalEmployerContrib = 0;
        let totalGrowth = 0;
        let currentSalary = salary;

        data.push({
            age: safeCurrentAge,
            balance: Math.round(balance),
            startingBalance: Math.round(currentBalance),
            employeeTotal: 0,
            employerTotal: 0,
            growthTotal: 0
        });

        for (let y = 0; y < years; y++) {
            const age = safeCurrentAge + y;
            const irsLimit = getEmployeeContributionLimit(age);

            const rawEmployeeAnnual = currentSalary * (contributionRate / 100);
            const employeeAnnual = Math.min(rawEmployeeAnnual, irsLimit);

            const matchedSalaryPct = Math.min(contributionRate, matchCap);
            const employerAnnual = currentSalary * (matchedSalaryPct / 100) * (matchRate / 100);

            const monthlyEmployee = employeeAnnual / 12;
            const monthlyEmployer = employerAnnual / 12;

            for (let m = 0; m < 12; m++) {
                const growth = balance * monthlyReturn;
                balance += growth + monthlyEmployee + monthlyEmployer;
            }

            totalEmployeeContrib += employeeAnnual;
            totalEmployerContrib += employerAnnual;
            totalGrowth = balance - currentBalance - totalEmployeeContrib - totalEmployerContrib;

            data.push({
                age: age + 1,
                balance: Math.round(balance),
                startingBalance: Math.round(currentBalance),
                employeeTotal: Math.round(totalEmployeeContrib),
                employerTotal: Math.round(totalEmployerContrib),
                growthTotal: Math.round(totalGrowth)
            });

            currentSalary *= (1 + salaryGrowth / 100);
        }

        const firstYearEmployee = Math.min(
            salary * (contributionRate / 100),
            getEmployeeContributionLimit(safeCurrentAge)
        );
        const firstMatchedPct = Math.min(contributionRate, matchCap);
        const firstYearEmployer = salary * (firstMatchedPct / 100) * (matchRate / 100);
        const missedMatch = contributionRate < matchCap
            ? salary * ((matchCap - contributionRate) / 100) * (matchRate / 100)
            : 0;

        return {
            data,
            finalBalance: Math.round(balance),
            totalEmployeeContrib: Math.round(totalEmployeeContrib),
            totalEmployerContrib: Math.round(totalEmployerContrib),
            totalGrowth: Math.round(totalGrowth),
            firstYearEmployee: Math.round(firstYearEmployee),
            firstYearEmployer: Math.round(firstYearEmployer),
            missedMatch: Math.round(missedMatch),
            years
        };
    }, [currentAge, retirementAge, salary, salaryGrowth, contributionRate, matchRate, matchCap, currentBalance, annualReturn]);

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
                401(k) Calculator
            </h3>
            <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginBottom: '1rem'
            }}>
                Project your 401(k) balance at retirement based on your salary, contributions, and employer match.
            </p>

            <div style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: isWideLayout ? 'minmax(320px, 400px) minmax(0, 1fr)' : '1fr',
                minHeight: 0,
                flex: 1
            }}>
                {/* Inputs Panel */}
                <div style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.02)',
                    minWidth: 0,
                    overflowY: 'auto'
                }}>
                    <SliderRow
                        label="Current Age"
                        value={currentAge}
                        min={LIMITS.currentAge.min}
                        max={LIMITS.currentAge.max}
                        step={1}
                        onChange={(nextAge) => {
                            setCurrentAge(nextAge);
                            if (retirementAge <= nextAge) {
                                setRetirementAge(Math.min(nextAge + 1, LIMITS.retirementAge.max));
                            }
                        }}
                    />
                    <SliderRow
                        label="Retirement Age"
                        value={retirementAge}
                        min={Math.max(currentAge + 1, LIMITS.retirementAge.min)}
                        max={LIMITS.retirementAge.max}
                        step={1}
                        onChange={setRetirementAge}
                    />
                    <SliderRow
                        label="Annual Salary"
                        value={salary}
                        min={LIMITS.salary.min}
                        max={LIMITS.salary.max}
                        step={LIMITS.salary.step}
                        format={formatCurrency}
                        onChange={setSalary}
                    />
                    <SliderRow
                        label="Your Contribution Rate"
                        value={contributionRate}
                        min={LIMITS.contributionRate.min}
                        max={LIMITS.contributionRate.max}
                        step={LIMITS.contributionRate.step}
                        suffix="%"
                        onChange={setContributionRate}
                        hint={`${formatCurrency(Math.min(salary * contributionRate / 100, getEmployeeContributionLimit(currentAge)))}/yr`}
                    />
                    <SliderRow
                        label="Employer Match"
                        value={matchRate}
                        min={LIMITS.matchRate.min}
                        max={LIMITS.matchRate.max}
                        step={LIMITS.matchRate.step}
                        suffix="% of your contribution"
                        onChange={setMatchRate}
                    />
                    <SliderRow
                        label="Match Up To"
                        value={matchCap}
                        min={LIMITS.matchCap.min}
                        max={LIMITS.matchCap.max}
                        step={LIMITS.matchCap.step}
                        suffix="% of salary"
                        onChange={setMatchCap}
                    />
                    <SliderRow
                        label="Annual Salary Raise"
                        value={salaryGrowth}
                        min={LIMITS.salaryGrowth.min}
                        max={LIMITS.salaryGrowth.max}
                        step={LIMITS.salaryGrowth.step}
                        suffix="%"
                        onChange={setSalaryGrowth}
                    />
                    <SliderRow
                        label="Expected Annual Return"
                        value={annualReturn}
                        min={LIMITS.annualReturn.min}
                        max={LIMITS.annualReturn.max}
                        step={LIMITS.annualReturn.step}
                        suffix="%"
                        onChange={setAnnualReturn}
                    />
                    <SliderRow
                        label="Current 401(k) Balance"
                        value={currentBalance}
                        min={LIMITS.currentBalance.min}
                        max={LIMITS.currentBalance.max}
                        step={LIMITS.currentBalance.step}
                        format={formatCurrency}
                        onChange={setCurrentBalance}
                    />

                    {/* Summary Metrics */}
                    <div style={{ marginTop: '0.2rem', display: 'grid', gap: '0.55rem' }}>
                        <MetricCard
                            label="Projected balance at retirement"
                            value={formatCurrency(results.finalBalance)}
                            color="#22c55e"
                        />
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.55rem'
                        }}>
                            <MetricCard
                                label="Your contributions"
                                value={formatCurrency(results.totalEmployeeContrib)}
                                color="#60a5fa"
                            />
                            <MetricCard
                                label="Employer contributions"
                                value={formatCurrency(results.totalEmployerContrib)}
                                color="#a78bfa"
                            />
                        </div>
                        <MetricCard
                            label="Investment growth"
                            value={formatCurrency(results.totalGrowth)}
                            color="#f59e0b"
                        />
                        {results.missedMatch > 0 && (
                            <div style={{
                                border: '1px solid rgba(245, 158, 11, 0.45)',
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                borderRadius: '10px',
                                padding: '0.65rem 0.75rem',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: '#f59e0b'
                            }}>
                                Your current settings are about {formatCurrency(results.missedMatch)}/yr below the full available employer match.
                                If your budget allows, a {matchCap}% contribution rate would capture the full match.
                            </div>
                        )}
                        {results.missedMatch === 0 && contributionRate > 0 && (
                            <div style={{
                                border: '1px solid rgba(34, 197, 94, 0.45)',
                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '10px',
                                padding: '0.65rem 0.75rem',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: '#22c55e'
                            }}>
                                You're capturing the full employer match.
                            </div>
                        )}
                    </div>
                </div>

                {/* Chart Panel */}
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
                        <span>{results.years} years to retirement</span>
                        <span>Year 1: you contribute {formatCurrency(results.firstYearEmployee)}, employer adds {formatCurrency(results.firstYearEmployer)}</span>
                    </div>

                    <div style={{ height: '100%', minHeight: isWideLayout ? '540px' : '460px', minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={results.data} margin={{ top: 12, right: 8, left: 2, bottom: 8 }}>
                                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
                                <XAxis
                                    dataKey="age"
                                    tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                                    stroke="var(--text-muted)"
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'Age', position: 'insideBottomRight', offset: -2, fill: 'var(--text-muted)', fontSize: 12 }}
                                />
                                <YAxis
                                    tickFormatter={formatCompact}
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
                                    dataKey="startingBalance"
                                    stackId="breakdown"
                                    stroke="#34d399"
                                    fill="rgba(52, 211, 153, 0.3)"
                                    name="Starting Balance"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="employeeTotal"
                                    stackId="breakdown"
                                    stroke="#60a5fa"
                                    fill="rgba(96, 165, 250, 0.35)"
                                    name="Your Contributions"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="employerTotal"
                                    stackId="breakdown"
                                    stroke="#a78bfa"
                                    fill="rgba(167, 139, 250, 0.35)"
                                    name="Employer Match"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="growthTotal"
                                    stackId="breakdown"
                                    stroke="#f59e0b"
                                    fill="rgba(245, 158, 11, 0.25)"
                                    name="Investment Growth"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Assumptions */}
            <div style={{
                marginTop: '0.9rem',
                padding: '0.7rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6'
            }}>
                <strong style={{ color: 'var(--text-light)' }}>Assumptions:</strong>
                <ul style={{ margin: '0.2rem 0 0 1rem', padding: 0 }}>
                    <li>2026 IRS employee contribution limit: {formatCurrency(IRS_LIMIT_2026)}</li>
                    <li>2026 catch-up limit: +{formatCurrency(CATCH_UP_AMOUNT_2026)} at age 50+, or +{formatCurrency(HIGHER_CATCH_UP_AMOUNT_2026)} at ages 60–63, if the plan permits</li>
                    <li>Current contribution limits are held constant throughout the projection</li>
                    <li>Employer match is not subject to the employee contribution limit</li>
                    <li>Returns are compounded monthly; salary grows annually</li>
                    <li>Does not account for taxes, inflation, or early withdrawal penalties</li>
                </ul>
            </div>
        </div>
    );
}

function SliderRow({ label, value, min, max, step, suffix, format, hint, onChange }) {
    const displayValue = format ? format(value) : `${value}${suffix || ''}`;
    const pct = progress(value, min, max);

    return (
        <div style={{ display: 'grid', gap: '0.3rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '0.5rem'
            }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {label}
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {displayValue}
                    {hint && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.4rem' }}>
                            ({hint})
                        </span>
                    )}
                </span>
            </div>
            <input
                aria-label={label}
                type="range"
                className="landing-slider"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    background: `linear-gradient(to right, var(--primary) ${pct}%, var(--slider-track-empty) ${pct}%)`
                }}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                marginTop: '0.05rem'
            }}>
                <span>{format ? format(min) : `${min}${suffix || ''}`}</span>
                <span>{format ? format(max) : `${max}${suffix || ''}`}</span>
            </div>
        </div>
    );
}

function MetricCard({ label, value, color }) {
    return (
        <div style={{
            border: `1px solid ${color}55`,
            borderRadius: '10px',
            padding: '0.55rem 0.75rem',
            backgroundColor: `${color}14`
        }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                {label}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {value}
            </div>
        </div>
    );
}
