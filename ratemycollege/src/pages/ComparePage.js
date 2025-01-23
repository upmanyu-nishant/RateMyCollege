import React, { useState, useCallback } from 'react';
import {  useLocation } from 'react-router-dom';
import { fetchCollegeById, searchColleges } from '../services/api'; // Use searchColleges for search
import '../styles/ComparePage.css';

const categories = [
  { key: 'internet', label: 'Internet' },
  { key: 'safety', label: 'Safety' },
  { key: 'facilities', label: 'Facilities' },
  { key: 'opportunities', label: 'Opportunities' },
  { key: 'locationRating', label: 'Location' },
  { key: 'clubs', label: 'Clubs' },
  { key: 'social', label: 'Social' },
  { key: 'food', label: 'Food' },
];

const getColorForRating = (rating) => {
  if (rating >= 4) return '#22c55e'; // Green
  if (rating >= 3) return '#facc15'; // Yellow
  return '#f87171'; // Red
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ComparePage = () => {
  const location = useLocation();
  const [selectedUniversity, setSelectedUniversity] = useState(location.state?.university || {});
  const [comparedUniversity, setComparedUniversity] = useState(null);
  const [searchQuery1, setSearchQuery1] = useState(selectedUniversity.name || '');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
// eslint-disable-next-line
  const fetchSuggestions = useCallback(
    debounce(async (query, setSuggestions) => {
      if (query.length > 1) {
        try {
          const results = await searchColleges(query); // Fetch universities with the query
          setSuggestions(results.slice(0, 10)); // Show up to 10 suggestions
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleSearchChange1 = (e) => {
    const query = e.target.value.trim();
    setSearchQuery1(query);
    fetchSuggestions(query, setSuggestions1); // Call the debounced function
  };

  const handleSearchChange2 = (e) => {
    const query = e.target.value.trim();
    setSearchQuery2(query);
    fetchSuggestions(query, setSuggestions2); // Call the debounced function
  };

  const handleSelectUniversity1 = async (university) => {
    try {
      const fullData = await fetchCollegeById(university.id); // Fetch detailed data
      setSelectedUniversity(fullData);
      setSearchQuery1(fullData.name);
      setSuggestions1([]);
    } catch (error) {
      console.error('Error fetching selected university:', error);
    }
  };

  const handleSelectUniversity2 = async (university) => {
    try {
      const fullData = await fetchCollegeById(university.id); // Fetch detailed data
      setComparedUniversity(fullData);
      setSearchQuery2(fullData.name);
      setSuggestions2([]);
    } catch (error) {
      console.error('Error fetching compared university:', error);
    }
  };

  const resetComparison = () => {
    setComparedUniversity(null);
    setSearchQuery2('');
  };

  const resetAll = () => {
    setSelectedUniversity({});
    setComparedUniversity(null);
    setSearchQuery1('');
    setSearchQuery2('');
  };

  return (
    <div className="compare-page">
      <h1 className="compare-title">Compare Schools</h1>
      <button className="reset-all-button" onClick={resetAll}>
        Reset All
      </button>
      <div className="compare-cards">
        {/* First University */}
        <div className="university-card">
          <div className="rating-badge" style={{ backgroundColor: getColorForRating(selectedUniversity.overallRating) }}>
            <h2>{selectedUniversity.overallRating?.toFixed(1) || 'N/A'}</h2>
            <p className="rating-label">Overall</p>
            <p className="total-reviews">{selectedUniversity.totalReviews || 0} Ratings</p>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a school..."
              className="search-input"
              value={searchQuery1}
              onChange={handleSearchChange1}
            />
            {suggestions1.length > 0 && (
              <div className="suggestions-container">
                {suggestions1.map((university) => (
                  <div
                    key={university.id}
                    className="suggestion-item"
                    onClick={() => handleSelectUniversity1(university)}
                  >
                    {university.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Second University */}
        <div className="university-card">
          <div className="rating-badge" style={{ backgroundColor: getColorForRating(comparedUniversity?.overallRating || 0) }}>
            <h2>{comparedUniversity?.overallRating?.toFixed(1) || 'N/A'}</h2>
            <p className="rating-label">Overall</p>
            <p className="total-reviews">{comparedUniversity?.totalReviews || 0} Ratings</p>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a school to compare..."
              className="search-input"
              value={searchQuery2}
              onChange={handleSearchChange2}
            />
            {suggestions2.length > 0 && (
              <div className="suggestions-container">
                {suggestions2.map((university) => (
                  <div
                    key={university.id}
                    className="suggestion-item"
                    onClick={() => handleSelectUniversity2(university)}
                  >
                    {university.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {comparedUniversity && (
            <button className="reset-button" onClick={resetComparison}>
              Change College
            </button>
          )}
        </div>
      </div>

      <div className="compare-stats">
  {categories.map(({ key, label }) => (
    <div key={key} className="stat-row">
      
      {/* Left Progress Bar (Selected University) */}
      <div className="left-progress">
        <span className="rating-number">{selectedUniversity[key]?.toFixed(1) || 'N/A'}</span>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(selectedUniversity[key] || 0) / 5 * 100}%`,
              backgroundColor: getColorForRating(selectedUniversity[key] || 0),
            }}
          />
        </div>
      </div>
{/* Category Name Centered */}
<div className="stat-label">{label}</div>

      {/* Right Progress Bar (Compared University) */}
      <div className="right-progress">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(comparedUniversity?.[key] || 0) / 5 * 100}%`,
              backgroundColor: getColorForRating(comparedUniversity?.[key] || 0),
            }}
          />
        </div>
        <span className="rating-number">{comparedUniversity?.[key]?.toFixed(1) || 'N/A'}</span>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ComparePage;
