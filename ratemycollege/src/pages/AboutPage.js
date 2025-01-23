import React from 'react';
import '../styles/AboutPage.css';
import Logo from '../assets/logo.png';
import DeveloperPhoto from '../assets/developer-photo.jpg'; // Add your photo here
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header">
        <img src={Logo} alt="Rate My College Logo" className="header-logo" />
        <h1>About Rate My College</h1>
        <p>
          Welcome to "Rate My College"—your ultimate destination for authentic insights into colleges.  
          We’re here to empower students with real stories, trusted reviews, and all the tools needed to find their perfect academic fit.
        </p>
      </header>

      {/* About Website Section */}
      <section className="about-website">
        <h2>Why Rate My College?</h2>
        <p>
          Choosing the right college is one of the most important decisions a student can make. With so many options and limited
          trustworthy information, it can feel overwhelming. "Rate My College" bridges that gap, providing a platform where
          students can explore genuine reviews, compare institutions, and make data-driven decisions.
        </p>
        <p>
          Whether you’re looking for academic excellence, vibrant campus life, or a balance of both, our mission is to help you
          navigate your journey with confidence and clarity.
        </p>
      </section>

      {/* Developer Section */}
      <section className="developer-section">
        <h2>Meet the Developer</h2>
        <div className="developer-profile">
          <img src={DeveloperPhoto} alt="Nishant Upmanyu" className="developer-photo" />
          <div className="developer-info">
            <p>
              Hi! I’m <strong>Nishant Upmanyu</strong>, the creator of "Rate My College". As a Master’s graduate in Systems and
              Technology from McMaster University, I’ve always been passionate about using technology to solve real-world problems.
            </p>
            <p>
              During my academic journey, I realized how challenging it can be for students to make informed decisions about
              their future. That’s why I built this platform—to simplify the process and provide honest, data-driven insights
              that every student deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Join the Community</h2>
        <p>
          Start your journey by searching for your college. Discover what others have shared and contribute your own
          experiences to help future students.
        </p>
        <button className="cta-button" onClick={() => window.location.href = '/search'}>
          Find Your College
        </button>
      </section>

      {/* Footer Section */}
    <Footer />
    </div>
  );
};

export default AboutPage;
