// Quiz data: 3 questions per lesson
// Format: { lessonId: [{ question, options, correctIndex }, ...] }

export const quizzes = {
    // Module 1: The Wealth Mindset
    'lesson-1-0': [
        {
            question: "According to the lesson, what does the modern economy primarily reward?",
            options: ["Hard work alone", "Ownership of assets", "Government jobs", "Lottery winners"],
            correctIndex: 1
        },
        {
            question: "In a K-Shaped Economy, who tends to see their wealth grow after an economic shock?",
            options: ["Hourly workers", "Renters", "Asset owners and investors", "Everyone equally"],
            correctIndex: 2
        },
        {
            question: "Which of the following is NOT an example of an asset you can own?",
            options: ["Stocks & ETFs", "Real Estate", "A credit card balance", "A small business"],
            correctIndex: 2
        }
    ],
    'lesson-1-1': [
        {
            question: "Which of the following is a 'Need' vs. a 'Want'?",
            options: ["Netflix subscription", "Groceries", "Designer shoes", "Concert tickets"],
            correctIndex: 1
        },
        {
            question: "You see an expensive 'want' that wasn't in your budget. What is the best strategy to avoid an impulse buy?",
            options: ["Wait 24 hours", "Wait 72 hours", "Wait 1 week", "Buy it immediately"],
            correctIndex: 1
        },
        {
            question: "What is the first step to building wealth?",
            options: ["Buying stocks", "Prioritizing needs over wants", "Getting a credit card", "Winning the lottery"],
            correctIndex: 1
        }
    ],
    'lesson-1-2': [
        {
            question: "What is compound interest?",
            options: ["Interest only on your initial investment", "Interest on both your principal and accumulated interest", "A type of bank fee", "A government tax"],
            correctIndex: 1
        },
        {
            question: "Using the Rule of 72, how long does it take to double your money at 8% interest?",
            options: ["6 years", "9 years", "12 years", "72 years"],
            correctIndex: 1
        },
        {
            question: "Why is compound interest called the 'eighth wonder of the world'?",
            options: ["It's very confusing", "It grows your money exponentially over time", "Only banks can use it", "It requires no initial investment"],
            correctIndex: 1
        }
    ],

    // Module 2: Budgeting & Saving
    'lesson-2-1': [
        {
            question: "In the 50/30/20 rule, what percentage goes to Savings?",
            options: ["50%", "30%", "20%", "10%"],
            correctIndex: 2
        },
        {
            question: "Which category do 'Wants' fall under in the 50/30/20 rule?",
            options: ["50%", "30%", "20%", "None of the above"],
            correctIndex: 1
        },
        {
            question: "Rent and utility bills are examples of:",
            options: ["Wants", "Needs", "Investments", "Debts"],
            correctIndex: 1
        }
    ],

    // Module 3: Investing 101
    'lesson-3-1': [
        {
            question: "What do you own when you buy a stock?",
            options: ["A loan to the company", "A small piece of the company", "The company's debt", "The company's products"],
            correctIndex: 1
        },
        {
            question: "What is a dividend?",
            options: ["A fee for buying stocks", "A portion of company profits paid to shareholders", "A type of tax", "A stock's price"],
            correctIndex: 1
        },
        {
            question: "Historically, the stock market has returned about ___% per year on average.",
            options: ["2%", "5%", "10%", "50%"],
            correctIndex: 2
        }
    ],
    'lesson-3-2': [
        {
            question: "What does 'Time IN the Market' mean?",
            options: ["Trading frequently", "Buying and holding for the long term", "Selling at the top", "Day trading"],
            correctIndex: 1
        },
        {
            question: "What is Dollar Cost Averaging (DCA)?",
            options: ["Investing a set amount regularly regardless of price", "Buying only when stocks are cheap", "Selling at a loss", "Borrowing money to invest"],
            correctIndex: 0
        },
        {
            question: "Why do most people fail at 'Timing the Market'?",
            options: ["They don't have enough money", "Predicting short-term market moves is nearly impossible", "The market is rigged", "Brokers prevent it"],
            correctIndex: 1
        }
    ],
    'lesson-3-3': [
        {
            question: "What is an index fund?",
            options: ["A single company's stock", "A collection of many stocks bundled together", "A savings account", "A type of bond"],
            correctIndex: 1
        },
        {
            question: "What is the main benefit of diversification?",
            options: ["Higher returns guaranteed", "Reduced risk", "No fees", "Faster trades"],
            correctIndex: 1
        },
        {
            question: "Who recommends index funds for most people?",
            options: ["Day traders", "Warren Buffett", "Credit card companies", "Real estate agents"],
            correctIndex: 1
        }
    ],
    'lesson-3-4': [
        {
            question: "What is 'Opportunity Cost' in the context of investing?",
            options: ["The fee you pay to a broker", "The value of the growth you give up by not investing", "The price of a single stock share", "The tax on your investment gains"],
            correctIndex: 1
        },
        {
            question: "If you keep $10,000 in a savings account earning 0.1% while the market returns 10%, what is your approximate annual opportunity cost?",
            options: ["$10", "$100", "$990", "$1,000"],
            correctIndex: 2
        },
        {
            question: "Why is inflation considered a hidden cost of not investing?",
            options: ["It makes the stock market go down", "It decreases the purchasing power of your idle cash", "It increases your bank's interest rates", "It eliminates the need for savings"],
            correctIndex: 1
        }
    ],

    // Module 4: Big Purchases: Cars
    'lesson-4-1': [
        {
            question: "What is a major disadvantage of leasing a car?",
            options: ["No monthly payments", "You never own the car", "Lower insurance costs", "No mileage limits"],
            correctIndex: 1
        },
        {
            question: "What does being 'underwater' on a car loan mean?",
            options: ["The car was in a flood", "You owe more than the car is worth", "You paid cash", "The loan has low interest"],
            correctIndex: 1
        },
        {
            question: "Which option avoids paying interest on a car?",
            options: ["Financing", "Leasing", "Paying cash", "Credit card"],
            correctIndex: 2
        }
    ],
    'lesson-4-2': [
        {
            question: "What is opportunity cost?",
            options: ["The price of a product", "What you give up by choosing one option over another", "A hidden fee", "The cost of shipping"],
            correctIndex: 1
        },
        {
            question: "If you invest $30,000 at 10% for 5 years, it becomes approximately:",
            options: ["$33,000", "$40,000", "$48,000", "$60,000"],
            correctIndex: 2
        },
        {
            question: "Before making a big purchase, you should ask:",
            options: ["What's the best use of this money?", "What's the trendiest option?", "What will impress my friends?", "What color is best?"],
            correctIndex: 0
        }
    ],

    // Module 5: Insurance
    'lesson-5-1': [
        {
            question: "What is a premium?",
            options: ["The amount you pay monthly for insurance", "The amount insurance pays you", "A type of deductible", "A co-pay"],
            correctIndex: 0
        },
        {
            question: "What is a deductible?",
            options: ["Your monthly payment", "The amount you pay out-of-pocket before insurance kicks in", "A tax", "A late fee"],
            correctIndex: 1
        },
        {
            question: "Generally, high premium plans have:",
            options: ["High deductibles", "Low deductibles", "No coverage", "More paperwork"],
            correctIndex: 1
        }
    ],
    'lesson-5-2': [
        {
            question: "Which type of auto insurance is required by law in most states?",
            options: ["Collision", "Comprehensive", "Liability", "Gap insurance"],
            correctIndex: 2
        },
        {
            question: "If your car is old and not worth much, you might consider skipping:",
            options: ["Liability coverage", "Collision/Comprehensive coverage", "All insurance", "Registration"],
            correctIndex: 1
        },
        {
            question: "Higher auto insurance deductible means:",
            options: ["Higher premium", "Lower premium", "No coverage", "More claims"],
            correctIndex: 1
        }
    ],
    'lesson-5-3': [
        {
            question: "What does 'Dwelling Coverage' in a homeowner's policy protect?",
            options: ["Your car", "Your home's structure", "Your health", "Your investments"],
            correctIndex: 1
        },
        {
            question: "Which type of damage typically requires a SEPARATE policy from standard homeowner's insurance?",
            options: ["Fire damage", "Vandalism", "Flood damage", "Theft"],
            correctIndex: 2
        },
        {
            question: "What is a smart way to prepare for a potential insurance claim?",
            options: ["Hope nothing happens", "Create a home inventory with photos/video", "Never file claims", "Cancel your policy"],
            correctIndex: 1
        }
    ],
    'lesson-5-4': [
        {
            question: "What is the main difference between Term Life and Whole Life insurance?",
            options: ["Term is permanent, Whole expires", "Term expires after a set period, Whole is permanent", "They are the same", "Whole Life is cheaper"],
            correctIndex: 1
        },
        {
            question: "Who needs life insurance the most?",
            options: ["Single people with no dependents", "People with dependents relying on their income", "Retirees with no debt", "Children"],
            correctIndex: 1
        },
        {
            question: "A common rule of thumb is that life insurance coverage should be how many times your annual income?",
            options: ["1-2x", "5x", "10-12x", "50x"],
            correctIndex: 2
        }
    ],

    // Module 6: Credit & Debt
    'lesson-6-1': [
        {
            question: "What is considered an 'Excellent' credit score?",
            options: ["500+", "650+", "750+", "850+"],
            correctIndex: 2
        },
        {
            question: "Which factor has the biggest impact on your credit score?",
            options: ["Credit mix", "New credit", "Payment history", "Length of history"],
            correctIndex: 2
        },
        {
            question: "A 'soft pull' on your credit:",
            options: ["Hurts your score a lot", "Slightly lowers your score", "Does NOT hurt your score", "Is illegal"],
            correctIndex: 2
        }
    ],
    'lesson-6-2': [
        {
            question: "Which is an example of 'good debt'?",
            options: ["Credit card debt for shopping", "Payday loans", "A mortgage", "Car loan for a luxury car"],
            correctIndex: 2
        },
        {
            question: "What should you ALWAYS do before investing?",
            options: ["Buy stocks first", "Pay off high-interest debt", "Get a credit card", "Lease a new car"],
            correctIndex: 1
        },
        {
            question: "Which of these is considered 'bad debt'?",
            options: ["Student loans for a high-income career", "Business loan for a profitable business", "Credit card debt for consumption", "Mortgage"],
            correctIndex: 2
        }
    ],
    'lesson-6-3': [
        {
            question: "What does BNPL stand for?",
            options: ["Buy Now, Pay Less", "Buy Now, Pay Later", "Borrow Now, Pay Loans", "Best New Payment Loans"],
            correctIndex: 1
        },
        {
            question: "What is a danger of BNPL services?",
            options: ["They save too much money", "They encourage buying things you can't afford", "They improve your credit score", "They have no fees"],
            correctIndex: 1
        },
        {
            question: "How should you treat BNPL?",
            options: ["As free money", "As a savings account", "Like credit card debt", "As an investment"],
            correctIndex: 2
        }
    ],

    // Module 7: Investing 201
    'lesson-7-1': [
        {
            question: "How does an ETF trade differently from a Mutual Fund?",
            options: ["ETFs trade once per day", "ETFs trade like stocks throughout the day", "ETFs can't be bought by individuals", "ETFs have higher fees"],
            correctIndex: 1
        },
        {
            question: "Which investment vehicle typically has lower fees?",
            options: ["Mutual Funds", "ETFs", "Savings accounts", "Hedge funds"],
            correctIndex: 1
        },
        {
            question: "For most beginners, what is the easiest way to build a diversified portfolio?",
            options: ["Individual stocks", "Options trading", "ETFs", "Cryptocurrency"],
            correctIndex: 2
        }
    ],
    'lesson-7-2': [
        {
            question: "What drives the price of 'Meme Stocks'?",
            options: ["Company profits", "Social media hype", "Dividends", "Government regulation"],
            correctIndex: 1
        },
        {
            question: "What is volatility?",
            options: ["Steady, predictable growth", "Wild price swings", "A type of bond", "A trading fee"],
            correctIndex: 1
        },
        {
            question: "Investing in meme stocks is most similar to:",
            options: ["Long-term investing", "Gambling", "Saving in a bank", "Buying bonds"],
            correctIndex: 1
        }
    ],
    'lesson-7-3': [
        {
            question: "What is an Options contract?",
            options: ["A type of savings account", "A bet on the future price of a stock", "A company's stock", "A government bond"],
            correctIndex: 1
        },
        {
            question: "A 'Call Option' is a bet that the price will:",
            options: ["Go DOWN", "Stay the same", "Go UP", "Not change for 1 year"],
            correctIndex: 2
        },
        {
            question: "Why are options considered risky?",
            options: ["They are boring", "Small stock moves can mean 100% loss", "They have no fees", "They are guaranteed to profit"],
            correctIndex: 1
        }
    ],

    // Module 8: The Economic Machine
    'lesson-8-1': [
        {
            question: "What does 'The Fed' manage?",
            options: ["The stock market directly", "Monetary policy and interest rates", "Individual bank accounts", "Your credit score"],
            correctIndex: 1
        },
        {
            question: "What happens during 'Loose Policy' (low interest rates)?",
            options: ["Borrowing is expensive", "Spending slows down", "Stocks usually go UP", "Recession is certain"],
            correctIndex: 2
        },
        {
            question: "What is the Fed's typical inflation target?",
            options: ["0%", "2%", "10%", "50%"],
            correctIndex: 1
        }
    ],
    'lesson-8-2': [
        {
            question: "What are you doing when you buy a bond?",
            options: ["Buying a piece of a company", "Lending money to an entity", "Paying a tax", "Opening a savings account"],
            correctIndex: 1
        },
        {
            question: "According to the 'Seesaw Rule', when interest rates go UP, bond prices:",
            options: ["Go UP", "Stay the same", "Go DOWN", "Disappear"],
            correctIndex: 2
        },
        {
            question: "Which type of bond is considered the safest?",
            options: ["Corporate bonds", "Junk bonds", "Government bonds (Treasuries)", "Meme bonds"],
            correctIndex: 2
        }
    ],

    // Module 9: Future Finance
    'lesson-9-1': [
        {
            question: "Which asset class typically has the highest liquidity?",
            options: ["Real Estate", "Stocks", "Art", "Gold"],
            correctIndex: 1
        },
        {
            question: "What is a disadvantage of real estate investing?",
            options: ["High liquidity", "Can use leverage", "Hard to sell quickly", "No maintenance costs"],
            correctIndex: 2
        },
        {
            question: "Hard assets like gold are often used as a hedge against:",
            options: ["High returns", "Inflation", "Dividends", "Low risk"],
            correctIndex: 1
        }
    ],
    'lesson-9-2': [
        {
            question: "What technology does cryptocurrency run on?",
            options: ["Email", "Blockchain", "Social media", "Cloud storage"],
            correctIndex: 1
        },
        {
            question: "Why is Bitcoin called 'Digital Gold'?",
            options: ["It's the same color as gold", "It has a fixed supply", "It's controlled by the government", "It pays dividends"],
            correctIndex: 1
        },
        {
            question: "What does 'Not your keys, not your coins' mean?",
            options: ["You need physical keys to access crypto", "If you don't control private keys, you don't truly own the assets", "Crypto is stored in a bank", "Keys are expensive"],
            correctIndex: 1
        }
    ],
    'lesson-9-3': [
        {
            question: "What do prediction markets allow people to do?",
            options: ["Predict the stock market with certainty", "Bet on the outcome of real-world events", "Guarantee investment returns", "Control the economy"],
            correctIndex: 1
        },
        {
            question: "If a prediction market share costs 60 cents, what probability does the market estimate?",
            options: ["6%", "60%", "100%", "0.6%"],
            correctIndex: 1
        },
        {
            question: "Why are prediction markets considered accurate?",
            options: ["They are run by the government", "Participants have 'skin in the game'", "They use AI", "They are free"],
            correctIndex: 1
        }
    ],
    // Module 10: Banking & Financial Institutions
    'lesson-10-1': [
        {
            question: "What is the primary difference between a Bank and a Credit Union?",
            options: ["Banks are non-profit, Credit Unions are for-profit", "Banks are shareholder-owned, Credit Unions are member-owned", "Banks don't have physical branches", "Credit Unions are not insured"],
            correctIndex: 1
        },
        {
            question: "What does FDIC insurance protect?",
            options: ["Your stock portfolio", "Your bank deposits up to $250,000", "Your credit score", "Your car insurance premium"],
            correctIndex: 1
        },
        {
            question: "Why do online-only banks often offer higher interest rates (HYSA)?",
            options: ["They are less safe", "They have lower overhead costs", "They don't use the FDIC", "They only lend to billionaires"],
            correctIndex: 1
        }
    ],
    'lesson-10-2': [
        {
            question: "What is the main goal of a Green Bank?",
            options: ["To print green-colored money", "To use public funds to attract private investment in clean energy", "To only lend to organic farmers", "To replace the Federal Reserve"],
            correctIndex: 1
        },
        {
            question: "Why might a traditional bank refuse to fund a green project?",
            options: ["They hate the environment", "They lack historical data to accurately predict the risk", "Green projects are illegal", "They only fund oil companies"],
            correctIndex: 1
        },
        {
            question: "For every $1 of public money, how much private capital do Green Banks typically attract?",
            options: ["None", "$3 to $10", "$500", "$1"],
            correctIndex: 1
        }
    ],
    'lesson-10-3': [
        {
            question: "What is the primary role of the International Monetary Fund (IMF)?",
            options: ["Building schools in poor villages", "Acting as a global 'lender of last resort' for countries in crisis", "Managing individual credit scores", "Investing in the S&P 500"],
            correctIndex: 1
        },
        {
            question: "Which institution focuses on long-term development projects like infrastructure?",
            options: ["The IMF", "The World Bank", "The Fed", "NASDAQ"],
            correctIndex: 1
        },
        {
            question: "What is a common criticism of global financial institutions?",
            options: ["They give away too much free money", "They attach painful 'conditions' to their loans", "They are too small to matter", "They only operate in the US"],
            correctIndex: 1
        }
    ],

    // Module 11: Homebuying & Mortgages
    'lesson-11-1': [
        {
            question: "What are the two components of every mortgage payment?",
            options: ["Tax and insurance", "Principal and interest", "Down payment and closing costs", "PMI and HOA"],
            correctIndex: 1
        },
        {
            question: "What is a 5/1 ARM?",
            options: ["A fixed-rate mortgage for 5 years", "A loan with 5% interest", "Fixed rate for 5 years, then adjusts every 1 year", "A 5-year mortgage"],
            correctIndex: 2
        },
        {
            question: "What should your Debt-to-Income ratio be below for most lenders?",
            options: ["20%", "33%", "43%", "60%"],
            correctIndex: 2
        }
    ],
    'lesson-11-2': [
        {
            question: "What is PMI?",
            options: ["A type of home warranty", "Insurance that protects the LENDER if you default", "Insurance that protects YOU from losing the home", "A property tax"],
            correctIndex: 1
        },
        {
            question: "At what equity percentage can you typically request PMI removal?",
            options: ["5%", "10%", "15%", "20%"],
            correctIndex: 3
        },
        {
            question: "Closing costs typically range from what percentage of the home price?",
            options: ["0-1%", "2-5%", "10-15%", "20-25%"],
            correctIndex: 1
        }
    ],
    'lesson-11-3': [
        {
            question: "How many years does it typically take for buying to break even vs. renting?",
            options: ["1-2 years", "3-4 years", "5-7 years", "10+ years"],
            correctIndex: 2
        },
        {
            question: "'Renting is throwing money away' is:",
            options: ["Always true", "Always false", "An oversimplification", "A proven financial law"],
            correctIndex: 2
        },
        {
            question: "If you plan to move within 3 years, which option usually wins?",
            options: ["Buying", "Renting", "It doesn't matter", "Leasing"],
            correctIndex: 1
        }
    ],
    'lesson-11-4': [
        {
            question: "The 1% Rule suggests budgeting what amount annually for home maintenance?",
            options: ["1% of your income", "1-2% of your home's value", "1% of your mortgage payment", "$1,000 flat"],
            correctIndex: 1
        },
        {
            question: "Which state has among the HIGHEST property tax rates?",
            options: ["Hawaii", "Texas", "Florida", "New Jersey"],
            correctIndex: 3
        },
        {
            question: "Before deciding what you can 'afford,' you should:",
            options: ["Only look at the mortgage payment", "Add up ALL costs (taxes, insurance, maintenance, HOA)", "Trust the real estate agent's estimate", "Ignore property taxes"],
            correctIndex: 1
        }
    ],

    // Module 12: Taxes
    'lesson-12-1': [
        {
            question: "In a marginal tax system, earning more money means:",
            options: ["You could take home less", "Only the income in the higher bracket is taxed at that rate", "All your income is taxed at the highest rate", "You pay a flat tax"],
            correctIndex: 1
        },
        {
            question: "If your marginal rate is 22% and your effective rate is 13.8%, what does that mean?",
            options: ["You pay 22% on all income", "You pay 13.8% overall, with only income above a threshold at 22%", "You owe 35.8% total", "The rates are unrelated"],
            correctIndex: 1
        },
        {
            question: "Should you ever turn down a raise because of tax brackets?",
            options: ["Yes, you might earn less", "Only if it's a small raise", "No — earning more always means more take-home pay", "It depends on your state"],
            correctIndex: 2
        }
    ],
    'lesson-12-2': [
        {
            question: "As a 1099 independent contractor, your total FICA self-employment tax is:",
            options: ["7.65%", "10%", "15.3%", "22%"],
            correctIndex: 2
        },
        {
            question: "What percentage of each payment should 1099 workers set aside for taxes?",
            options: ["5-10%", "15-20%", "25-30%", "50%"],
            correctIndex: 2
        },
        {
            question: "Which is an advantage of 1099 work?",
            options: ["Employer pays half your FICA", "Automatic tax withholding", "Ability to deduct business expenses", "Guaranteed benefits"],
            correctIndex: 2
        }
    ],
    'lesson-12-3': [
        {
            question: "What is the difference between a tax deduction and a tax credit?",
            options: ["They are the same thing", "A deduction reduces taxable income; a credit reduces your tax bill dollar-for-dollar", "A credit reduces taxable income; a deduction reduces your tax bill", "Neither affects how much you owe"],
            correctIndex: 1
        },
        {
            question: "A $1,000 tax credit saves you more money than a $1,000 deduction because:",
            options: ["Credits are illegal", "A credit reduces your tax bill by $1,000; a deduction only saves you your marginal rate on $1,000", "Deductions are worth more", "They save the same amount"],
            correctIndex: 1
        },
        {
            question: "Most Americans should take the _____ deduction.",
            options: ["Itemized", "Standard", "Business", "Foreign"],
            correctIndex: 1
        }
    ],
    'lesson-12-4': [
        {
            question: "What makes the HSA the 'ultimate tax hack'?",
            options: ["It has no contribution limit", "Triple tax advantage: pre-tax in, tax-free growth, tax-free medical withdrawals", "It replaces your 401k", "It's only for retirees"],
            correctIndex: 1
        },
        {
            question: "What's the recommended priority order for tax-advantaged accounts?",
            options: ["Max Roth IRA first", "401k match → HSA → Roth IRA → remaining 401k", "HSA only", "Traditional IRA → 401k"],
            correctIndex: 1
        },
        {
            question: "An employer 401k match is best described as:",
            options: ["A loan", "Free money", "A tax penalty", "An insurance benefit"],
            correctIndex: 1
        }
    ],

    // Module 13: Student Loans & Education ROI
    'lesson-13-1': [
        {
            question: "Which type of federal loan has the government pay interest while you're in school?",
            options: ["Direct Unsubsidized", "PLUS Loan", "Direct Subsidized", "Private loan"],
            correctIndex: 2
        },
        {
            question: "What should you ALWAYS fill out before considering private student loans?",
            options: ["A credit card application", "The FAFSA", "A mortgage application", "A tax return"],
            correctIndex: 1
        },
        {
            question: "Which type of loan offers income-driven repayment and forgiveness programs?",
            options: ["Private loans", "Federal loans", "Payday loans", "Personal loans"],
            correctIndex: 1
        }
    ],
    'lesson-13-2': [
        {
            question: "The Avalanche method prioritizes paying off loans with the:",
            options: ["Smallest balance", "Largest balance", "Highest interest rate", "Lowest interest rate"],
            correctIndex: 2
        },
        {
            question: "Public Service Loan Forgiveness (PSLF) requires how many qualifying payments?",
            options: ["60 (5 years)", "120 (10 years)", "240 (20 years)", "360 (30 years)"],
            correctIndex: 1
        },
        {
            question: "The Snowball method is popular because it:",
            options: ["Saves the most money", "Provides motivational wins by eliminating small debts first", "Has the lowest payments", "Is required by law"],
            correctIndex: 1
        }
    ],
    'lesson-13-3': [
        {
            question: "Refinancing federal loans into a private loan is:",
            options: ["Easily reversible", "Irreversible — you lose all federal protections", "Recommended for everyone", "Required after graduation"],
            correctIndex: 1
        },
        {
            question: "When does refinancing make the MOST sense?",
            options: ["When you have federal loans and want PSLF", "When your income is unstable", "When you have high-interest private loans and improved credit", "When you just graduated"],
            correctIndex: 2
        },
        {
            question: "What protections do you lose when refinancing federal loans to private?",
            options: ["Nothing — private loans are better", "IDR plans, PSLF eligibility, and forbearance", "Only the interest rate changes", "Your degree"],
            correctIndex: 1
        }
    ],
    'lesson-13-4': [
        {
            question: "On average, college graduates earn how much more over a lifetime?",
            options: ["$100,000", "$500,000", "$1.2 million", "$5 million"],
            correctIndex: 2
        },
        {
            question: "Which is often a high-ROI alternative to a 4-year degree?",
            options: ["Taking on more debt", "Trade school", "Waiting until you're older", "Dropping out immediately"],
            correctIndex: 1
        },
        {
            question: "The right question about college is:",
            options: ["Is college worth it?", "Is THIS degree at THIS cost worth it for MY career goals?", "What's the most prestigious school?", "Which school has the best parties?"],
            correctIndex: 1
        }
    ],

    // Module 14: Salary Negotiation & Career Finance
    'lesson-14-1': [
        {
            question: "Salary secrecy primarily benefits:",
            options: ["Employees", "Employers", "The government", "Everyone equally"],
            correctIndex: 1
        },
        {
            question: "What is 'leveling' in the context of compensation?",
            options: ["Making everyone's salary equal", "Internal company tiers that determine your pay band", "A negotiation tactic", "A type of bonus"],
            correctIndex: 1
        },
        {
            question: "A $150k salary in San Francisco is roughly equivalent to what in Dallas?",
            options: ["$150k", "$120k", "$90k", "$200k"],
            correctIndex: 2
        }
    ],
    'lesson-14-2': [
        {
            question: "Companies almost never rescind job offers because you negotiate because:",
            options: ["It's illegal", "They've already invested thousands in hiring you", "They don't care about salary", "HR policies prevent it"],
            correctIndex: 1
        },
        {
            question: "What is BATNA?",
            options: ["A salary calculator", "Best Alternative to a Negotiated Agreement", "A type of stock option", "A tax deduction"],
            correctIndex: 1
        },
        {
            question: "When is the best time to negotiate compensation?",
            options: ["After your first day", "During your annual review", "Before you accept the offer", "After 6 months"],
            correctIndex: 2
        }
    ],
    'lesson-14-3': [
        {
            question: "RSUs (Restricted Stock Units) are:",
            options: ["A type of savings account", "Actual company shares granted over time", "A retirement plan", "A type of insurance"],
            correctIndex: 1
        },
        {
            question: "An offer with a lower base salary but significant equity and benefits:",
            options: ["Is always worse", "Could have higher total compensation", "Should always be rejected", "Isn't real compensation"],
            correctIndex: 1
        },
        {
            question: "When comparing offers, you should always compare:",
            options: ["Base salary only", "Total compensation", "Company name recognition", "Office location only"],
            correctIndex: 1
        }
    ],
    'lesson-14-4': [
        {
            question: "A $5,000 higher starting salary can compound to how much over a career?",
            options: ["$5,000", "$50,000", "$250,000+", "It doesn't matter"],
            correctIndex: 2
        },
        {
            question: "People who negotiate earn roughly how much more over their lifetime?",
            options: ["$10,000", "$100,000", "$1 million+", "The same amount"],
            correctIndex: 2
        },
        {
            question: "Which of these can you negotiate besides job offers?",
            options: ["Medical bills", "Rent", "Cable/internet bills", "All of the above"],
            correctIndex: 3
        }
    ],

    // Module 15: Emergency Funds & Financial Resilience
    'lesson-15-1': [
        {
            question: "What percentage of Americans cannot cover a $1,000 emergency?",
            options: ["10%", "25%", "56%", "90%"],
            correctIndex: 2
        },
        {
            question: "An emergency fund should cover 3-6 months of:",
            options: ["Income", "Essential expenses", "Wants", "Investments"],
            correctIndex: 1
        },
        {
            question: "A good 'starter' emergency fund amount is:",
            options: ["$100", "$1,000", "$50,000", "One year's salary"],
            correctIndex: 1
        }
    ],
    'lesson-15-2': [
        {
            question: "Which is the BEST place to keep an emergency fund?",
            options: ["Stock market", "Checking account", "High-Yield Savings Account (HYSA)", "Cryptocurrency"],
            correctIndex: 2
        },
        {
            question: "What are the three requirements for emergency fund placement?",
            options: ["High returns, risky, locked up", "Liquid, safe, earning something", "Volatile, accessible, tax-free", "Invested, diversified, growing"],
            correctIndex: 1
        },
        {
            question: "Treasury Bills (T-Bills) are exempt from:",
            options: ["Federal taxes", "State and local taxes", "All taxes", "No taxes"],
            correctIndex: 1
        }
    ],
    'lesson-15-3': [
        {
            question: "If you lose your job, what should you do FIRST?",
            options: ["Wait a month to see what happens", "File for unemployment immediately", "Take out a payday loan", "Sell all your investments"],
            correctIndex: 1
        },
        {
            question: "Up to what percentage of medical bills may contain errors?",
            options: ["5%", "20%", "50%", "80%"],
            correctIndex: 3
        },
        {
            question: "The first phase of financial rebuilding focuses on:",
            options: ["Aggressive investing", "Stabilizing with a bare-bones budget", "Taking on new debt", "Buying a home"],
            correctIndex: 1
        }
    ],
    'lesson-15-4': [
        {
            question: "The average millionaire has how many income streams?",
            options: ["1", "3", "7", "15"],
            correctIndex: 2
        },
        {
            question: "Which type of income requires minimal ongoing effort after initial setup?",
            options: ["Active income", "Portfolio income", "Passive income", "All require equal effort"],
            correctIndex: 2
        },
        {
            question: "How long should you give a new side income before judging results?",
            options: ["1 week", "1 month", "6 months", "5 years"],
            correctIndex: 2
        }
    ]
};
