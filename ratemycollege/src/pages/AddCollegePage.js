import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCollege } from '../services/api'; // API to add college
import '../styles/AddCollegePage.css';

const AddCollegePage = () => {
  const [formData, setFormData] = useState({ name: '', location: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await addCollege(formData);
      setSuccessMessage('College added successfully!');
      setFormData({ name: '', location: '', description: '' });
    } catch (err) {
      setErrorMessage('Failed to add college. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="add-college-page">
      <h1 className="add-college-title">Add a New College</h1>
      <form className="add-college-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="College Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="College Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-button">
          Add College
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate('/')} className="back-button">
        Go Back to Search
      </button>
    </div>
  );
};

export default AddCollegePage;
