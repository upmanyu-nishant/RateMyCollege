import React, { useState, useEffect } from 'react';
import '../styles/ReviewForm.css';
import RatingBar from './RatingBar';
import { submitReview } from '../services/api'; // Import the API function
import { useNavigate } from 'react-router-dom'; // For navigation to login

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
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setEmail(user.email);
    } else {
      setErrorMessage('You must be logged in to give a review.');
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page after showing the message
      }, 5000); // Show the message for 3 seconds before redirecting
    }
  }, [navigate]);

  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if already submitting
    if (isSubmitting) return;

    // Set loading state to true
    setIsSubmitting(true);

    // Check for missing ratings
    const missingRatings = categories.filter((category) => !(ratings[category]));
    if (missingRatings.length > 0) {
      setErrorMessage(`Please provide a rating for all categories.`);
      setIsSubmitting(false);
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
    } finally {
      // Reset loading state
      setIsSubmitting(false);
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
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ReviewForm;
