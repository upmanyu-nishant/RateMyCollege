import React, { useState, useEffect } from 'react';
import '../styles/ReviewForm.css';
import RatingBar from './RatingBar';
import { submitReview } from '../services/api'; // Import the API function

const ReviewForm = ({ universityId, onClose }) => {
  const categories = [
    'reputation',
    'locationRating',
    'opportunities',
    'facilities',
    'internet',
    'food',
    'clubs',
    'social',
    'happiness',
    'safety',
  ];
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState('');
  const [emailId, setEmail] = useState(''); // For user email
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load the user's email ID from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for missing ratings
    const missingRatings = categories.filter((category) => !(ratings[category]));
    if (missingRatings.length > 0) {
      setErrorMessage(`Please provide a rating for all categories.`);
      return;
    }

    const overallRating = Object.values(ratings).reduce((sum, val) => sum + val, 0) / categories.length;

    const reviewData = {
      collegeId: universityId, // Backend expects collegeId
      emailId, // Include user email
      overallRating: parseFloat(overallRating.toFixed(1)),
      comment: comment.trim() || 'No comment provided',
      approved: true,
      date: new Date().toISOString(), // Automatically add the date
      ...ratings, // Include individual category ratings
    };

    try {
      await submitReview(universityId, reviewData); // Send review via API
      setSuccessMessage('Review submitted successfully!');
      setErrorMessage('');
      setRatings({});
      setComment('');

      // Call the `onClose` prop function to hide the form
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setErrorMessage('Failed to submit review. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Write a Review</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="rating-grid">
        <div className="rating-column">
          {categories.slice(0, 5).map((category) => (
            <div className="rating-row" key={category}>
              <span className="category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
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
              <span className="category-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
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
