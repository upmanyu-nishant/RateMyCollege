import React, { useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const results = useMemo(() => {
    return location.state?.results || [];
  }, [location.state]);

  useEffect(() => {
    if (!results.length) {
      navigate('/'); // Redirect if no results
    }
  }, [results, navigate]);
  if (!results.length) {
    return (
      <div className="results-page">
        <h1>Redirecting...</h1>
      </div>
    );
  }

  return (
    <div className="results-page">
      <h1>Search Results</h1>
      <h2>{results.length} colleges found</h2>
      <div className="cards-container">
        {results.map((college) => (
          <Link
            to={`/university/${college.id}`}
            key={college.id}
            className="college-card"
          >
            <div className="card-content">
              <h3 className="college-name">{college.name}</h3>
              <p className="college-location">📍 {college.location || 'N/A'}</p>
              <p className="college-rating">⭐ Overall Rating: {college.overallRating?.toFixed(1) || 'No rating available'}</p>
              <p className="total-reviews">📝 Total Reviews: {college.totalReviews || 0}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
