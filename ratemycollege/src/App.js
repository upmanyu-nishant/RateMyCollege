import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';
import UniversityProfile from './pages/UniveristyProfile';
import UserPage from './pages/UserPage';
import ResultsPage from './pages/ResultsPage';
import ComparePage from './pages/ComparePage';  
import LoginPage from './pages/LoginPage';
import RatingsPage from './pages/RatingsPage';
import AddCollegePage from './pages/AddCollegePage';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login'; // Hide Navbar only for the login page

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Pages with Navbar */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/add/college" element={<AddCollegePage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/university/:id" element={<UniversityProfile />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/user/profile" element={<UserPage />} />
                <Route path="/user/ratings" element={<RatingsPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
