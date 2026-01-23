import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(1000);
  const [stockRate, setStockRate] = useState(7);
  const [years, setYears] = useState(20);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i <= years; i++) {
      // Cash: Loses 2% value per year (Inflation) => Val = P * (0.98)^i
      const cashVal = principal * Math.pow(0.98, i);

      // High Yield Savings: Gains 1% real value => Val = P * (1.01)^i
      const hysaVal = principal * Math.pow(1.01, i);

      // Stock Market: Gains user-defined % value => Val = P * (1 + r/100)^i
      const stockVal = principal * Math.pow(1 + stockRate / 100, i);

      newData.push({
        year: i,
        Cash: Math.round(cashVal),
        Savings: Math.round(hysaVal),
        Invested: Math.round(stockVal)
      });
    }
    setData(newData);
  }, [principal, stockRate, years]);

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
      <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Purchasing Power Over Time</h3>

      {/* Graph Area */}
      <div style={{ flex: 1, minHeight: '300px', marginBottom: '1.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="year"
              stroke="var(--text-muted)"
              label={{ value: 'Years', position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)' }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              width={80} // Give space for dollar values
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Legend verticalAlign="top" />
            <Line type="monotone" dataKey="Cash" stroke="#ef4444" strokeWidth={2} dot={false} name="Cash (Inflation -2%)" />
            <Line type="monotone" dataKey="Savings" stroke="#3b82f6" strokeWidth={2} dot={false} name="High Yield (+1%)" />
            <Line type="monotone" dataKey="Invested" stroke="#10b981" strokeWidth={3} dot={false} name={`Invested (+${stockRate}%)`} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gap: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Initial Amount</span>
            <span style={{ fontWeight: 'bold' }}>${principal.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--text-main)' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Stock Return Rate</span>
            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{stockRate}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="8" // Max 8% as requested
            step="0.5"
            value={stockRate}
            onChange={(e) => setStockRate(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Time Horizon</span>
            <span style={{ fontWeight: 'bold' }}>{years} Years</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--secondary)' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        * Cash loses ~2% purchasing power/year due to inflation. <br />
        * High Yield Savings keeps up with inflation +1%. <br />
        * Investing grows your wealth exponentially.
      </div>
    </div>
  );
}
