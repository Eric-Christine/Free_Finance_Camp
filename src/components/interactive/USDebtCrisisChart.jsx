import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const US_DEBT_TREND = [
    { year: 2000, debtToGdp: 54.3 },
    { year: 2001, debtToGdp: 55.8 },
    { year: 2002, debtToGdp: 57.9 },
    { year: 2003, debtToGdp: 59.4 },
    { year: 2004, debtToGdp: 60.6 },
    { year: 2005, debtToGdp: 61.3 },
    { year: 2006, debtToGdp: 61.8 },
    { year: 2007, debtToGdp: 62.7 },
    { year: 2008, debtToGdp: 73.2 },
    { year: 2009, debtToGdp: 84.0 },
    { year: 2010, debtToGdp: 91.6 },
    { year: 2011, debtToGdp: 96.1 },
    { year: 2012, debtToGdp: 100.1 },
    { year: 2013, debtToGdp: 99.8 },
    { year: 2014, debtToGdp: 101.3 },
    { year: 2015, debtToGdp: 102.6 },
    { year: 2016, debtToGdp: 104.6 },
    { year: 2017, debtToGdp: 102.3 },
    { year: 2018, debtToGdp: 105.0 },
    { year: 2019, debtToGdp: 105.8 },
    { year: 2020, debtToGdp: 125.6 },
    { year: 2021, debtToGdp: 119.4 },
    { year: 2022, debtToGdp: 117.4 },
    { year: 2023, debtToGdp: 119.6 },
    { year: 2024, debtToGdp: 121.4 },
    { year: 2025, debtToGdp: 121.0 }
];

const COUNTRY_COMPARISON_2022 = [
    { country: 'Japan', debtToGdp: 215.9 },
    { country: 'UK', debtToGdp: 138.2 },
    { country: 'US', debtToGdp: 114.8 },
    { country: 'France', debtToGdp: 96.8 }
];

const ADMIN_AVG_DEFICITS = [
    { administration: 'Bush (2001-08)', deficitPctGdp: -1.9 },
    { administration: 'Obama (2009-16)', deficitPctGdp: -5.7 },
    { administration: 'Trump (2017-20)', deficitPctGdp: -6.6 },
    { administration: 'Biden (2021-24)', deficitPctGdp: -7.3 }
];

export default function USDebtCrisisChart() {
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
            <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)' }}>US Debt Crisis Dashboard</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Debt has risen for decades, and fiscal deficits have occurred under both Republican and Democratic administrations.
            </p>

            <div style={{ height: 'clamp(220px, 30vh, 250px)', marginBottom: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={US_DEBT_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                        <YAxis stroke="var(--text-muted)" width={52} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                            formatter={(value) => [`${value}%`, 'Debt / GDP']}
                        />
                        <Line
                            type="monotone"
                            dataKey="debtToGdp"
                            stroke="#ef4444"
                            strokeWidth={2.5}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.9rem',
                marginBottom: '1rem'
            }}>
                <div style={{ height: '220px', minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Debt / GDP Comparison (2022)
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={COUNTRY_COMPARISON_2022} margin={{ top: 6, right: 0, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="country" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                            <YAxis stroke="var(--text-muted)" width={44} tickFormatter={(v) => `${v}%`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                                formatter={(value) => [`${value}%`, 'Debt / GDP']}
                            />
                            <Bar dataKey="debtToGdp" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ height: '220px', minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Avg Fiscal Deficit by Administration (% GDP)
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ADMIN_AVG_DEFICITS} margin={{ top: 6, right: 0, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="administration" stroke="var(--text-muted)" tick={{ fontSize: 9 }} interval={0} angle={-18} textAnchor="end" height={54} />
                            <YAxis stroke="var(--text-muted)" width={44} tickFormatter={(v) => `${v}%`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                                formatter={(value) => [`${value}%`, 'Avg Deficit']}
                            />
                            <Bar dataKey="deficitPctGdp" fill="#f97316" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '0.55rem' }}>
                <ScenarioCard
                    title="Scenario 1: Grow Faster Than Debt"
                    body="If nominal GDP grows faster than debt, the debt burden can stabilize or decline relative to the economy."
                />
                <ScenarioCard
                    title="Scenario 2: Lower Interest Rates"
                    body="If rates fall, federal interest costs consume less tax revenue, easing near-term pressure."
                />
                <ScenarioCard
                    title="Scenario 3: Default"
                    body="A default is the most severe path. It would likely trigger market stress, higher borrowing costs, and broad economic damage."
                />
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.9rem', lineHeight: '1.4' }}>
                Sources used for this teaching view include FRED series based on World Bank central government debt and U.S. fiscal balance/debt metrics.
                Values are rounded.
            </p>
        </div>
    );
}

function ScenarioCard({ title, body }) {
    return (
        <div style={{
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '0.65rem',
            backgroundColor: 'rgba(255,255,255,0.02)'
        }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.2rem' }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{body}</div>
        </div>
    );
}
