import { useState, useEffect, useRef } from 'react';
import {
    LineChart,
    Line,
    YAxis,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

// Generate random stock data
// Generate random stock data with an upward trend and 2 corrections
// Generate random stock data with an upward trend and randomized corrections
const generateStockData = (days = 100) => {
    let price = 100;
    const data = [{ day: 0, price: 100 }];

    // Randomize correction periods
    // Correction 1: Somewhere between day 20 and 45
    const correction1Start = Math.floor(Math.random() * 25) + 20;
    const correction1Duration = Math.floor(Math.random() * 10) + 5; // 5-15 days
    const correction1End = correction1Start + correction1Duration;

    // Correction 2: Somewhere between day 60 and 85
    const correction2Start = Math.floor(Math.random() * 25) + 60;
    const correction2Duration = Math.floor(Math.random() * 10) + 5;
    const correction2End = correction2Start + correction2Duration;

    for (let i = 1; i < days; i++) {
        let change = 0;

        // Determine market condition
        if ((i >= correction1Start && i <= correction1End) || (i >= correction2Start && i <= correction2End)) {
            // Correction: Heavy negative bias
            change = (Math.random() * -5); // 0 to -5 drop
        } else {
            // Bull Market: Positive bias
            change = (Math.random() - 0.35) * 3; // Slight upward trend
        }

        price = Math.max(10, price + change);
        data.push({ day: i, price });
    }
    return data;
};

export default function MarketTimer() {
    const [fullData, setFullData] = useState([]);
    const [visibleData, setVisibleData] = useState([{ day: 0, price: 100 }]);
    const [day, setDay] = useState(0);
    const [money, setMoney] = useState(1000); // Cash on hand
    const [shares, setShares] = useState(0); // Shares owned
    const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, invested, finished
    const [message, setMessage] = useState('Can you beat the market?');

    const timerRef = useRef(null);

    // Initialize data on mount
    useEffect(() => {
        setFullData(generateStockData(100));
    }, []);

    const currentPrice = visibleData[visibleData.length - 1]?.price || 100;
    const portfolioValue = money + (shares * currentPrice);

    // Buy & Hold Benchmark
    const initialPrice = fullData[0]?.price || 100;
    const finalPrice = fullData[fullData.length - 1]?.price || 100;
    const buyHoldReturn = ((finalPrice - initialPrice) / initialPrice) * 100;

    const startGame = () => {
        // Generate NEW random data for this game
        const newData = generateStockData(100);
        setFullData(newData);

        setMoney(1000);
        setShares(0);
        setDay(0);
        setVisibleData([{ day: 0, price: 100 }]);
        setGameStatus('playing');
        setMessage('Market is moving! Buy Low, Sell High!');

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setDay(d => {
                if (d >= 99) {
                    clearInterval(timerRef.current);
                    setGameStatus('finished');
                    return d;
                }
                return d + 1;
            });
        }, 100); // New day every 100ms
    };

    useEffect(() => {
        if (gameStatus === 'playing' || gameStatus === 'invested') {
            if (day > 0 && day < 100 && fullData[day]) {
                setVisibleData(prev => [...prev, fullData[day]]);
            }
        }
    }, [day, fullData, gameStatus]);

    useEffect(() => {
        if (gameStatus === 'finished') {
            const myReturn = ((portfolioValue - 1000) / 1000) * 100;
            if (myReturn > buyHoldReturn) {
                setMessage(`Victory! You made ${Math.round(myReturn)}% vs Market's ${Math.round(buyHoldReturn)}%.`);
            } else {
                setMessage(`Game Over. You made ${Math.round(myReturn)}%. Buy & Hold made ${Math.round(buyHoldReturn)}%.`);
            }
        }
    }, [gameStatus, portfolioValue, buyHoldReturn]);

    const buy = () => {
        if (money >= currentPrice) {
            const numShares = Math.floor(money / currentPrice);
            setShares(prev => prev + numShares);
            setMoney(prev => prev - (numShares * currentPrice));
            setGameStatus('invested');
        }
    };

    const sell = () => {
        if (shares > 0) {
            setMoney(prev => prev + (shares * currentPrice));
            setShares(0);
            setGameStatus('playing');
        }
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

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
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Market Timing Challenge</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {message}
            </p>

            {/* Stats Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem 0.9rem', marginBottom: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: 'var(--radius)' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Portfolio Value</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${Math.round(portfolioValue).toLocaleString()}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cash</div>
                    <div>${Math.round(money).toLocaleString()}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shares</div>
                    <div>{shares}</div>
                </div>
            </div>

            {/* Chart */}
            <div style={{ height: 'clamp(200px, 30vh, 280px)', marginBottom: '1rem', minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibleData}>
                        <YAxis domain={['auto', 'auto']} hide />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="var(--secondary)"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                        {gameStatus === 'finished' && (
                            <ReferenceLine y={fullData[0]?.price} stroke="gray" strokeDasharray="3 3" label="Start" />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {gameStatus === 'idle' || gameStatus === 'finished' ? (
                    <button onClick={startGame} className="btn btn-primary" style={{ width: '100%', minHeight: '42px' }}>
                        {gameStatus === 'finished' ? 'Play Again (New Market)' : 'Start Simulation'}
                    </button>
                ) : (
                    <>
                        <button
                            onClick={buy}
                            disabled={shares > 0 || money < currentPrice}
                            className="btn"
                            style={{ flex: 1, minWidth: '140px', backgroundColor: '#10b981', color: 'white', opacity: shares > 0 ? 0.5 : 1 }}
                        >
                            BUY
                        </button>
                        <button
                            onClick={sell}
                            disabled={shares === 0}
                            className="btn"
                            style={{ flex: 1, minWidth: '140px', backgroundColor: '#ef4444', color: 'white', opacity: shares === 0 ? 0.5 : 1 }}
                        >
                            SELL
                        </button>
                    </>
                )}
            </div>

            {gameStatus === 'finished' && (
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    <strong>Lesson:</strong> "Time in the market beats timing the market." It's incredibly hard to predict short-term moves. The winning strategy is usually to buy and hold long-term.
                </div>
            )}
        </div>
    );
}
