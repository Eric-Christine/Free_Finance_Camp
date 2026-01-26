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
    ]
};
