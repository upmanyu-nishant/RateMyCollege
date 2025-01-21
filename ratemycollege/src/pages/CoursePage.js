import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Hook for navigation
import '../styles/CoursesPage.css';

const CoursesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courses, universityName } = location.state || { courses: [], universityName: '' };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>{universityName} - Courses Offered</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-rating">
                <span className="rating-value">{course.overallRating || 'N/A'}</span>
                <span className="rating-count">{course.ratingCount || 0} ratings</span>
              </div>
              <div className="course-info">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-description">{course.description || 'No description available.'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
