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
                    "Historically, the stock market has returned about 10% per year on average."
                ],
                type: 'reading'
            },
            {
                id: 'lesson-3-2',
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
                    "PREMIUM: The amount you pay every month, whether you use the insurance or not.",
                    "DEDUCTIBLE: The amount you pay out-of-pocket BEFORE insurance starts covering costs.",
                    "COPAY: A fixed amount you pay for a service (e.g., $20 for a doctor visit).",
                    "OUT-OF-POCKET MAXIMUM: The most you'll ever pay in a year. After this, insurance covers 100%.",
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
                    "WHAT AFFECTS YOUR SCORE:",
                    "• Payment History (35%): Pay bills on time!",
                    "• Credit Utilization (30%): Use less than 30% of your credit limit.",
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
                    "GOOD DEBT makes you money or increases your earning potential.",
                    "• Student loans (if they lead to higher income)",
                    "• Mortgage (you build equity, home may appreciate)",
                    "• Business loan (if the business is profitable)",
                    "",
                    "BAD DEBT costs you money on things that lose value.",
                    "• Credit card debt (high interest, often for consumption)",
                    "• Car loans (cars depreciate rapidly)",
                    "• Payday loans (predatory interest rates)",
                    "",
                    "Rule: Always pay off high-interest debt before investing."
                ],
                type: 'reading'
            }
        ]
    }
];
