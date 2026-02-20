import { useMemo, useState } from 'react';
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

export default function EmployerMatchCalculator() {
  const [salary, setSalary] = useState(70000);
  const [employeeRate, setEmployeeRate] = useState(6);
  const [matchRate, setMatchRate] = useState(50);
  const [matchCap, setMatchCap] = useState(6);
  const [returnRate, setReturnRate] = useState(7);
  const [years, setYears] = useState(30);
  const { data, summary } = useMemo(() => {
    const monthlyReturn = returnRate / 100 / 12;
    const salaryMonthly = salary / 12;
    const employeeMonthly = salaryMonthly * (employeeRate / 100);
    const matchedRate = Math.min(employeeRate, matchCap);
    const employerMonthly = salaryMonthly * (matchedRate / 100) * (matchRate / 100);
    const annualEmployee = employeeMonthly * 12;
    const annualEmployer = employerMonthly * 12;

    const graph = [{ year: 0, EmployeeOnly: 0, WithMatch: 0 }];
    let employeeOnlyValue = 0;
    let withMatchValue = 0;

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        employeeOnlyValue = (employeeOnlyValue + employeeMonthly) * (1 + monthlyReturn);
        withMatchValue = (withMatchValue + employeeMonthly + employerMonthly) * (1 + monthlyReturn);
      }

      graph.push({
        year: y,
        EmployeeOnly: Math.round(employeeOnlyValue),
        WithMatch: Math.round(withMatchValue)
      });
    }

    return {
      data: graph,
      summary: {
        annualEmployee: Math.round(annualEmployee),
        annualEmployer: Math.round(annualEmployer),
        finalEmployeeOnly: Math.round(employeeOnlyValue),
        finalWithMatch: Math.round(withMatchValue)
      }
    };
  }, [salary, employeeRate, matchRate, matchCap, returnRate, years]);

  const missedMatch = useMemo(() => {
    const shortfallRate = Math.max(matchCap - employeeRate, 0);
    return Math.round((salary * shortfallRate / 100) * (matchRate / 100));
  }, [employeeRate, matchCap, salary, matchRate]);

  const advantage = summary.finalWithMatch - summary.finalEmployeeOnly;

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
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>401(k) Employer Match Simulator</h3>
      <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        See how much wealth is created by contributing enough to capture your full employer match.
      </p>

      <div style={{ height: 'clamp(220px, 32vh, 320px)', marginBottom: '1rem', minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="var(--text-muted)" />
            <YAxis
              stroke="var(--text-muted)"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={60}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)' }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
            />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="EmployeeOnly"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              name="No Employer Match"
            />
            <Line
              type="monotone"
              dataKey="WithMatch"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              name="With Employer Match"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Salary</span>
            <span style={{ fontWeight: 'bold' }}>${salary.toLocaleString()}</span>
          </label>
          <input type="range" min="30000" max="250000" step="5000" value={salary} onChange={(e) => setSalary(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Your 401(k) Contribution Rate</span>
            <span style={{ fontWeight: 'bold' }}>{employeeRate}%</span>
          </label>
          <input type="range" min="1" max="20" step="1" value={employeeRate} onChange={(e) => setEmployeeRate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Employer Match</span>
            <span style={{ fontWeight: 'bold' }}>{matchRate}%</span>
          </label>
          <input type="range" min="25" max="100" step="5" value={matchRate} onChange={(e) => setMatchRate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Matched Up To</span>
            <span style={{ fontWeight: 'bold' }}>{matchCap}% of salary</span>
          </label>
          <input type="range" min="3" max="10" step="1" value={matchCap} onChange={(e) => setMatchCap(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Annual Return</span>
            <span style={{ fontWeight: 'bold' }}>{returnRate}%</span>
          </label>
          <input type="range" min="3" max="12" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span>Time Horizon</span>
            <span style={{ fontWeight: 'bold' }}>{years} years</span>
          </label>
          <input type="range" min="5" max="40" step="5" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
        <div>You contribute: <strong>${summary.annualEmployee.toLocaleString()}/yr</strong></div>
        <div>Employer contributes: <strong>${summary.annualEmployer.toLocaleString()}/yr</strong></div>
        <div>Ending advantage from match: <strong style={{ color: '#22c55e' }}>${advantage.toLocaleString()}</strong></div>
        {missedMatch > 0 ? (
          <div style={{ color: '#f59e0b' }}>You are leaving about <strong>${missedMatch.toLocaleString()}/yr</strong> of match on the table.</div>
        ) : (
          <div style={{ color: '#22c55e' }}>You are contributing enough to capture the full match.</div>
        )}
      </div>
    </div>
  );
}
