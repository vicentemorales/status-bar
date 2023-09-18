import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [totalValue, setTotalValue] = useState(100);
  const [percent, setPercent] = useState(0);
  const [color, setColor] = useState('rgb(248, 170, 186)'); // Slightly more red blush color

  useEffect(() => {
    const updateProgressBar = () => {
      const newPercent = (currentValue / totalValue) * 100;
      setPercent(newPercent);

      // Calculate color based on the capped green portion
      const cappedPercent = Math.min(100, newPercent);

      // Interpolate between blush (248, 170, 186) and parakeet (86, 188, 118)
      const red = Math.round(248 - (248 - 86) * (cappedPercent / 100));
      const green = Math.round(170 + (188 - 170) * (cappedPercent / 100));
      const blue = Math.round(186 - (186 - 118) * (cappedPercent / 100));
      setColor(`rgb(${red},${green},${blue})`);
    };

    updateProgressBar();
  }, [currentValue, totalValue]);

  const handleCurrentValueChange = (event) => {
    setCurrentValue(parseInt(event.target.value, 10));
  };

  const handleTotalValueChange = (event) => {
    setTotalValue(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>Progress Bar Example</h1>
      <div>
        <label htmlFor="currentValue">Current Value:</label>
        <input
          type="number"
          id="currentValue"
          value={currentValue}
          onChange={handleCurrentValueChange}
        />
      </div>
      <div>
        <label htmlFor="totalValue">Total Value:</label>
        <input
          type="number"
          id="totalValue"
          value={totalValue}
          onChange={handleTotalValueChange}
        />
      </div>
      <div className="progress-container" style={{ width: '300px', border: '1px solid black' }}>
        <div
          className="progress-bar"
          style={{
            width: `${percent > 100 ? 100 : percent}%`,
            backgroundColor: color,
            color: 'black',
            transition: 'background-color 0.3s ease-in-out', // Smooth color transition
          }}
        >
          {percent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default App;
