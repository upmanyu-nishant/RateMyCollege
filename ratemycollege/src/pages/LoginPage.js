import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import Logo from '../assets/logo.png';
import { authenticateUser } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential received');
      alert('Login failed.');
      return;
    }

    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log('Decoded Token:', decodedToken);

    const userPayload = {
      email: decodedToken.email,
      googleSubId: decodedToken.sub,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
    };

    try {
      // Authenticate user (backend handles login or registration)
      const authResponse = await authenticateUser(userPayload);

      // Save JWT token and user info in local storage
      localStorage.setItem(
        'user',
        JSON.stringify({ token: authResponse.token, ...decodedToken })
      );

      // Redirect after successful authentication
      navigate('/');
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
    alert('Login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img src={Logo} alt="Rate My College Logo" className="logo-image" />
        <h1 className="website-title">Rate My College</h1>
      </div>
      <div className="login-content">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please log in to continue</p>
        <div className="google-login-wrapper">
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
