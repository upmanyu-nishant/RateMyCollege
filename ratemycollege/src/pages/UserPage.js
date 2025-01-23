import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserPage.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    college: '',
    fieldOfStudy: '',
    graduationYear: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);
    if (storedUser) {
      setFormData({
        firstName: storedUser.given_name || '',
        lastName: storedUser.family_name || '',
        email: storedUser.email || '',
        college: storedUser.college || '',
        fieldOfStudy: storedUser.fieldOfStudy || '',
        graduationYear: storedUser.graduationYear || '',
      });
    }
  }, []);

  const handleNavigateToRatings = () => {
    navigate('/user/ratings'); // Navigate to RatingsPage
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.given_name || '',
      lastName: user?.family_name || '',
      email: user?.email || '',
      college: user?.college || '',
      fieldOfStudy: user?.fieldOfStudy || '',
      graduationYear: user?.graduationYear || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      ...user,
      given_name: formData.firstName,
      family_name: formData.lastName,
      college: formData.college,
      fieldOfStudy: formData.fieldOfStudy,
      graduationYear: formData.graduationYear,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="user-page-container">
      <h1 className="user-page-title">Hey, {formData.firstName || 'User'}!</h1>
      <div className="tabs-container">
        <button className="tab-button active-tab">Profile</button>
        <button className="tab-button" onClick={handleNavigateToRatings}>
          Ratings
        </button>
      </div>

      <div className="profile-tab-content">
        <div className="user-details">
          <div className="user-field">
            <label>First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="user-input"
              />
            ) : (
              <span>{formData.firstName || 'Not Provided'}</span>
            )}
          </div>
          <div className="user-field">
            <label>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="user-input"
              />
            ) : (
              <span>{formData.lastName || 'Not Provided'}</span>
            )}
          </div>
          <div className="user-field">
            <label>Email</label>
            <span>{formData.email || 'Not Provided'}</span>
          </div>
        </div>

        <div className="user-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
