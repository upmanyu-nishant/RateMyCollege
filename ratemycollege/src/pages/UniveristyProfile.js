import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUniversities } from '../services/api';
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
  location: <FaMapMarkerAlt />,
  internet: <FaWifi />,
  food: <FaUtensils />,
};

const UniversityProfile = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cumulativeOverall, setCumulativeOverall] = useState(0);
  const [categoryAverages, setCategoryAverages] = useState({});
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(4);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);

  useEffect(() => {
    const getUniversityData = async () => {
      const data = await fetchUniversities();
      const selectedUniversity = data.find((u) => u.id === parseInt(id));
      setUniversity(selectedUniversity);
      setReviews(selectedUniversity?.reviews || []);
    };

    getUniversityData();
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const overallSum = reviews.reduce((sum, review) => sum + review.overallrating, 0);
      const overallAverage = overallSum / reviews.length;
      setCumulativeOverall(overallAverage.toFixed(1));

      const categories = [
        'reputation',
        'safety',
        'happiness',
        'facilities',
        'clubs',
        'social',
        'opportunities',
        'location',
        'internet',
        'food',
      ];
      const categorySums = categories.reduce((acc, category) => {
        acc[category] = reviews.reduce((sum, review) => sum + (parseFloat(review[category]) || 0), 0);
        return acc;
      }, {});

      const categoryAverages = categories.reduce((acc, category) => {
        acc[category] = reviews.length > 0 ? (categorySums[category] / reviews.length).toFixed(1) : 'N/A';
        return acc;
      }, {});

      setCategoryAverages(categoryAverages);
    } else {
      setCumulativeOverall(0);
      setCategoryAverages({});
    }
  }, [reviews]);

  const handleSeeMore = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 4);
  };

  const handleRateClick = () => {
    setShowReviewForm((prev) => !prev);
  };

  const handleReviewSubmit = (review) => {
    const formattedReview = Object.fromEntries(
      Object.entries(review).map(([key, value]) => [key.toLowerCase(), value])
    );

    const requiredCategories = [
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

    const missingCategories = requiredCategories.filter((category) => !formattedReview[category]);
    if (missingCategories.length > 0) {
      alert(`Please fill in the following categories: ${missingCategories.join(', ')}`);
      return;
    }

    setReviews((prevReviews) => [...prevReviews, formattedReview]);
    setShowReviewForm(false);
  };

  const toggleRatingsView = () => {
    setShowAllRatings((prev) => !prev);
  };

  if (!university) return <p>Loading...</p>;

  const highestRated = Object.entries(categoryAverages).reduce(
    (max, [key, value]) => (parseFloat(value) > parseFloat(max.value) ? { category: key, value } : max),
    { category: '', value: 0 }
  );

  const lowestRated = Object.entries(categoryAverages).reduce(
    (min, [key, value]) => (parseFloat(value) < parseFloat(min.value) ? { category: key, value } : min),
    { category: '', value: 5 }
  );

  return (
    <div className="university-profile">
      <UniversityHeader
        universityName={university.name}
        location={university.location}
        overallRating={parseFloat(cumulativeOverall)}
        onRateClick={handleRateClick}
      />

      <div className="profile-container">
      <div className="overall-rating-container">
  <span
    className="overall-rating-badge"
    style={{
      backgroundColor: getColorForRating(parseFloat(cumulativeOverall)),
      color: '#fff',
    }}
  >
    {cumulativeOverall}
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
                    style={{ backgroundColor: getColorForRating(parseFloat(highestRated.value)) }}
                  >
                    {highestRated.value} stars
                  </span>
                </div>
              </div>
              <div className="cumulative-rating">
                <span className="category-name">Lowest Rated:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {categoryIcons[lowestRated.category]} <span>{lowestRated.category.toUpperCase()}</span>
                  <span
                    className="rating-badge"
                    style={{ backgroundColor: getColorForRating(parseFloat(lowestRated.value)) }}
                  >
                    {lowestRated.value} stars
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
            {Object.entries(categoryAverages).map(([category, average]) => (
              <div key={category} className="cumulative-rating">
                <span className="category-name">
                  {categoryIcons[category]} {category.toUpperCase()}:
                </span>
                <span
                  className="rating-badge"
                  style={{ backgroundColor: getColorForRating(parseFloat(average)) }}
                >
                  {average} stars
                </span>
              </div>
            ))}
          </div>
        )}

        {showReviewForm && <ReviewForm universityId={university.id} onReviewSubmit={handleReviewSubmit} />}

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
