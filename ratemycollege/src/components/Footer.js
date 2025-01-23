import React from 'react';
import '../styles/Footer.css';
import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={Logo} alt="Rate My College Logo" className="footer-logo" />
        <p>Empowering students with knowledge. Building futures with confidence.</p>
        <p>&copy; {new Date().getFullYear()} Rate My College. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
