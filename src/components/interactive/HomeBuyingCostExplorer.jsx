import { useMemo, useState } from 'react';

const MARKET_PRESETS = {
    northeast_suburb: {
        name: 'Northeast Suburb (High Tax)',
        homePrice: 520000,
        taxRate: 2.0,
        insuranceAnnual: 2800,
        hoaCondo: 650,
        hoaTownhouse: 360,
        interestRate: 6.5,
        downPaymentPct: 20
    },
    sunbelt_suburb: {
        name: 'Sunbelt Suburb (Lower Tax, Higher Insurance)',
        homePrice: 410000,
        taxRate: 1.1,
        insuranceAnnual: 4200,
        hoaCondo: 540,
        hoaTownhouse: 280,
        interestRate: 6.5,
        downPaymentPct: 20
    },
    midwest_city: {
        name: 'Midwest City (Lower Prices)',
        homePrice: 300000,
        taxRate: 1.6,
        insuranceAnnual: 1800,
        hoaCondo: 380,
        hoaTownhouse: 220,
        interestRate: 6.5,
        downPaymentPct: 20
    },
    coastal_condo: {
        name: 'Coastal Condo Market (High HOA/Insurance)',
        homePrice: 420000,
        taxRate: 0.9,
        insuranceAnnual: 9600,
        hoaCondo: 900,
        hoaTownhouse: 460,
        interestRate: 6.5,
        downPaymentPct: 25
    }
};

const PROPERTY_TYPES = {
    condo: {
        label: 'Condo',
        repairsRate: 0.5,
        insuranceFactor: 1.0
    },
    townhouse: {
        label: 'Townhouse',
        repairsRate: 0.9,
        insuranceFactor: 1.08
    }
};

