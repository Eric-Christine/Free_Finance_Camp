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
  const [monthlyAmount, setMonthlyAmount] = useState(100);
  const [stockRate, setStockRate] = useState(7);
  const [years, setYears] = useState(20);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [];

    // Monthly rates
    const stockMonthlyRate = stockRate / 100 / 12;
    const hysaMonthlyRate = 0.01 / 12;
    const inflationMonthlyRate = -0.02 / 12;

    let totalCash = 0;
    let totalHysa = 0;
    let totalStock = 0;

    newData.push({
      year: 0,
      Cash: 0,
      Savings: 0,
      Invested: 0
    });

    for (let y = 1; y <= years; y++) {
      // Calculate month by month for accuracy
      for (let m = 1; m <= 12; m++) {
        totalCash = (totalCash + monthlyAmount) * (1 + inflationMonthlyRate);
        totalHysa = (totalHysa + monthlyAmount) * (1 + hysaMonthlyRate);
        totalStock = (totalStock + monthlyAmount) * (1 + stockMonthlyRate);
      }

      newData.push({
        year: y,
        Cash: Math.round(totalCash),
        Savings: Math.round(totalHysa),
        Invested: Math.round(totalStock)
      });
    }
    setData(newData);
  }, [monthlyAmount, stockRate, years]);

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
      <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Purchasing Power with Monthly Saving</h3>

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
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={60}
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
      <div style={{ display: 'grid', gap: '1.25rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Monthly Contribution</span>
            <span style={{ fontWeight: 'bold' }}>${monthlyAmount.toLocaleString()} / mo</span>
          </label>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--text-main)' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Stock Return Rate</span>
            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{stockRate}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="12"
            step="0.5"
            value={stockRate}
            onChange={(e) => setStockRate(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
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

      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
        Save ${monthlyAmount}/mo for {years} years. <br />
        Cash loses ~2% purchasing power/year. <br />
        Total Invested Value: <strong>${data[years]?.Invested?.toLocaleString()}</strong>
      </div>
    </div>
  );
}
