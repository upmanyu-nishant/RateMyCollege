import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReviewsByEmail, deleteReview, fetchCollegeById } from '../services/api';
import ReviewCard from '../components/ReviewCard';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/RatingsPage.css';

const RatingsPage = () => {
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [collegeDetails, setCollegeDetails] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);

    if (storedUser?.email) {
      fetchReviewsByEmail(storedUser.email).then((fetchedRatings) => {
        // Sort ratings by date (latest first)
        const sortedRatings = fetchedRatings.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRatings(sortedRatings);

        sortedRatings.forEach(async (rating) => {
          const college = await fetchCollegeById(rating.collegeId);
          setCollegeDetails((prev) => ({ ...prev, [rating.collegeId]: college }));
        });
      });
    }
  }, []);

  const handleNavigateToProfile = () => {
    navigate('/user/profile');
  };

  const handleDeleteRating = (ratingId) => {
    setRatingToDelete(ratingId);
    setShowConfirmModal(true);
  };

  const confirmDeleteRating = async () => {
    if (ratingToDelete) {
      await deleteReview(ratingToDelete);
      setRatings((prev) => prev.filter((rating) => rating.id !== ratingToDelete));
      setShowConfirmModal(false);
      setRatingToDelete(null);
    }
  };

  const cancelDeleteRating = () => {
    setShowConfirmModal(false);
    setRatingToDelete(null);
  };

  return (
    <div className="ratings-page-container">
      <h1 className="ratings-page-title">Your Ratings, {user?.given_name || 'User'}!</h1>
      <div className="tabs-container">
        <button className="tab-button" onClick={handleNavigateToProfile}>
          Profile
        </button>
        <button className="tab-button active-tab">Ratings</button>
      </div>

      <div className="ratings-page-ratings-container">
        {ratings.length === 0 ? (
          <p className="ratings-page-no-ratings-message">
            No ratings yet. Start by rating a College!
          </p>
        ) : (
          ratings.map((rating) => (
            <div key={rating.id} className="ratings-page-rating-card">
              <div className="ratings-page-college-header">
                <h3 className="ratings-page-college-name">
                  {collegeDetails[rating.collegeId]?.name || 'College Name'} -{' '}
                  <span className="ratings-page-college-location">
                    {collegeDetails[rating.collegeId]?.location || 'Location'}
                  </span>
                </h3>
              </div>
              <ReviewCard review={rating} />
              <div className="ratings-page-rating-actions">
                <button
                  className="ratings-page-delete-rating-button"
                  onClick={() => handleDeleteRating(rating.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this rating?"
          onConfirm={confirmDeleteRating}
          onCancel={cancelDeleteRating}
        />
      )}
    </div>
  );
};

export default RatingsPage;
