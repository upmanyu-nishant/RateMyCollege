import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null); // Holds the user data (null if not logged in)
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/search');
    
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/search" className="nav-link">
          Search
        </Link>
        <Link to="/compare" className="nav-link">
          Compare
        </Link>
        <Link to="/about" className="nav-link">
        About
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-dropdown" onMouseLeave={closeDropdown}>
            <button className="user-button" onClick={toggleDropdown}>
              Hi, {user.name.split(' ')[0] || 'User'}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => navigate('/user/profile')}
                >
                  View Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigate('/user/ratings')}
                >
                  Ratings
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
