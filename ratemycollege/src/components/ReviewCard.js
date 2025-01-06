import React from 'react';
import '../styles/ReviewCard.css';
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaWifi, FaUtensils, FaUserFriends, FaLaugh, FaShieldAlt, FaBuilding, FaTrophy } from 'react-icons/fa';

const iconsMap = {
  reputation: <FaStar />,
  location: <FaMapMarkerAlt />,
  opportunities: <FaBriefcase />,
  facilities: <FaBuilding />,
  internet: <FaWifi />,
  food: <FaUtensils />,
  clubs: <FaTrophy />,
  social: <FaUserFriends />,
  happiness: <FaLaugh />,
  safety: <FaShieldAlt />,
};

const getColor = (rating) => {
  if (rating >= 4) return '#22c55e'; // Green for high ratings
  if (rating >= 3) return '#facc15'; // Yellow for medium ratings
  return '#f87171'; // Red for low ratings
};

const ReviewCard = ({ review }) => {
  const categories = [
    'reputation',
    'location',
    'opportunities',
    'facilities',
    'internet',
    'food',
    'clubs',
    'social',
    'happiness',
    'safety',
  ];

  const overallRating = review?.overallrating ? review.overallrating.toFixed(1) : 'N/A';
  const formattedDate = review?.date ? new Date(review.date).toLocaleDateString() : 'N/A';

  return (
    <div className="review-card">
      <div className="comment-section">
        <div
          className="overall-rating-badge hide-on-mobile"
          style={{
            backgroundColor: getColor(parseFloat(overallRating) || 0),
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          {overallRating}
        </div>
        <p className="comment-text">{review?.comment || 'No comment provided'}</p>
      </div>

      <div className="ratings-container">
        <div className="ratings-column">
          {categories.slice(0, 5).map((category) => (
            <div key={category} className="rating-row">
              <div className="icon-label">
                <span className="category-icon">{iconsMap[category]}</span>
                <span className="category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </div>
              <div className="rating-bar-container">
                <div
                  className="rating-bar-value"
                  style={{
                    width: `${(review[category] || 0) / 5 * 100}%`,
                    backgroundColor: getColor(review[category] || 0),
                  }}
                />
              </div>
              <span className="rating-text">{review[category]?.toFixed(1) || 'N/A'}</span>
            </div>
          ))}
        </div>

        <div className="ratings-column">
          {categories.slice(5).map((category) => (
            <div key={category} className="rating-row">
              <div className="icon-label">
                <span className="category-icon">{iconsMap[category]}</span>
                <span className="category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </div>
              <div className="rating-bar-container">
                <div
                  className="rating-bar-value"
                  style={{
                    width: `${(review[category] || 0) / 5 * 100}%`,
                    backgroundColor: getColor(review[category] || 0),
                  }}
                />
              </div>
              <span className="rating-text">{review[category]?.toFixed(1) || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <span className="review-date">{formattedDate}</span>
        <div className="feedback-icons">
          <span className="helpful">Helpful 👍</span>
          <span className="not-helpful">Not Helpful 👎</span>
        </div>
        <div className="flag">🚩 Report</div>
      </div>
    </div>
  );
};

export default ReviewCard;