function calculateMonthlyPayment(loanAmount, annualRate, termYears) {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = termYears * 12;

    if (monthlyRate === 0) return loanAmount / totalMonths;

    return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

function getPreset(marketKey, propertyType) {
    const market = MARKET_PRESETS[marketKey];
    const type = PROPERTY_TYPES[propertyType];
    const repairsAnnual = Math.round((market.homePrice * type.repairsRate) / 100);
    const insuranceAnnual = Math.round(market.insuranceAnnual * type.insuranceFactor);
    const hoaMonthly = propertyType === 'condo' ? market.hoaCondo : market.hoaTownhouse;

    return {
        homePrice: market.homePrice,
        downPaymentPct: market.downPaymentPct,
        interestRate: market.interestRate,
        termYears: 30,
        taxRate: market.taxRate,
        insuranceAnnual,
        repairsAnnual,
        hoaMonthly
    };
}

function calculateHousingCosts(inputs) {
    const downPayment = inputs.homePrice * (inputs.downPaymentPct / 100);
    const loanAmount = Math.max(0, inputs.homePrice - downPayment);
    const principalInterest = calculateMonthlyPayment(loanAmount, inputs.interestRate, inputs.termYears);
    const propertyTax = (inputs.homePrice * (inputs.taxRate / 100)) / 12;
    const insurance = inputs.insuranceAnnual / 12;
    const repairs = inputs.repairsAnnual / 12;
    const hoa = inputs.hoaMonthly;

    return {
        principalInterest,
        propertyTax,
        insurance,
        repairs,
        hoa,
        total: principalInterest + propertyTax + insurance + repairs + hoa
    };
}

function money(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

export default function HomeBuyingCostExplorer() {
    const defaultMarketKey = 'coastal_condo';
    const defaultPropertyType = 'condo';
    const defaultPreset = getPreset(defaultMarketKey, defaultPropertyType);

    const [marketKey, setMarketKey] = useState(defaultMarketKey);
    const [propertyType, setPropertyType] = useState(defaultPropertyType);
    const [homePrice, setHomePrice] = useState(defaultPreset.homePrice);
    const [downPaymentPct, setDownPaymentPct] = useState(defaultPreset.downPaymentPct);
    const [interestRate, setInterestRate] = useState(defaultPreset.interestRate);
    const [termYears] = useState(defaultPreset.termYears);
    const [taxRate, setTaxRate] = useState(defaultPreset.taxRate);
    const [insuranceAnnual, setInsuranceAnnual] = useState(defaultPreset.insuranceAnnual);
    const [repairsAnnual, setRepairsAnnual] = useState(defaultPreset.repairsAnnual);
    const [hoaMonthly, setHoaMonthly] = useState(defaultPreset.hoaMonthly);

    const applyPreset = (nextMarketKey, nextPropertyType) => {
        const preset = getPreset(nextMarketKey, nextPropertyType);
        setHomePrice(preset.homePrice);
        setDownPaymentPct(preset.downPaymentPct);
        setInterestRate(preset.interestRate);
        setTaxRate(preset.taxRate);
        setInsuranceAnnual(preset.insuranceAnnual);
        setRepairsAnnual(preset.repairsAnnual);
        setHoaMonthly(preset.hoaMonthly);
    };

    const costs = useMemo(() => {
        return calculateHousingCosts({
            homePrice,
            downPaymentPct,
            interestRate,
            termYears,
            taxRate,
            insuranceAnnual,
            repairsAnnual,
            hoaMonthly
        });
    }, [homePrice, downPaymentPct, interestRate, termYears, taxRate, insuranceAnnual, repairsAnnual, hoaMonthly]);

    const nonMortgageCosts = costs.propertyTax + costs.insurance + costs.repairs + costs.hoa;
    const outpacesMortgage = nonMortgageCosts > costs.principalInterest;
    const gap = Math.abs(nonMortgageCosts - costs.principalInterest);

    const breakdown = [
        { label: 'Principal + Interest', value: costs.principalInterest, color: 'var(--primary)' },
        { label: 'Property Tax', value: costs.propertyTax, color: '#f59e0b' },
        { label: 'Insurance', value: costs.insurance, color: '#ef4444' },
        { label: 'Repairs', value: costs.repairs, color: '#3b82f6' },
        { label: 'HOA', value: costs.hoa, color: '#8b5cf6' }
    ];

    const marketComparison = useMemo(() => {
        return Object.entries(MARKET_PRESETS).map(([key, market]) => {
            const preset = getPreset(key, propertyType);
            const marketCosts = calculateHousingCosts({
                ...preset,
                downPaymentPct,
                interestRate
            });
            const extras = marketCosts.propertyTax + marketCosts.insurance + marketCosts.repairs + marketCosts.hoa;
            const extrasShare = marketCosts.total > 0 ? (extras / marketCosts.total) * 100 : 0;
            return {
                name: market.name,
                principalInterest: marketCosts.principalInterest,
                extras,
                extrasShare
            };
        });
    }, [propertyType, downPaymentPct, interestRate]);

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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Home Cost Reality Check</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Compare mortgage principal+interest vs taxes, insurance, repairs, and HOA in different U.S. market examples.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                        Market preset
                    </label>
                    <select
                        value={marketKey}
                        onChange={(e) => {
                            const next = e.target.value;
                            setMarketKey(next);
                            applyPreset(next, propertyType);
                        }}
                        style={{
                            width: '100%',
                            padding: '0.55rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-main)',
                            color: 'var(--text-main)'
                        }}
                    >
                        {Object.entries(MARKET_PRESETS).map(([key, market]) => (
                            <option key={key} value={key}>{market.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                        Property type
                    </label>
                    <select
                        value={propertyType}
                        onChange={(e) => {
                            const next = e.target.value;
                            setPropertyType(next);
                            applyPreset(marketKey, next);
                        }}
                        style={{
                            width: '100%',
                            padding: '0.55rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-main)',
                            color: 'var(--text-main)'
                        }}
                    >
                        {Object.entries(PROPERTY_TYPES).map(([key, type]) => (
                            <option key={key} value={key}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className="btn btn-outline" onClick={() => applyPreset(marketKey, propertyType)} style={{ marginBottom: '1rem' }}>
                Reset Inputs to Preset
            </button>

            <div style={{ display: 'grid', gap: '0.9rem', marginBottom: '1rem' }}>
                <Slider
                    label="Home price"
                    value={homePrice}
                    min={150000}
                    max={1200000}
                    step={10000}
                    display={money(homePrice)}
                    onChange={setHomePrice}
                />
                <Slider
                    label="Down payment"
                    value={downPaymentPct}
                    min={3}
                    max={50}
                    step={1}
                    display={`${downPaymentPct}%`}
                    onChange={setDownPaymentPct}
                />
                <Slider
                    label="Mortgage rate"
                    value={interestRate}
                    min={3}
                    max={9}
                    step={0.1}
                    display={`${interestRate.toFixed(1)}%`}
                    onChange={setInterestRate}
                />
                <Slider
                    label="Property tax rate"
                    value={taxRate}
                    min={0.2}
                    max={3}
                    step={0.05}
                    display={`${taxRate.toFixed(2)}%`}
                    onChange={setTaxRate}
                />
                <Slider
                    label="Annual insurance"
                    value={insuranceAnnual}
                    min={600}
                    max={12000}
                    step={100}
                    display={money(insuranceAnnual)}
                    onChange={setInsuranceAnnual}
                />
                <Slider
                    label="Annual repairs"
                    value={repairsAnnual}
                    min={1000}
                    max={18000}
                    step={250}
                    display={money(repairsAnnual)}
                    onChange={setRepairsAnnual}
                />
                <Slider
                    label="HOA monthly"
                    value={hoaMonthly}
                    min={0}
                    max={1200}
                    step={25}
                    display={money(hoaMonthly)}
                    onChange={setHoaMonthly}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <CostCard
                    label="Mortgage (P+I)"
                    amount={costs.principalInterest}
                    accent="var(--primary)"
                />
                <CostCard
                    label="Taxes + Insurance + Repairs + HOA"
                    amount={nonMortgageCosts}
                    accent={outpacesMortgage ? '#ef4444' : 'var(--secondary)'}
                />
            </div>

            <div style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius)',
                marginBottom: '1rem',
                backgroundColor: outpacesMortgage ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                border: `1px solid ${outpacesMortgage ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                fontSize: '0.85rem'
            }}>
                {outpacesMortgage
                    ? `Non-mortgage costs outpace principal+interest by about ${money(gap)} per month.`
                    : `Principal+interest is about ${money(gap)} higher than non-mortgage costs per month.`}
                <div style={{ marginTop: '0.4rem', color: 'var(--text-muted)' }}>
                    Total monthly housing cost estimate: <strong>{money(costs.total)}</strong>
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                {breakdown.map((item) => (
                    <div key={item.label} style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                            <span>{item.label}</span>
                            <span>{money(item.value)}</span>
                        </div>
                        <div style={{ height: '7px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div
                                style={{
                                    height: '100%',
                                    width: `${costs.total > 0 ? (item.value / costs.total) * 100 : 0}%`,
                                    backgroundColor: item.color,
                                    borderRadius: '999px'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '0.85rem'
            }}>
                <div style={{ fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    U.S. Market Snapshot ({PROPERTY_TYPES[propertyType].label}s)
                </div>
                <div style={{ display: 'grid', gap: '0.45rem' }}>
                    {marketComparison.map((market) => (
                        <div key={market.name} style={{
                            fontSize: '0.76rem',
                            display: 'grid',
                            gridTemplateColumns: '1.5fr 1fr 1fr',
                            gap: '0.5rem',
                            alignItems: 'center',
                            padding: '0.4rem 0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px'
                        }}>
                            <span>{market.name}</span>
                            <span>P+I {money(market.principalInterest)}</span>
                            <span>Extras {money(market.extras)} ({market.extrasShare.toFixed(0)}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.85rem', lineHeight: '1.4' }}>
                Illustrative teaching model only. Actual costs vary by neighborhood, property age, insurer pricing, and local policy changes.
            </p>
        </div>
    );
}

function Slider({ label, value, min, max, step, display, onChange }) {
    return (
        <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
                <span>{label}</span>
                <span>{display}</span>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
            />
        </div>
    );
}

function CostCard({ label, amount, accent }) {
    return (
        <div style={{
            border: `1px solid ${accent}`,
            borderRadius: 'var(--radius)',
            padding: '0.75rem'
        }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: accent }}>{money(amount)}</div>
        </div>
    );
}
