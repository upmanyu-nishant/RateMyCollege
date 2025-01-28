import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCollegeById, fetchReviewsByCollegeId } from '../services/api'; // Import API functions
import UniversityHeader from '../components/UniversityHeader';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import '../styles/UniversityProfile.css';
import {
  FaStar,
  FaShieldAlt,
  FaSmile,
  FaBuilding,
  FaUserFriends,
  FaNetworkWired,
  FaUtensils,
  FaMapMarkerAlt,
  FaTrophy,
  FaWifi,
} from 'react-icons/fa';

const getColorForRating = (rating) => {
  if (rating >= 4) return '#22c55e'; // Green for high ratings (4 and above)
  if (rating >= 3) return '#facc15'; // Yellow for medium ratings (3 to 3.9)
  return '#f87171'; // Red for low ratings (below 3)
};

const categoryIcons = {
  reputation: <FaStar />,
  safety: <FaShieldAlt />,
  happiness: <FaSmile />,
  facilities: <FaBuilding />,
  clubs: <FaTrophy />,
  social: <FaUserFriends />,
  opportunities: <FaNetworkWired />,
  locationRating: <FaMapMarkerAlt />,
  internet: <FaWifi />,
  food: <FaUtensils />,
};

const UniversityProfile = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(4);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const [thankYouMessageVisible, setThankYouMessageVisible] = useState(false);

  const reviewFormRef = useRef(null); // Ref for the review form

  // Fetch university data and reviews
  useEffect(() => {
    const getUniversityData = async () => {
      try {
        const universityData = await fetchCollegeById(id); // Fetch university details
        const reviewsData = await fetchReviewsByCollegeId(id); // Fetch reviews for the university

        // Sort reviews by date (latest first)
        const sortedReviews = reviewsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setUniversity(universityData);
        setReviews(sortedReviews);
      } catch (error) {
        setUniversity(null);
      }
    };

    getUniversityData();
  }, [id]);

  const handleRateClick = () => {
    setShowReviewForm(true);
    // Scroll to the review form
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Delay to ensure form is visible when scrolling
  };

  const handleSeeMore = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 4);
  };

  const toggleRatingsView = () => {
    setShowAllRatings((prev) => !prev);
  };

  if (!university) return <p>Loading...</p>;

  const highestRated = Object.entries(university)
    .filter(([key]) =>
      ['reputation', 'safety', 'happiness', 'facilities', 'clubs', 'social', 'opportunities', 'locationRating', 'internet', 'food'].includes(key)
    )
    .reduce((max, [key, value]) => (value > max.value ? { category: key, value } : max), { category: '', value: 0 });

  const lowestRated = Object.entries(university)
    .filter(([key]) =>
      ['reputation', 'safety', 'happiness', 'facilities', 'clubs', 'social', 'opportunities', 'locationRating', 'internet', 'food'].includes(key)
    )
    .reduce((min, [key, value]) => (value < min.value ? { category: key, value } : min), { category: '', value: 5 });

  return (
    <div className="university-profile">
      <UniversityHeader
        selectedUniversityData={university}
        universityName={university.name}
        location={university.location}
        overallRating={university.overallRating}
        onRateClick={handleRateClick}
        totalReviews={university.totalReviews}
      />

      <div className="profile-container">
        <div className="overall-rating-container">
          <span
            className="overall-rating-badge"
            style={{
              backgroundColor: getColorForRating(university.overallRating),
              color: '#fff',
            }}
          >
            {university.overallRating.toFixed(1)}
          </span>
          <p className="overall-rating-label">Overall Quality</p>
        </div>

        <h3>Cumulative Ratings</h3>
        <div className="overall-section">
          <div className="rating-section">
            <div className="highest-lowest-container">
              <div className="cumulative-rating">
                <span className="category-name">Highest Rated:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {categoryIcons[highestRated.category]} <span>{highestRated.category.toUpperCase()}</span>
                  <span
                    className="rating-badge"
                    style={{ backgroundColor: getColorForRating(highestRated.value) }}
                  >
                    {highestRated.value.toFixed(1)} stars
                  </span>
                </div>
              </div>
              <div className="cumulative-rating">
                <span className="category-name">Lowest Rated:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {categoryIcons[lowestRated.category]} <span>{lowestRated.category.toUpperCase()}</span>
                  <span
                    className="rating-badge"
                    style={{ backgroundColor: getColorForRating(lowestRated.value) }}
                  >
                    {lowestRated.value.toFixed(1)} stars
                  </span>
                </div>
              </div>
            </div>
            <button className="toggle-button" onClick={toggleRatingsView}>
              {showAllRatings ? 'Hide All' : 'Show All'}
            </button>
          </div>
        </div>

        {showAllRatings && (
          <div className="ratings-wrapper">
            {Object.entries(university)
              .filter(([key]) =>
                ['reputation', 'safety', 'happiness', 'facilities', 'clubs', 'social', 'opportunities', 'locationRating', 'internet', 'food'].includes(key)
              )
              .map(([category, average]) => (
                <div key={category} className="cumulative-rating">
                  <span className="category-name">
                    {categoryIcons[category]} {category.toUpperCase()}:
                  </span>
                  <span
                    className="rating-badge"
                    style={{ backgroundColor: getColorForRating(average) }}
                  >
                    {average.toFixed(1)} stars
                  </span>
                </div>
              ))}
          </div>
        )}

        {thankYouMessageVisible && (
          <div className="thank-you-message">
            <h3>🎉 Thank you for your review!</h3>
            <p>Your feedback helps others make informed decisions.</p>
          </div>
        )}

        {showReviewForm && (
          <div ref={reviewFormRef}>
            <ReviewForm
              universityId={university.id}
              onClose={() => {
                setShowReviewForm(false);
                setThankYouMessageVisible(true);
                setTimeout(() => setThankYouMessageVisible(false), 4000);
              }}
            />
          </div>
        )}

        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          <div>
            {reviews.slice(0, visibleReviewsCount).map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        )}
        {visibleReviewsCount < reviews.length && (
          <button className="see-more-button" onClick={handleSeeMore}>
            See More Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default UniversityProfile;
