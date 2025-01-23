import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/search');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <img src={Logo} alt="Rate My College Logo" className="hero-logo" />
          <h1 className="hero-title">Empowering Students Through Shared Experiences</h1>
          <p className="hero-subtitle">
            Real voices. Honest reviews. Discover the insights that matter most for your college journey.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>Real Stories, Real Impact</h2>
          <p>
            Students are more than just voices—they’re the experts of their own experiences. Through their stories, they offer
            more than advice; they provide a glimpse into the heart of college life. From academic challenges to personal
            victories, these reviews guide and empower future students like you to make informed decisions.
          </p>
          <h2>Every Journey is Unique</h2>
          <p>
            College is not one-size-fits-all. Whether you prioritize cultural vibrance, athletic opportunities, academic rigor,
            or a supportive community, your ideal environment is out there. Honest, firsthand reviews help you uncover the
            places where you can truly thrive, turning uncertainty into confidence.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>What Makes Us Different</h2>
        <div className="features-grid">
          <div
            className="feature-card clickable"
            onClick={() => navigate('/search')}
          >
            <h3>Search Colleges</h3>
            <p>
              Dive into our database of colleges tailored to your preferences. Explore institutions and discover what makes
              them stand out.
            </p>
          </div>
          <div
            className="feature-card clickable"
            onClick={() => navigate('/compare')}
          >
            <h3>Compare Colleges</h3>
            <p>
              Simplify your decision-making process. Compare colleges side by side to understand how they fit your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Your Future Begins Here</h2>
        <p>
          Take the first step toward building your dream future. Start exploring colleges, reading reviews, and making decisions
          that matter.
        </p>
        <button className="cta-button large" onClick={handleGetStarted}>
          Start Your Journey
        </button>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
