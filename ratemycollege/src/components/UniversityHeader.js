import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/UniversityHeader.css'; // Import the styles

const UniversityHeader = ({  onRateClick, selectedUniversityData }) => {
  const navigate = useNavigate();

  // Handler for navigating to the courses page
  // const handleViewCourses = () => {
  //   navigate('/courses', { state: { courses, universityName } });
  // };

  // Handler for navigating to the compare page
  const handleCompareClick = () => {
    navigate('/compare', { state: { university: selectedUniversityData } });
  };

  return (
    <div className="university-header">
      <div className="header-content">
        <h1 className="university-name">{selectedUniversityData.name}</h1>
        <p className="location">📍 {selectedUniversityData.location || 'Location not available'}</p>
        <div className="rating-container">
          <span className="review-count">{selectedUniversityData.totalReviews || 0} Ratings</span>
        </div>
        <div className="header-buttons">
          <button className="rate-button" onClick={onRateClick}>
            Rate
          </button>
          <button className="compare-button" onClick={handleCompareClick}>
            Compare
          </button>
        </div>
        {/* <button className="view-courses-button" onClick={handleViewCourses}>
          View All Courses
        </button> */}
      </div>
    </div>
  );
};

export default UniversityHeader;
