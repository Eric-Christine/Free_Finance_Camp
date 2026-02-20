import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CompoundInterest() {
  return <CompoundInterestCore compact={false} />;
}

export function CompoundInterestCore({ compact = false }) {
  const [monthlyAmount, setMonthlyAmount] = useState(100);
  const stockRate = 8;
  const [years, setYears] = useState(30);
  const [data, setData] = useState([]);
  const [maxY, setMaxY] = useState(1000000);
  const [yTicks, setYTicks] = useState([0, 250000, 500000, 750000, 1000000]);

  useEffect(() => {
    const newData = [];

    // Calculate absolute max possible y-value for current years/amount so Y-scale doesn't jump
    // when dragging the return rate slider. (Max slider value is 12%)
    const maxStockMonthlyRate = 12 / 100 / 12;
    let maxPossibleStock = 0;

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
        maxPossibleStock = (maxPossibleStock + monthlyAmount) * (1 + maxStockMonthlyRate);
      }

      newData.push({
        year: y,
        Cash: Math.round(totalCash),
        Savings: Math.round(totalHysa),
        Invested: Math.round(totalStock)
      });
    }
    setData(newData);

    // Round the max possible stock up to a nice clean boundary
    const rawMax = maxPossibleStock;
    let cleanMax = 100000;
    if (rawMax > 10000000) cleanMax = Math.ceil(rawMax / 5000000) * 5000000;
    else if (rawMax > 5000000) cleanMax = Math.ceil(rawMax / 1000000) * 1000000;
    else if (rawMax > 2000000) cleanMax = Math.ceil(rawMax / 500000) * 500000;
    else if (rawMax > 1000000) cleanMax = Math.ceil(rawMax / 250000) * 250000;
    else if (rawMax > 500000) cleanMax = Math.ceil(rawMax / 100000) * 100000;
    else if (rawMax > 100000) cleanMax = Math.ceil(rawMax / 50000) * 50000;
    else cleanMax = Math.ceil(rawMax / 25000) * 25000;

    setMaxY(cleanMax);

    // Generate 5 even ticks
    const step = cleanMax / 4;
    setYTicks([0, step, step * 2, step * 3, cleanMax]);
  }, [monthlyAmount, stockRate, years]);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      padding: compact ? '1rem' : '1.5rem',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      overflowY: compact ? 'hidden' : 'auto',
      overflowX: 'hidden'
    }}>
      <h3 style={{ marginBottom: compact ? '0.7rem' : '1rem', color: 'var(--primary)' }}>Purchasing Power with Monthly Saving</h3>

      {/* Graph Area */}
      <div style={{ height: compact ? 'clamp(150px, 23vh, 220px)' : 'clamp(220px, 34vh, 320px)', marginBottom: compact ? '0.9rem' : '1.5rem', minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Years', position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)' }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={(value) => {
                if (value >= 1000000) return `$${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
                if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
                return `$${value}`;
              }}
              width={60}
              domain={[0, maxY]}
              ticks={yTicks}
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', color: 'var(--text-main)' }}
              itemStyle={{ fontWeight: '600' }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '500' }}
            />
            <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '15px' }} />
            <Area type="monotone" dataKey="Cash" stroke="#ef4444" fill="none" strokeWidth={2} name="Cash (Inflation -2%)" />
            <Area type="monotone" dataKey="Savings" stroke="#3b82f6" fill="none" strokeWidth={2} name="High Yield (+1%)" />
            <Area type="monotone" dataKey="Invested" stroke="#10b981" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={3} name={`Invested (+${stockRate}%)`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gap: compact ? '0.8rem' : '1.25rem', padding: compact ? '0.8rem' : '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: compact ? '0.8rem' : '0.85rem' }}>
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
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: compact ? '0.8rem' : '0.85rem' }}>
            <span>Time Horizon</span>
            <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{years} Years</span>
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

      <div style={{ marginTop: compact ? '0.55rem' : '0.75rem', fontSize: compact ? '0.75rem' : '0.85rem', color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Save ${monthlyAmount.toLocaleString()}/mo for {years} years:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: compact ? '0.8rem' : '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#ef4444' }}>Cash: <strong style={{ color: 'var(--text-main)' }}>${data[years]?.Cash?.toLocaleString()}</strong></span>
          <span style={{ color: '#3b82f6' }}>HYSA: <strong style={{ color: 'var(--text-main)' }}>${data[years]?.Savings?.toLocaleString()}</strong></span>
          <span style={{ color: '#10b981' }}>Invested: <strong style={{ color: 'var(--text-main)' }}>${data[years]?.Invested?.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
