export const curriculum = [
    {
        id: 'module-1',
        title: 'The Wealth Mindset',
        description: 'Understand the core principles of building wealth.',
        xpReward: 50,
        lessons: [
            {
                id: 'lesson-1-1',
                title: 'Needs vs. Wants',
                description: 'The foundation of all financial decisions.',
                xpReward: 15,
                content: [
                    "Money is a finite resource. To make the most of it, you need to distinguish between what you NEED and what you WANT.",
                    "Needs are essentials: shelter, food, basic clothing, utilities.",
                    "Wants are extras: dining out, new gadgets, designer clothes, entertainment.",
                    "",
                    "Pro tip: Use the **72-Hour Rule** for wants. If you see something you want, wait 72 hours before buying it. Usually, the 'urge' fades and you save your money.",
                    "The first step to wealth is prioritizing needs, then smartly managing wants."
                ],
                type: 'interactive',
                widget: 'BudgetAllocator'
            },
            {
                id: 'lesson-1-2',
                title: 'The Magic of Compound Interest',
                description: 'See how your money can work for you.',
                xpReward: 20,
                content: [
                    "Compound interest is often called the 'eighth wonder of the world'.",
                    "It's when you earn interest NOT ONLY on your initial investment, but also on the interest that investment has already earned.",
                    "",
                    "Pro tip: Use the **Rule of 72** to estimate how long it takes to double your money. Divide 72 by your interest rate. (e.g., At 10% interest, your money doubles in 7.2 years).",
                    "Use the calculator on the right to see how a small investment can grow into millions over time."
                ],
                type: 'interactive',
                widget: 'CompoundInterest'
            }
        ]
    },
    {
        id: 'module-2',
        title: 'Budgeting & Saving',
        description: 'Learn to control your cash flow.',
        xpReward: 50,
        lessons: [
            {
                id: 'lesson-2-1',
                title: 'The 50/30/20 Rule',
                description: 'A simple framework for budgeting.',
                xpReward: 25,
                content: [
                    "The 50/30/20 rule is a popular way to budget.",
                    "50% of income goes to Needs (Rent, Bills).",
                    "30% of income goes to Wants (Fun, Hobbies).",
                    "20% of income goes to Savings & Debt Repayment.",
                    "Try to adjust your budget to fit this model."
                ],
                type: 'interactive',
                widget: 'BudgetAllocator'
            }
        ]
    },
    {
        id: 'module-3',
        title: 'Investing 101',
        description: 'Start building wealth for the future.',
        xpReward: 75,
        lessons: [
            {
                id: 'lesson-3-1',
                title: 'What is the Stock Market?',
                description: 'The basics of buying and selling stocks.',
                xpReward: 20,
                content: [
                    "The stock market is where people buy and sell shares (tiny pieces) of companies.",
                    "When you buy a stock, you own a small part of that company.",
                    "If the company does well, your stock becomes more valuable. If it does poorly, you could lose money.",
                    "",
                    "The **S&P 500** is a list of the 500 biggest companies in the US. It is often used as a benchmark for how 'the market' is doing.",
                    "Many stocks also pay **Dividends**—a portion of the company's profit paid out to you just for owning the share.",
                    "Historically, the stock market has returned about 10% per year on average."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-3-2',
                title: 'Timing the Market vs. Time in the Market',
                description: 'Can you beat the stock market?',
                xpReward: 35,
                story: {
                    character: 'Sarah',
                    scenario: "Sarah thinks she can predict when stocks will go up or down. She wants to trade frequently. Her friend Jen just buys and holds. Who wins?"
                },
                content: [
                    "Many people think investing is about guessing when to buy low and sell high.",
                    "This is called 'Timing the Market', and even professionals fail at it.",
                    "The alternative is 'Time IN the Market'—buying and holding for the long term.",
                    "",
                    "Myth Buster: You don't need a perfect entry. **Dollar Cost Averaging (DCA)**—investing a set amount every month regardless of price—is historically more successful than trying to wait for a 'dip'.",
                    "Play the game on the right. Try to buy when the line dips and sell when it peaks. Can you beat the simple strategy of just holding?"
                ],
                type: 'interactive',
                widget: 'MarketTimer'
            },
            {
                id: 'lesson-3-3',
                title: 'Index Funds: The Beginner\'s Best Friend',
                description: 'Why diversification matters.',
                xpReward: 25,
                content: [
                    "An index fund is a collection of many stocks bundled together.",
                    "Instead of buying one company's stock, you buy a tiny piece of hundreds of companies.",
                    "This 'diversification' reduces your risk. If one company fails, the others can make up for it.",
                    "Famous investor Warren Buffett recommends index funds for most people."
                ],
                type: 'reading'
            }
        ]
    },
    {
        id: 'module-4',
        title: 'Big Purchases: Cars',
        description: 'Make smart decisions on your biggest expenses.',
        xpReward: 100,
        lessons: [
            {
                id: 'lesson-4-1',
                title: 'Buy vs. Lease vs. Cash: The Great Debate',
                description: 'Understand the true cost of car ownership.',
                xpReward: 35,
                story: {
                    character: 'Alex',
                    scenario: "Alex just got their first job and needs a car. They have $10,000 saved. A new car costs $30,000. What should Alex do?"
                },
                content: [
                    "OPTION 1: PAY CASH",
                    "Pros: No monthly payments, no interest, you own the car outright.",
                    "Cons: Ties up a lot of money that could be invested instead.",
                    "",
                    "OPTION 2: FINANCE (Loan)",
                    "Pros: Keep your cash invested, build credit history.",
                    "Cons: Pay interest over time, risk of being 'underwater' (owing more than the car is worth).",
                    "",
                    "OPTION 3: LEASE",
                    "Pros: Lower monthly payments, always drive a newer car.",
                    "Cons: Never own the car, mileage limits, fees for wear and tear.",
                    "",
                    "Use the calculator to compare the TRUE COST of each option over 5 years."
                ],
                type: 'interactive',
                widget: 'CarCalculator'
            },
            {
                id: 'lesson-4-2',
                title: 'Opportunity Cost: The Hidden Factor',
                description: 'What else could your money be doing?',
                xpReward: 30,
                content: [
                    "Opportunity cost is what you give up when you choose one option over another.",
                    "If you spend $30,000 on a car, you can't invest that $30,000.",
                    "At a 10% return, $30,000 invested would become $48,000 in 5 years.",
                    "That $18,000 difference is the 'opportunity cost' of buying the car.",
                    "Always ask: 'What's the best use of this money?'"
                ],
                type: 'interactive',
                widget: 'CompoundInterest'
            }
        ]
    },
    {
        id: 'module-5',
        title: 'Insurance Essentials',
        description: 'Protect yourself without overpaying.',
        xpReward: 100,
        lessons: [
            {
                id: 'lesson-5-1',
                title: 'Health Insurance: Decoding the Jargon',
                description: 'Premiums, deductibles, and copays explained.',
                xpReward: 35,
                content: [
                    "**PREMIUM**: The amount you pay every month, whether you use the insurance or not.",
                    "**DEDUCTIBLE**: The amount you pay out-of-pocket BEFORE insurance starts covering costs.",
                    "**COPAY**: A fixed amount you pay for a service (e.g., $20 for a doctor visit).",
                    "**OUT-OF-POCKET MAXIMUM**: The most you'll ever pay in a year. After this, insurance covers 100%.",
                    "",
                    "Generally: High Premium = Low Deductible. Low Premium = High Deductible.",
                    "If you're young and healthy, a high-deductible plan might save you money.",
                    "If you have regular medical needs, a low-deductible plan could be better."
                ],
                type: 'interactive',
                widget: 'InsuranceCompare'
            },
            {
                id: 'lesson-5-2',
                title: 'Auto Insurance: What You Actually Need',
                description: 'Don\'t overpay for coverage you don\'t need.',
                xpReward: 25,
                content: [
                    "LIABILITY: Covers damage YOU cause to others. Required by law in most states.",
                    "COLLISION: Covers damage to YOUR car from accidents.",
                    "COMPREHENSIVE: Covers theft, weather damage, hitting an animal, etc.",
                    "",
                    "Pro tip: If your car is old and not worth much, you might skip collision/comprehensive.",
                    "The payout from insurance can't exceed the car's value.",
                    "",
                    "DEDUCTIBLE matters here too! Higher deductible = lower premium."
                ],
                type: 'reading'
            }
        ]
    },
    {
        id: 'module-6',
        title: 'Credit & Debt',
        description: 'Master the tools that can build or destroy wealth.',
        xpReward: 125,
        lessons: [
            {
                id: 'lesson-6-1',
                title: 'Credit Scores: Your Financial Report Card',
                description: 'How they work and why they matter.',
                xpReward: 30,
                content: [
                    "Your credit score is a number from 300-850 that tells lenders how risky you are.",
                    "750+ = Excellent. 700-749 = Good. 650-699 = Fair. Below 650 = Poor.",
                    "",
                    "Pro tip: Avoid 'Hard Pulls' (checking for new loans) too often, as they can temporarily drop your score. 'Soft Pulls' (checking your own score) do NOT hurt it.",
                    "",
                    "WHAT AFFECTS YOUR SCORE:",
                    "• Payment History (35%): Pay bills on time!",
                    "• Credit Utilization (30%): Use less than 30% of your credit limit (ideally under 10% for the best score).",
                    "• Length of History (15%): Older accounts help.",
                    "• Credit Mix (10%): Having different types of credit helps.",
                    "• New Credit (10%): Don't open too many accounts at once."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-6-2',
                title: 'Good Debt vs. Bad Debt',
                description: 'Not all borrowing is created equal.',
                xpReward: 25,
                story: {
                    character: 'Jordan',
                    scenario: "Jordan has $10,000. Should they pay off their 20% credit card or invest in the stock market?"
                },
                content: [
                    "**GOOD DEBT** makes you money or increases your earning potential.",
                    "• Student loans (if they lead to higher income)",
                    "• Mortgage (you build equity, home may appreciate)",
                    "• Business loan (if the business is profitable)",
                    "",
                    "**BAD DEBT** costs you money on things that lose value.",
                    "• Credit card debt (high interest, often for consumption)",
                    "• Car loans (cars depreciate rapidly)",
                    "• Payday loans (predatory interest rates)",
                    "",
                    "Rule: Always pay off high-interest debt before investing."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-6-3',
                title: 'The Trap of Buy Now, Pay Later',
                description: 'Why splitting payments is dangerous.',
                xpReward: 30,
                content: [
                    "**Buy Now, Pay Later (BNPL)** services let you split a purchase into 4 small payments.",
                    "It feels like you're spending less money, but you aren't.",
                    "The Danger: It encourages you to buy things you can't actually afford today.",
                    "It decouples the 'pain of paying' from the 'pleasure of buying'.",
                    "If you miss a payment, the fees can be massive. Treat BNPL like credit card debt."
                ],
                type: 'reading'
            }
        ]
    },
    {
        id: 'module-7',
        title: 'Investing 201: The Deep End',
        description: 'Advanced concepts: ETFs, Meme Stocks, and Options.',
        xpReward: 150,
        lessons: [
            {
                id: 'lesson-7-1',
                title: 'ETFs vs. Mutual Funds',
                description: 'Understanding modern investment vehicles.',
                xpReward: 40,
                content: [
                    "We've talked about Index Funds. Most Index Funds today are **ETFs** (Exchange Traded Funds).",
                    "**ETF**: Trades like a stock. You can buy 1 share instantly during the day. Usually has lower fees.",
                    "**Mutual Fund**: Trades once per day at closing price. Often has higher minimums.",
                    "For most beginners, **ETFs** are the easiest way to start building a diversified portfolio."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-7-2',
                title: 'Meme Stocks & Volatility',
                description: 'When investing becomes gambling.',
                xpReward: 40,
                story: {
                    character: 'Kevin',
                    scenario: "Kevin sees a GameStore stock soaring 500% in a week. Everyone on the internet is buying it. He puts his tuition money in, hoping to double it."
                },
                content: [
                    "**Meme Stocks** are companies whose price is driven by social media hype rather than business performance.",
                    "This creates extreme **Volatility** (wild price swings).",
                    "While some people make millions, many lose everything when the hype dies down.",
                    "This is closer to gambling than investing. Never invest money you can't afford to lose in these assets."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-7-3',
                title: 'Intro to Options: High Risk, High Reward',
                description: 'The casino of the stock market.',
                xpReward: 50,
                content: [
                    "**Options** are contracts that let you bet on the future price of a stock.",
                    "**Call Option**: A bet that the price will go UP.",
                    "**Put Option**: A bet that the price will go DOWN.",
                    "Options use 'Leaverage'. A small move in the stock price can mean a 100% gain or 100% loss in your option.",
                    "WARNING: Most retail traders lose money on options. It is an advanced strategy."
                ],
                type: 'reading'
            }
        ]
    },
    {
        id: 'module-8',
        title: 'The Economic Machine',
        description: 'How the big picture affects your wallet.',
        xpReward: 150,
        lessons: [
            {
                id: 'lesson-8-1',
                title: 'Interest Rates & The Fed',
                description: 'The gas pedal and brake of the economy.',
                xpReward: 40,
                content: [
                    "The Federal Reserve ('The Fed') manages the economy using **Monetary Policy**.",
                    "Think of **Interest Rates** as the cost of money.",
                    "The Fed usually has a **2% Inflation Target**. They adjust rates to try and keep prices stable while keeping employment high.",
                    "**Loose Policy** (Low Rates): Cheap to borrow. Encourages spending and investing. Stocks usually go UP. Risk of Inflation.",
                    "**Tight Policy** (High Rates): Expensive to borrow. Slows down spending to fight inflation. Stocks often go DOWN. Risk of Recession."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-8-2',
                title: 'Bonds: The Boring But Safe Bet?',
                description: 'Lending money to governments and companies.',
                xpReward: 40,
                content: [
                    "When you buy a **Bond**, you are lending money to an entity for a fixed period of time.",
                    "In return, they pay you interest. It's an I.O.U.",
                    "**The Seesaw Rule**: Bond prices and Interest Rates move in OPPOSITE directions.",
                    "If new rates go UP, your old low-rate bonds become less valuable (Price DOWN).",
                    "Government bonds (Treasuries) are considered the safest investment."
                ],
                type: 'reading'
            }
        ]
    },
    {
        id: 'module-9',
        title: 'Future Finance',
        description: 'Crypto, Prediction Markets, and Alternative Assets.',
        xpReward: 200,
        lessons: [
            {
                id: 'lesson-9-1',
                title: 'Stocks vs. Real Estate vs. Hard Assets',
                description: 'Where should you put your money?',
                xpReward: 50,
                content: [
                    "**Stocks**: Ownership in companies. High liquidty, high long-term growth, volatile.",
                    "**Real Estate**: Tangible land/buildings. Can use leverage (mortgage). High maintenance costs, hard to sell quickly.",
                    "**Hard Assets** (Gold, Art, Commodities): Physical items with intrinsic value. Often used as a hedge against inflation. Usually don't produce cash flow (dividends/rent)."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-9-2',
                title: 'Cryptocurrency: Digital Gold?',
                description: 'Understanding Bitcoin and the Blockchain.',
                xpReward: 50,
                content: [
                    "**Cryptocurrency** (like Bitcoin) is digital money that isn't controlled by any government.",
                    "It runs on **Blockchain** technology—a public ledger that everyone can see but no one can cheat.",
                    "Pro tip: If you buy crypto, you need a **Wallet**. Remember: 'Not your keys, not your coins'. If you don't control the private keys, you don't truly own the assets.",
                    "Proponents call Bitcoin 'Digital Gold' because it has a fixed supply.",
                    "Risks: Extremely volatile, regulatory uncertainty, and irreversible transactions."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-9-3',
                title: 'Prediction Markets',
                description: 'Betting on the future.',
                xpReward: 50,
                content: [
                    "**Prediction Markets** let people bet on the outcome of real-world events (elections, sports, scientific breakthroughs).",
                    "The price of a 'share' (e.g., 60 cents) represents the market's estimated probability (60%) of that event happening.",
                    "Many economists believe these markets are more accurate than polls or experts because participants have 'skin in the game'.",
                    "It's a way to use the 'Wisdom of the Crowd' to forecast the future."
                ],
                type: 'reading'
            }
        ]
    }
];
