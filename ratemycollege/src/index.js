import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="742454643027-b1m7g3v9maeu4khm1m81hf84n508el83.apps.googleusercontent.com"> <App /> </GoogleOAuthProvider>
   
);
