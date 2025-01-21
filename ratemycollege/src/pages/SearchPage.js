import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchColleges } from '../services/api';
import '../styles/SearchPage.css';
import Logo from '../assets/logo.png';

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
// eslint-disable-next-line
     const fetchSuggestions = useCallback(
    debounce(async (query, type) => {
      if (query.length > 1) {
        try {
          const results = await searchColleges(query); // API call
          if (type === 'name') {
            setNameSuggestions(results.map((college) => college.name));
          } else if (type === 'location') {
            const uniqueLocations = [...new Set(results.map((college) => college.location))];
            setLocationSuggestions(uniqueLocations);
          }
        } catch (err) {
          console.error('Error fetching suggestions:', err);
        }
      } else {
        if (type === 'name') setNameSuggestions([]);
        if (type === 'location') setLocationSuggestions([]);
      }
    }, 300),
    [] // The dependency array is empty because debounce and searchColleges are static
  );
  

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const results = await searchColleges(query, filterLocation);

      if (results.length === 0) {
        setError('No results found for your search.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('searchResults', JSON.stringify(results));
      setIsLoading(false);
      console.log(results);
      navigate('/results', { state: { results } });
    } catch (err) {
      setError('Something went wrong while fetching results.');
      console.error('Error fetching data:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>
      <div className="search-background-container">
        <div className="search-content">
          <h1 className="search-title">Search for Colleges by Name or Location</h1>
          <form onSubmit={handleSearch} className="search-form">
            {/* Name Input */}
            <div className="input-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Enter college name"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  fetchSuggestions(e.target.value, 'name');
                }}
              />
              {nameSuggestions.length > 0 && (
                <div className="suggestions-container">
                  {nameSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setQuery(suggestion);
                        setNameSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Input */}
            <div className="input-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Filter by location"
                value={filterLocation}
                onChange={(e) => {
                  setFilterLocation(e.target.value);
                  fetchSuggestions(e.target.value, 'location');
                }}
              />
              {locationSuggestions.length > 0 && (
                <div className="suggestions-container">
                  {locationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setFilterLocation(suggestion);
                        setLocationSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="search-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
