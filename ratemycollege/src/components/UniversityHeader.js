import React from 'react';
import '../styles/UniversityHeader.css';

const UniversityHeader = ({ universityName, location, overallRating, onRateClick }) => {
  return (
    <div className="university-header">
      <div className="header-content">
        <span className="location">{location}</span>
        <h1 className="university-name">{universityName}</h1>
        <div className="header-buttons">
          <button className="rate-button" onClick={onRateClick}>
            Rate
          </button>
          <button className="compare-button">Compare</button>
        </div>
        <a href="#professors" className="view-professors-link">
          View all Professors
        </a>
      </div>
    </div>
  );
};

export default UniversityHeader;
