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

const MONTHLY_MIN = 50;
const MONTHLY_MAX = 2000;
const YEARS_MIN = 5;
const YEARS_MAX = 50;
const COMPOUND_INTEREST_STORAGE_KEY = 'compound-interest-last-graph';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDefaultInputs(compact) {
  return {
    monthlyAmount: compact ? 350 : 100,
    years: 30
  };
}

function getSavedInputs(compact) {
  const fallback = getDefaultInputs(compact);
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(COMPOUND_INTEREST_STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    const monthlyAmount = Number(parsed.monthlyAmount);
    const years = Number(parsed.years);

    if (!Number.isFinite(monthlyAmount) || !Number.isFinite(years)) {
      return fallback;
    }

    return {
      monthlyAmount: clamp(Math.round(monthlyAmount / 50) * 50, MONTHLY_MIN, MONTHLY_MAX),
      years: clamp(Math.round(years / 5) * 5, YEARS_MIN, YEARS_MAX)
    };
  } catch {
    return fallback;
  }
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

function buildYAxis(maxValue, targetTicks = 5) {
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

function formatYAxisTick(value) {
  if (value >= 1000000) {
    const inMillions = value / 1000000;
    return `$${Number.isInteger(inMillions) ? inMillions : inMillions.toFixed(1)}M`;
  }

  if (value >= 1000) {
    const inThousands = value / 1000;
    return `$${Number.isInteger(inThousands) ? inThousands : inThousands.toFixed(1)}k`;
  }

  return `$${value}`;
}

export function CompoundInterestCore({ compact = false }) {
  const [monthlyAmount, setMonthlyAmount] = useState(() => getSavedInputs(compact).monthlyAmount);
  const stockRate = 8;
  const [years, setYears] = useState(() => getSavedInputs(compact).years);
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

    const { maxY: roundedMaxY, ticks } = buildYAxis(totalStock, compact ? 5 : 6);
    setMaxY(roundedMaxY);
    setYTicks(ticks);
  }, [compact, monthlyAmount, stockRate, years]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(COMPOUND_INTEREST_STORAGE_KEY, JSON.stringify({
        monthlyAmount,
        years,
        savedAt: new Date().toISOString()
      }));
    } catch {
      // Ignore storage failures.
    }
  }, [monthlyAmount, years]);

  const monthlyProgress = ((monthlyAmount - MONTHLY_MIN) / (MONTHLY_MAX - MONTHLY_MIN)) * 100;
  const yearsProgress = ((years - YEARS_MIN) / (YEARS_MAX - YEARS_MIN)) * 100;

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
      overflowY: 'auto',
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
        height: compact ? 'clamp(320px, 44vh, 420px)' : 'clamp(390px, 52vh, 560px)',
        marginBottom: compact ? '1.5rem' : '2rem',
        minWidth: 0
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: compact ? 12 : 16, left: compact ? 8 : 14, bottom: 18 }}
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
              label={{ value: 'Years', position: 'insideBottomRight', offset: -4, fill: 'var(--text-muted)', fontSize: compact ? 12 : 14 }}
            />
            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={formatYAxisTick}
              width={compact ? 60 : 66}
              domain={[0, maxY]}
              ticks={yTicks}
              tick={{ fill: 'var(--text-muted)', fontSize: compact ? 12 : 14 }}
              interval={0}
              tickMargin={8}
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
            min={MONTHLY_MIN}
            max={MONTHLY_MAX}
            step="50"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--primary) ${monthlyProgress}%, var(--slider-track-empty) ${monthlyProgress}%)`
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
            min={YEARS_MIN}
            max={YEARS_MAX}
            step="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--secondary) ${yearsProgress}%, var(--slider-track-empty) ${yearsProgress}%)`
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
