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

    // Make the upper bound exactly the final invested amount
    const cleanMax = totalStock;

    setMaxY(cleanMax);

    // Generate 4 even ticks so at least 3 labeled points exist between 0 and max
    const step = cleanMax / 3;
    setYTicks([0, step, step * 2, cleanMax]);
  }, [monthlyAmount, stockRate, years]);

  const monthlyProgress = ((monthlyAmount - 50) / (2000 - 50)) * 100;
  const yearsProgress = ((years - 5) / (50 - 5)) * 100;

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      padding: compact ? '1.2rem' : '2rem',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      overflowY: compact ? 'hidden' : 'auto',
      overflowX: 'hidden'
    }}>
      <h3 style={{
        marginBottom: compact ? '1rem' : '1.5rem',
        color: 'var(--primary)',
        fontSize: compact ? '1.2rem' : '1.5rem',
        fontWeight: '700',
        letterSpacing: '-0.01em'
      }}>
        Purchasing Power with Monthly Saving
      </h3>

      {/* Graph Area */}
      <div style={{
        height: compact ? 'clamp(250px, 35vh, 320px)' : 'clamp(350px, 45vh, 480px)',
        marginBottom: compact ? '1.5rem' : '2rem',
        minWidth: 0
      }}>
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
              tick={{ fill: 'var(--text-muted)', fontSize: compact ? 12 : 14 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Years', position: 'insideBottomRight', offset: -10, fill: 'var(--text-muted)', fontSize: compact ? 12 : 14 }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={(value) => {
                if (value >= 1000000) return `$${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
                if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
                return `$${value}`;
              }}
              width={50}
              domain={[0, maxY]}
              ticks={yTicks}
              tick={{ fill: 'var(--text-muted)', fontSize: compact ? 12 : 14 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', color: 'var(--text-main)' }}
              itemStyle={{ fontWeight: '600' }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '500' }}
            />
            <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: compact ? '0.9rem' : '1.05rem' }} />
            <Area type="monotone" dataKey="Cash" stroke="#ef4444" fill="none" strokeWidth={2} name="Cash (Inflation -2%)" />
            <Area type="monotone" dataKey="Savings" stroke="#3b82f6" fill="none" strokeWidth={2} name="High Yield Savings (+1%)" />
            <Area type="monotone" dataKey="Invested" stroke="#10b981" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={3} name={`Invested (+${stockRate}%)`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div style={{
        display: 'grid',
        gap: compact ? '1.5rem' : '2rem',
        padding: compact ? '1.2rem' : '1.8rem',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: 'var(--radius)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: compact ? '0.9rem' : '1rem', color: 'var(--text-light)' }}>
            <span>Monthly Contribution</span>
            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>${monthlyAmount.toLocaleString()} / mo</span>
          </label>
          <input
            type="range"
            className="landing-slider"
            min="50"
            max="2000"
            step="50"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, white ${monthlyProgress}%, rgba(255, 255, 255, 0.1) ${monthlyProgress}%)`
            }}
          />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: compact ? '0.9rem' : '1rem', color: 'var(--text-light)' }}>
            <span>Time Horizon</span>
            <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{years} Years</span>
          </label>
          <input
            type="range"
            className="landing-slider landing-slider-years"
            min="5"
            max="50"
            step="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--secondary) ${yearsProgress}%, rgba(255, 255, 255, 0.1) ${yearsProgress}%)`
            }}
          />
        </div>
      </div>

      <div style={{
        marginTop: compact ? '1rem' : '1.5rem',
        fontSize: compact ? '0.9rem' : '1rem',
        textAlign: 'center',
        lineHeight: '1.6',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Save ${monthlyAmount.toLocaleString()}/mo for {years} years.
          <br />
          <span style={{ fontSize: '0.9em' }}>Total Contributed: <strong>${(monthlyAmount * 12 * years).toLocaleString()}</strong></span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: compact ? '1rem' : '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#ef4444' }}>Cash: <strong style={{ color: 'var(--text-main)', marginLeft: '4px' }}>${data[years]?.Cash?.toLocaleString()}</strong></span>
          <span style={{ color: '#3b82f6' }}>HYSA: <strong style={{ color: 'var(--text-main)', marginLeft: '4px' }}>${data[years]?.Savings?.toLocaleString()}</strong></span>
          <span style={{ color: '#10b981' }}>Invested: <strong style={{ color: 'var(--text-main)', marginLeft: '4px' }}>${data[years]?.Invested?.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
