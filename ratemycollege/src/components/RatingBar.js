import React, { useState } from 'react';
import '../styles/RatingBar.css';

const RatingBar = ({ category, value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const labels = ['1 - Awful', '2 - Poor', '3 - Okay', '4 - Great', '5 - Awesome'];
  const colors = ['#f87171', '#fbbf24', '#facc15', '#4ade80', '#22c55e'];

  const handleMouseEnter = (index) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (index) => {
    onChange(index + 1); // Convert to 1-based index
  };

  return (
    <div className="rating-bar-container">
      <div className="rating-bar-header">
        <span className="category-title">{category}</span>
        <span className="selected-value">{value ? `${value} / 5` : ''}</span>
      </div>
      <div className="rating-bar">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`bar-segment ${hoverValue > index || value > index ? 'filled' : ''}`}
            style={{
              backgroundColor: hoverValue > index ? colors[index] : value > index ? colors[index] : '#e5e7eb',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            title={label}
          />
        ))}
      </div>
      <div className={`center-label ${hoverValue ? 'visible' : ''}`}>
        {hoverValue ? labels[hoverValue - 1] : ''}
      </div>
    </div>
  );
};

export default RatingBar;
