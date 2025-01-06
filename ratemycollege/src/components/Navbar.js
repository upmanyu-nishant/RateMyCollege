import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ccc' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
