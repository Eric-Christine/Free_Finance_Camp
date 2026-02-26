import { useState, useMemo, useCallback, useEffect } from 'react';

const SAVINGS_RATES_FULL = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40];
const SAVINGS_RATES_MOBILE = [0.05, 0.10, 0.15, 0.20, 0.25];
const START_AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60];
const RETIREMENT_AGE = 65;
const ANNUAL_RETURN = 0.07;
const WITHDRAWAL_RATE = 0.04;
const MEDIAN_US_INCOME = 60000;
const DEFAULT_ALREADY_INVESTED = 0;

function futureValue(monthlyContribution, monthlyRate, months) {
    if (months <= 0) return 0;
    return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

function getColor(pct) {
    if (pct >= 150) return '#22763a';
    if (pct >= 100) return '#3da557';
    if (pct >= 66) return '#7bc67f';
    if (pct >= 40) return '#f2d24e';
    if (pct >= 20) return '#e8816d';
    return '#d4503c';
}

function getTextColor(pct) {
    if (pct >= 150) return '#fff';
    if (pct >= 100) return '#fff';
    if (pct >= 66) return '#1a3a1a';
    if (pct >= 40) return '#3a2e00';
    if (pct >= 20) return '#fff';
    return '#fff';
}

function money(value) {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(value >= 10000000 ? 1 : 2)}M`;
    }
    return `$${Math.round(value).toLocaleString()}`;
}

export default function SavingsRateCalculator() {
    const [salary, setSalary] = useState(MEDIAN_US_INCOME);
    const [alreadyInvested, setAlreadyInvested] = useState(DEFAULT_ALREADY_INVESTED);
    const [annualReturn, setAnnualReturn] = useState(ANNUAL_RETURN);
    const [withdrawalRate, setWithdrawalRate] = useState(WITHDRAWAL_RATE);
    const [retirementAge, setRetirementAge] = useState(RETIREMENT_AGE);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < 600
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 599px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const savingsRates = isMobile ? SAVINGS_RATES_MOBILE : SAVINGS_RATES_FULL;

    const visibleAges = START_AGES.filter((age) => age < retirementAge);

    const tableData = useMemo(() => {
        const monthlyRate = annualReturn / 12;
        const grid = {};

        for (const age of START_AGES) {
            if (age >= retirementAge) continue;
            grid[age] = {};
            const months = (retirementAge - age) * 12;

            for (const rate of SAVINGS_RATES_FULL) {
                const monthlyContrib = (salary * rate) / 12;
                const growthFactor = Math.pow(1 + monthlyRate, months);
                const compoundedLumpSum = alreadyInvested * growthFactor;
                const contributionFutureValue = futureValue(monthlyContrib, monthlyRate, months);
                const fv = compoundedLumpSum + contributionFutureValue;
                const annualWithdrawal = fv * withdrawalRate;
                const replacementPct = Math.round((annualWithdrawal / salary) * 100);
                const annualContrib = salary * rate;
                const totalContributed = annualContrib * (retirementAge - age);
                const totalPrincipal = totalContributed + alreadyInvested;

                grid[age][rate] = {
                    replacementPct,
                    futureValue: fv,
                    annualContribution: annualContrib,
                    totalContributed,
                    totalPrincipal,
                    alreadyInvested,
                    annualWithdrawal
                };
            }
        }

        return grid;
    }, [salary, alreadyInvested, annualReturn, withdrawalRate, retirementAge]);

    const salaryProgress = ((salary - 20000) / (200000 - 20000)) * 100;
    const returnProgress = ((annualReturn - 0.05) / (0.10 - 0.05)) * 100;
    const withdrawProgress = ((withdrawalRate - 0.025) / (0.05 - 0.025)) * 100;
    const retireProgress = ((retirementAge - 45) / (65 - 45)) * 100;
    const investedProgress = (alreadyInvested / 100000) * 100;

    const handleMouseEnter = useCallback((age, rate) => {
        setHoveredCell({ age, rate });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredCell(null);
    }, []);

    const handleCellClick = useCallback((age, rate) => {
        setSelectedCell((prev) =>
            prev?.age === age && prev?.rate === rate ? null : { age, rate }
        );
    }, []);

    const activeCell = hoveredCell || selectedCell;
    const hoverData = activeCell
        ? tableData[activeCell.age]?.[activeCell.rate]
        : null;

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
            <h3 style={{
                marginBottom: '0.3rem',
                color: 'var(--primary)',
                fontSize: '1.4rem',
                fontWeight: '700',
                letterSpacing: '-0.01em'
            }}>
                How Much Should You Save?
            </h3>
            <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '1.2rem',
                lineHeight: '1.5'
            }}>
                The percentage of your income you can replace in retirement, by age and savings rate.
                Tap or hover any cell to see dollar amounts.
            </p>

            {/* Salary Slider */}
            <div style={{
                marginBottom: '1.2rem',
                padding: '1rem 1.2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <label style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-light)'
                }}>
                    <span>Annual Salary</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                        ${salary.toLocaleString()}
                    </span>
                </label>
                <input
                    type="range"
                    className="landing-slider"
                    min={20000}
                    max={200000}
                    step={5000}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, var(--primary) ${salaryProgress}%, var(--slider-track-empty) ${salaryProgress}%)`
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.3rem'
                }}>
                    <span>$20k</span>
                    <span style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                        US Median: ~$60k
                    </span>
                    <span>$200k</span>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => setShowMoreOptions((prev) => !prev)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.8rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            color: 'var(--text-light)',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        <span>More options</span>
                        <span style={{ color: 'var(--text-muted)' }}>
                            {showMoreOptions ? 'Hide' : 'Show'}
                        </span>
                    </button>
                </div>

                {showMoreOptions && (
                    <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        {/* Amount Already Invested Slider */}
                        <div>
                            <label style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.6rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-light)'
                            }}>
                                <span>Amount Already Invested</span>
                                <span style={{ fontWeight: '700', color: '#38bdf8' }}>
                                    ${alreadyInvested.toLocaleString()}
                                </span>
                            </label>
                            <input
                                type="range"
                                className="landing-slider"
                                min={0}
                                max={100000}
                                step={1000}
                                value={alreadyInvested}
                                onChange={(e) => setAlreadyInvested(Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #38bdf8 ${investedProgress}%, var(--slider-track-empty) ${investedProgress}%)`
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.72rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.3rem'
                            }}>
                                <span>$0</span>
                                <span style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                                    Lump sum invested today
                                </span>
                                <span>$100k</span>
                            </div>
                        </div>

                        {/* Return Rate Slider */}
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.6rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-light)'
                            }}>
                                <span>Annual Return</span>
                                <span style={{ fontWeight: '700', color: 'var(--accent, #f59e0b)' }}>
                                    {(annualReturn * 100).toFixed(1)}%
                                </span>
                            </label>
                            <input
                                type="range"
                                className="landing-slider"
                                min={5}
                                max={10}
                                step={0.5}
                                value={annualReturn * 100}
                                onChange={(e) => setAnnualReturn(Number(e.target.value) / 100)}
                                style={{
                                    background: `linear-gradient(to right, var(--accent, #f59e0b) ${returnProgress}%, var(--slider-track-empty) ${returnProgress}%)`
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.72rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.3rem'
                            }}>
                                <span>5%</span>
                                <span style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                                    Historical avg: ~7-10%
                                </span>
                                <span>10%</span>
                            </div>
                        </div>

                        {/* Withdrawal Rate Slider */}
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.6rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-light)'
                            }}>
                                <span>Withdrawal Rate</span>
                                <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>
                                    {(withdrawalRate * 100).toFixed(1)}%
                                </span>
                            </label>
                            <input
                                type="range"
                                className="landing-slider"
                                min={2.5}
                                max={5}
                                step={0.25}
                                value={withdrawalRate * 100}
                                onChange={(e) => setWithdrawalRate(Number(e.target.value) / 100)}
                                style={{
                                    background: `linear-gradient(to right, var(--secondary) ${withdrawProgress}%, var(--slider-track-empty) ${withdrawProgress}%)`
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.72rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.3rem'
                            }}>
                                <span>2.5%</span>
                                <span style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                                    Traditional rule: 4%
                                </span>
                                <span>5%</span>
                            </div>
                        </div>

                        {/* Retirement Age Slider */}
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.6rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-light)'
                            }}>
                                <span>Retirement Age</span>
                                <span style={{ fontWeight: '700', color: '#a78bfa' }}>
                                    {retirementAge}
                                </span>
                            </label>
                            <input
                                type="range"
                                className="landing-slider"
                                min={45}
                                max={65}
                                step={1}
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(Number(e.target.value))}
                                style={{
                                    background: `linear-gradient(to right, #a78bfa ${retireProgress}%, var(--slider-track-empty) ${retireProgress}%)`
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.72rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.3rem'
                            }}>
                                <span>45</span>
                                <span style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                                    Traditional: 65
                                </span>
                                <span>65</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hover Detail Card */}
            <div style={{
                minHeight: '4.5rem',
                marginBottom: '0.8rem',
                padding: '0.75rem 1rem',
                backgroundColor: hoverData
                    ? `${getColor(hoverData.replacementPct)}18`
                    : 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius)',
                border: `1px solid ${hoverData ? getColor(hoverData.replacementPct) + '55' : 'var(--border)'}`,
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center'
            }}>
                {hoverData ? (
                    <div style={{ width: '100%' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.4rem'
                        }}>
                            <span style={{
                                fontSize: '0.82rem',
                                fontWeight: '600',
                                color: 'var(--text-main)'
                            }}>
                                Age {activeCell.age}, saving {Math.round(activeCell.rate * 100)}% of income
                            </span>
                            <span style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: getColor(hoverData.replacementPct)
                            }}>
                                {hoverData.replacementPct}% replaced
                            </span>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '0.3rem 1rem',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            lineHeight: '1.5'
                        }}>
                            <span>Annual contribution: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.annualContribution)}</strong></span>
                            <span>Starting invested amount: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.alreadyInvested)}</strong></span>
                            <span>Total contributed: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.totalContributed)}</strong></span>
                            <span>Total principal invested: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.totalPrincipal)}</strong></span>
                            <span>Portfolio at {retirementAge}: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.futureValue)}</strong></span>
                            <span>Annual income at {retirementAge}: <strong style={{ color: 'var(--text-main)' }}>{money(hoverData.annualWithdrawal)}</strong></span>
                        </div>
                    </div>
                ) : (
                    <span style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        Tap or hover a cell to see contribution and investment details
                    </span>
                )}
            </div>

            {/* Table */}
            <div style={{
                overflowX: 'auto',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    minWidth: '520px'
                }}>
                    <thead>
                        <tr>
                            <th style={{
                                padding: '0.3rem 0.35rem',
                                backgroundColor: 'var(--bg-hover)',
                                color: 'var(--text-muted)',
                                fontWeight: '500',
                                fontSize: '0.58rem',
                                letterSpacing: '0.02em',
                                borderBottom: '2px solid var(--border)',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                textAlign: 'left',
                                lineHeight: '1.3',
                                width: '2.8rem',
                                maxWidth: '2.8rem'
                            }}>
                                <span style={{ display: 'block', opacity: 0.6 }}>Rate &rarr;</span>
                                <span>&darr; Age</span>
                            </th>
                            {savingsRates.map((rate) => (
                                <th key={rate} style={{
                                    padding: '0.6rem 0.4rem',
                                    backgroundColor: 'var(--bg-hover)',
                                    color: 'var(--text-muted)',
                                    fontWeight: '600',
                                    fontSize: '0.78rem',
                                    borderBottom: '2px solid var(--border)'
                                }}>
                                    {Math.round(rate * 100)}%
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th style={{
                                padding: '0.25rem 0.35rem',
                                backgroundColor: 'var(--bg-hover)',
                                color: 'var(--text-muted)',
                                fontSize: '0.65rem',
                                fontWeight: '400',
                                borderBottom: '1px solid var(--border)',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                width: '2.8rem',
                                maxWidth: '2.8rem'
                            }}>
                            </th>
                            {savingsRates.map((rate) => (
                                <th key={rate} style={{
                                    padding: '0.25rem 0.4rem',
                                    backgroundColor: 'var(--bg-hover)',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.65rem',
                                    fontWeight: '400',
                                    borderBottom: '1px solid var(--border)'
                                }}>
                                    {money(salary * rate)}/yr
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleAges.map((age) => (
                            <tr key={age}>
                                <td style={{
                                    padding: '0.55rem 0.35rem',
                                    fontWeight: '700',
                                    color: 'var(--text-main)',
                                    backgroundColor: 'var(--bg-hover)',
                                    borderBottom: '1px solid var(--border)',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 1,
                                    width: '2.8rem',
                                    maxWidth: '2.8rem',
                                    textAlign: 'center'
                                }}>
                                    {age}
                                </td>
                                {savingsRates.map((rate) => {
                                    const cell = tableData[age]?.[rate];
                                    if (!cell) return <td key={rate} />;
                                    const isHovered = (hoveredCell?.age === age && hoveredCell?.rate === rate)
                                        || (selectedCell?.age === age && selectedCell?.rate === rate);

                                    return (
                                        <td
                                            key={rate}
                                            onMouseEnter={() => handleMouseEnter(age, rate)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleCellClick(age, rate)}
                                            style={{
                                                padding: '0.55rem 0.4rem',
                                                backgroundColor: getColor(cell.replacementPct),
                                                color: getTextColor(cell.replacementPct),
                                                fontWeight: '700',
                                                fontSize: '0.88rem',
                                                borderBottom: '1px solid rgba(255,255,255,0.15)',
                                                cursor: 'pointer',
                                                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                                                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                                                boxShadow: isHovered
                                                    ? '0 0 0 2px var(--bg-card), 0 0 0 4px var(--primary)'
                                                    : 'none',
                                                position: 'relative',
                                                zIndex: isHovered ? 2 : 0
                                            }}
                                        >
                                            {cell.replacementPct}%
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                justifyContent: 'center',
                marginTop: '0.75rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)'
            }}>
                {[
                    { label: '150%+', color: '#22763a' },
                    { label: '100–149%', color: '#3da557' },
                    { label: '66–99%', color: '#7bc67f' },
                    { label: '40–65%', color: '#f2d24e' },
                    { label: '20–39%', color: '#e8816d' },
                    { label: '<20%', color: '#d4503c' }
                ].map((item) => (
                    <div key={item.label} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '2px',
                            backgroundColor: item.color,
                            display: 'inline-block'
                        }} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Assumptions */}
            <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6'
            }}>
                <strong style={{ color: 'var(--text-light)' }}>Assumptions:</strong>
                <ul style={{ margin: '0.3rem 0 0 1rem', padding: 0 }}>
                    <li>{(annualReturn * 100).toFixed(1)}% annual rate of return on investments</li>
                    <li>{(withdrawalRate * 100).toFixed(1)}% safe withdrawal rate in retirement</li>
                    <li>Savings rate based on gross income</li>
                    <li>{money(alreadyInvested)} invested today as a starting lump sum</li>
                    <li>Investments begin at the age listed, retire at {retirementAge}</li>
                </ul>
            </div>

            {/* Attribution */}
            <div style={{
                marginTop: '0.75rem',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius)',
                backgroundColor: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                lineHeight: '1.5'
            }}>
                Inspired by{' '}
                <a
                    href="https://www.moneyguy.com/resources/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'underline' }}
                >
                    The Money Guy Show
                </a>
                {' '}&mdash; check out their full resource library for more great financial tools.
            </div>
        </div>
    );
}
