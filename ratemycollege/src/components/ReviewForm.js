import React, { useState } from 'react';
import '../styles/ReviewForm.css';
import RatingBar from './RatingBar';

const ReviewForm = ({ universityId, onReviewSubmit }) => {
  const categories = ['Reputation', 'Location', 'Opportunities', 'Facilities', 'Internet', 'Food', 'Clubs', 'Social', 'Happiness', 'Safety'];
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingRatings = categories.filter((category) => !(ratings[category]));
    if (missingRatings.length > 0) {
      setErrorMessage(`Please provide a rating for all categories.`);
      return;
    }

    const overallRating = Object.values(ratings).reduce((sum, val) => sum + val, 0) / categories.length;

    const reviewData = {
      universityId,
      ...ratings,
      overallrating: parseFloat(overallRating.toFixed(1)),
      comment: comment.trim() || 'No comment provided',
      date: new Date().toISOString(),
    };

    console.log('Review Submitted:', reviewData);
    onReviewSubmit(reviewData);
    setRatings({});
    setComment('');
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Write a Review</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="rating-grid">
        <div className="rating-column">
          {categories.slice(0, 5).map((category) => (
            <div className="rating-row" key={category}>
              <span className="category-label">{category}</span>
              <div className="rating-bar-container">
                <RatingBar
                  value={ratings[category] || 0}
                  onChange={(value) => handleRatingChange(category, value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="rating-column">
          {categories.slice(5).map((category) => (
            <div className="rating-row" key={category}>
              <span className="category-label">{category}</span>
              <div className="rating-bar-container">
                <RatingBar
                  value={ratings[category] || 0}
                  onChange={(value) => handleRatingChange(category, value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add any additional comments..."
        className="comment-box"
      />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
