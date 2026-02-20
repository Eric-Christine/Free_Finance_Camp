import { useMemo } from 'react';
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

const EXPORT_SHARE_DATA = [
    { year: 2000, china: 20.9, us: 10.2 },
    { year: 2003, china: 29.4, us: 9.6 },
    { year: 2006, china: 34.7, us: 10.8 },
    { year: 2009, china: 26.0, us: 10.2 },
    { year: 2012, china: 25.4, us: 13.6 },
    { year: 2015, china: 22.4, us: 12.4 },
    { year: 2018, china: 19.0, us: 12.3 },
    { year: 2020, china: 18.6, us: 10.7 },
    { year: 2022, china: 20.6, us: 14.3 },
    { year: 2024, china: 19.6, us: 11.0 }
];

// Illustrative household saving-rate comparison to show behavior gap.
const SAVINGS_RATE_DATA = [
    { year: 2000, china: 37.0, us: 4.5 },
    { year: 2003, china: 39.0, us: 4.5 },
    { year: 2006, china: 42.0, us: 3.0 },
    { year: 2009, china: 44.0, us: 6.0 },
    { year: 2012, china: 45.0, us: 7.0 },
    { year: 2015, china: 44.0, us: 5.5 },
    { year: 2018, china: 44.0, us: 6.5 },
    { year: 2020, china: 43.0, us: 13.5 },
    { year: 2022, china: 42.0, us: 4.5 },
    { year: 2024, china: 41.0, us: 4.7 }
];

function average(values) {
    return values.reduce((acc, v) => acc + v, 0) / values.length;
}

export default function ChinaEconomicRiseChart() {
    const metrics = useMemo(() => {
        const latestExport = EXPORT_SHARE_DATA[EXPORT_SHARE_DATA.length - 1];
        const peakExport = Math.max(...EXPORT_SHARE_DATA.map((d) => d.china));
        const avgChinaSavings = average(SAVINGS_RATE_DATA.map((d) => d.china));
        const avgUsSavings = average(SAVINGS_RATE_DATA.map((d) => d.us));

        return {
            latestChinaExport: latestExport.china,
            latestUsExport: latestExport.us,
            peakChinaExport: peakExport,
            avgChinaSavings,
            avgUsSavings
        };
    }, []);

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
            <h3 style={{ marginBottom: '0.45rem', color: 'var(--primary)' }}>China's Export-First Rise</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Compare exports and household savings behavior between China and U.S. consumers.
            </p>

            <div style={{ height: 'clamp(220px, 30vh, 250px)', marginBottom: '0.9rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EXPORT_SHARE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                        <YAxis stroke="var(--text-muted)" width={50} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                            formatter={(value) => [`${value}%`, '']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="china" stroke="#ef4444" strokeWidth={2.5} dot={false} name="China Exports (% GDP)" />
                        <Line type="monotone" dataKey="us" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="U.S. Exports (% GDP)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ height: 'clamp(200px, 28vh, 220px)', marginBottom: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SAVINGS_RATE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                        <YAxis stroke="var(--text-muted)" width={50} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                            formatter={(value) => [`${value}%`, '']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="china" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="China Household Savings Rate" />
                        <Line type="monotone" dataKey="us" stroke="#10b981" strokeWidth={2.5} dot={false} name="U.S. Personal Savings Rate" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.55rem',
                marginBottom: '0.9rem'
            }}>
                <MetricCard label="China Export Peak" value={`${metrics.peakChinaExport.toFixed(1)}%`} color="#ef4444" />
                <MetricCard label="Avg China Savings" value={`${metrics.avgChinaSavings.toFixed(1)}%`} color="#f59e0b" />
                <MetricCard label="Avg U.S. Savings" value={`${metrics.avgUsSavings.toFixed(1)}%`} color="#10b981" />
            </div>

            <div style={{
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.78rem',
                lineHeight: '1.45',
                backgroundColor: 'rgba(255,255,255,0.02)'
            }}>
                Export-first growth often pairs high investment and high savings with manufacturing scale. Consumer-first economies
                like the U.S. typically rely more on domestic spending and lower household savings.
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.8rem', lineHeight: '1.4' }}>
                Values are rounded and for teaching comparison.
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
            <div style={{ fontSize: '1.02rem', fontWeight: '700', color }}>{value}</div>
        </div>
    );
}
