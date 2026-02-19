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

const MARKET_DATA = [
    { year: 2000, sp500: 1320.28, gold: 272.65 },
    { year: 2001, sp500: 1148.08, gold: 276.5 },
    { year: 2002, sp500: 879.82, gold: 347.2 },
    { year: 2003, sp500: 1111.92, gold: 416.1 },
    { year: 2004, sp500: 1211.92, gold: 438.0 },
    { year: 2005, sp500: 1248.29, gold: 513.0 },
    { year: 2006, sp500: 1418.3, gold: 635.7 },
    { year: 2007, sp500: 1468.36, gold: 833.8 },
    { year: 2008, sp500: 903.25, gold: 869.8 },
    { year: 2009, sp500: 1115.1, gold: 1087.5 },
    { year: 2010, sp500: 1257.64, gold: 1421.6 },
    { year: 2011, sp500: 1257.6, gold: 1566.8 },
    { year: 2012, sp500: 1426.19, gold: 1664.0 },
    { year: 2013, sp500: 1848.36, gold: 1201.5 },
    { year: 2014, sp500: 2058.9, gold: 1184.3 },
    { year: 2015, sp500: 2043.94, gold: 1060.2 },
    { year: 2016, sp500: 2238.83, gold: 1151.7 },
    { year: 2017, sp500: 2673.61, gold: 1296.5 },
    { year: 2018, sp500: 2506.85, gold: 1281.7 },
    { year: 2019, sp500: 3230.78, gold: 1517.3 },
    { year: 2020, sp500: 3756.07, gold: 1895.1 },
    { year: 2021, sp500: 4766.18, gold: 1828.6 },
    { year: 2022, sp500: 3839.5, gold: 1824.0 },
    { year: 2023, sp500: 4769.83, gold: 2062.4 },
    { year: 2024, sp500: 5881.63, gold: 2624.5 }
];

// Annual inflation rates for 2001-2024. Used to show dollar purchasing-power decline.
const INFLATION_GROWTH = [
    2.8, 1.6, 2.3, 2.7, 3.4, 3.2, 2.8, 3.8, -0.4, 1.6, 3.2, 2.1,
    1.5, 1.6, 0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 3.4
];

function buildSeries() {
    const baseSp = MARKET_DATA[0].sp500;
    const baseSpGold = MARKET_DATA[0].sp500 / MARKET_DATA[0].gold;

    let inflationIndex = 100;

    return MARKET_DATA.map((row, idx) => {
        if (idx > 0) {
            inflationIndex *= (1 + INFLATION_GROWTH[idx - 1] / 100);
        }

        const spGold = row.sp500 / row.gold;
        const dollarPower = (100 / inflationIndex) * 100;

        return {
            year: row.year,
            sp500UsdIndex: Number(((row.sp500 / baseSp) * 100).toFixed(1)),
            sp500GoldIndex: Number(((spGold / baseSpGold) * 100).toFixed(1)),
            dollarPowerIndex: Number(dollarPower.toFixed(1)),
            sp500UsdRaw: row.sp500,
            sp500GoldRaw: spGold
        };
    });
}

function money(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

export default function Sp500DollarVsGoldChart() {
    const data = useMemo(() => buildSeries(), []);
    const latest = data[data.length - 1];

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
            <h3 style={{ marginBottom: '0.4rem', color: 'var(--primary)' }}>S&P 500: Dollars vs Gold</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Indexed to 100 in 2000 to compare S&P performance in dollar terms, gold terms, and dollar purchasing power.
            </p>

            <div style={{ height: '320px', marginBottom: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                        <YAxis stroke="var(--text-muted)" width={54} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
                            formatter={(value, name) => [`${value}`, name]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="sp500UsdIndex" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="S&P in USD (Index)" />
                        <Line type="monotone" dataKey="sp500GoldIndex" stroke="#f59e0b" strokeWidth={2.5} dot={false} name="S&P in Gold (Index)" />
                        <Line type="monotone" dataKey="dollarPowerIndex" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 4" dot={false} name="Dollar Purchasing Power (Index)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.6rem',
                marginBottom: '1rem'
            }}>
                <MetricCard
                    label={`S&P (${latest.year})`}
                    value={money(latest.sp500UsdRaw)}
                    color="#3b82f6"
                />
                <MetricCard
                    label={`S&P in Gold (${latest.year})`}
                    value={`${latest.sp500GoldRaw.toFixed(2)} oz`}
                    color="#f59e0b"
                />
                <MetricCard
                    label="Dollar Power vs 2000"
                    value={`${latest.dollarPowerIndex}%`}
                    color="#ef4444"
                />
            </div>

            <div style={{
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.02)',
                fontSize: '0.78rem',
                lineHeight: '1.45'
            }}>
                <strong>How to read this:</strong> A rising "S&P in USD" line can still coincide with weaker dollar purchasing power.
                The "S&P in Gold" view helps show asset performance in a hard-asset denominator, not just nominal dollars.
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.8rem', lineHeight: '1.4' }}>
                Teaching dataset uses annual values for 2000-2024 with rounded figures.
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
