import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUniversities, fetchCourses, fetchProfessors } from '../services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Filter for type
  const [filterLocation, setFilterLocation] = useState(''); // Filter for location

  useEffect(() => {
    const fetchData = async () => {
      const universities = await fetchUniversities();
      const courses = await fetchCourses();
      const professors = await fetchProfessors();
      setAllData([
        ...universities.map((u) => ({ ...u, type: 'University' })),
        ...courses.map((c) => ({ ...c, type: 'Course' })),
        ...professors.map((p) => ({ ...p, type: 'Professor' })),
      ]);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filteredResults = allData;

    // Apply type filter
    if (filterType !== 'all') {
      filteredResults = filteredResults.filter((item) => item.type === filterType);
    }

    // Apply location filter
    if (filterLocation) {
      filteredResults = filteredResults.filter((item) =>
        item.location?.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    // Apply search query filter
    filteredResults = filteredResults.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div>
      <h1>Search for Colleges, Courses, or Professors</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter your search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="University">Universities</option>
          <option value="Course">Courses</option>
          <option value="Professor">Professors</option>
        </select>
        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <Link to={`/${result.type.toLowerCase()}/${result.id}`}>
              {result.type}: {result.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
