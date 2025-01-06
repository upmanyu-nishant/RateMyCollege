import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import Dashboard from './pages/Dashboard';
import UniversityProfile from './pages/UniveristyProfile';
import CourseProfile from './pages/CourseProfile';
import ProfessorProfile from './pages/ProfessorProfile';
const App = () => {
  return (
 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university/:id" element={<UniversityProfile />} />
        <Route path="/course/:id" element={<CourseProfile />} />
        <Route path="/professor/:id" element={<ProfessorProfile />} />
      </Routes>
    </Router>
    
  );
};

export default App;
