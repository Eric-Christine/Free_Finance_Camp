import { lazy } from 'react';

export { FREE_TOOLS } from '../../data/freeTools';

export const WIDGET_COMPONENTS = {
    CompoundInterest: lazy(() => import('./CompoundInterest')),
    BudgetAllocator: lazy(() => import('./BudgetAllocator')),
    CarCalculator: lazy(() => import('./CarCalculator')),
    InsuranceCompare: lazy(() => import('./InsuranceCompare')),
    MarketTimer: lazy(() => import('./MarketTimer')),
    EmployerMatchCalculator: lazy(() => import('./EmployerMatchCalculator')),
    HomeBuyingCostExplorer: lazy(() => import('./HomeBuyingCostExplorer')),
    LoanTermTrapCalculator: lazy(() => import('./LoanTermTrapCalculator')),
    WageInflationGapChart: lazy(() => import('./WageInflationGapChart')),
    USDebtCrisisChart: lazy(() => import('./USDebtCrisisChart')),
    Sp500DollarVsGoldChart: lazy(() => import('./Sp500DollarVsGoldChart')),
    ChinaEconomicRiseChart: lazy(() => import('./ChinaEconomicRiseChart')),
    MoneyMultiplier: lazy(() => import('./MoneyMultiplier')),
    SavingsRateCalculator: lazy(() => import('./SavingsRateCalculator')),
    CoastFireCalculator: lazy(() => import('./CoastFireCalculator')),
    FourOhOneKCalculator: lazy(() => import('./FourOhOneKCalculator'))
};
