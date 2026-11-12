// Tools usable without signing in. Kept free of JSX imports so the
// sitemap/robots generator (scripts/generate-sitemap.mjs) can read it in Node.
export const FREE_TOOLS = [
    'CompoundInterest',
    'BudgetAllocator',
    'MoneyMultiplier',
    'EmployerMatchCalculator',
    'SavingsRateCalculator',
    'CoastFireCalculator',
    'FourOhOneKCalculator'
];

export const FREE_TOOL_METADATA = {
    "CompoundInterest": {
        "title": "Compound Interest Calculator",
        "description": "Calculate compound interest with regular contributions and explore how time and returns affect your savings."
    },
    "BudgetAllocator": {
        "title": "50/30/20 Budget Calculator",
        "description": "Plan your monthly budget by dividing income between needs, wants, and savings with our free budget calculator."
    },
    "MoneyMultiplier": {
        "title": "Money Multiplier Calculator",
        "description": "Explore how reserve ratios affect bank lending and money creation with this simplified money multiplier calculator."
    },
    "EmployerMatchCalculator": {
        "title": "401(k) Employer Match Calculator",
        "description": "Calculate your employer retirement match and explore the contributions needed to receive your full match."
    },
    "SavingsRateCalculator": {
        "title": "Savings Rate Calculator",
        "description": "Calculate your savings rate and explore how income, spending, and saving affect your financial goals."
    },
    "CoastFireCalculator": {
        "title": "Coast FIRE Calculator",
        "description": "Calculate your Coast FIRE number and see how age, retirement spending, savings, and investment growth affect your goal."
    },
    "FourOhOneKCalculator": {
        "title": "401(k) Contribution Calculator",
        "description": "Explore 401(k) contributions, employer matching, and retirement savings with our free 401k calculator."
    }
};
