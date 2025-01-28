import axios from 'axios';

// Base URL
const BASE_URL = process.env.REACT_APP_API_URL;

// **Helper function for handling errors**
const handleApiError = (error, message) => {
  console.error(`${message}:`, error);
  throw new Error(message);
};

// **Helper function to get access token**
const getAuthToken = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  console.log( "getTokens", tokens); // Separate storage for tokens
  return tokens?.accessToken || null;
};

// **Helper function to set tokens**
const setAuthTokens = ({ accessToken, refreshToken }) => {
  const tokens = { accessToken, refreshToken };
  console.log('Setting tokens:', tokens);
  localStorage.setItem('tokens', JSON.stringify(tokens)); // Store tokens separately
};

// **Helper function to refresh access token**
const refreshAccessToken = async () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  if (tokens?.refreshToken) {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
        refreshToken: tokens.refreshToken,
      });

      const { accessToken, refreshToken } = response.data;
      console.log('Refreshed tokens:', { accessToken, refreshToken });
      // Update both tokens in local storage
      setAuthTokens({ accessToken, refreshToken });

      return accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
  } else {
    throw new Error('No refresh token available');
  }
};

// **Axios instance with interceptors**
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAuthToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries
      try {
        const newAccessToken = await refreshAccessToken();

        // Update the Authorization header with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);

        // Clear tokens and redirect to login if refresh fails
        localStorage.removeItem('tokens');
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // Pass other errors
  }
);

// **Authenticate a user (login or register)**
export const authenticateUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/authenticate`, userData);
    const { accessToken, refreshToken } = response.data;

    // Store tokens separately
    setAuthTokens({ accessToken, refreshToken });

    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error authenticating user');
  }
};

// **Fetch list of colleges**
export const fetchUniversities = async () => {
  try {
    const response = await axiosInstance.get('/api/colleges');
    return response.data.map((college) => ({
      id: college.id,
      name: college.name,
      location: college.location,
      overallRating: college.overallRating,
      totalReviews: college.totalReviews,
    }));
  } catch (error) {
    return handleApiError(error, 'Error fetching universities');
  }
};

export const searchColleges = async (name = '', location = '') => {
  try {
    const response = await axiosInstance.get('/api/colleges/search', {
      params: {
        name: name || undefined, // Only include if not empty
        location: location || undefined, // Only include if not empty
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error searching colleges');
  }
};

// **Fetch college details by ID**
export const fetchCollegeById = async (collegeId) => {
  try {
    const response = await axiosInstance.get(`/api/colleges/${collegeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching college with ID ${collegeId}`);
  }
};

// **Submit a review**
export const submitReview = async (collegeId, reviewData) => {
  try {
    const response = await axiosInstance.post('/api/ratingCards', {
      collegeId,
      ...reviewData,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error submitting review for college ID ${collegeId}`);
  }
};

// **Fetch reviews for a college**
export const fetchReviewsByCollegeId = async (collegeId) => {
  try {
    const response = await axiosInstance.get(`/api/ratingCards/college/${collegeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching reviews for college ID ${collegeId}`);
  }
};

export const fetchReviewsByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/api/ratingCards/email/${email}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching reviews for email ${email}`);
  }
};

// **Add a new college**
export const addCollege = async (collegeData) => {
  try {
    const response = await axiosInstance.post('/api/colleges', collegeData);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error adding a new college');
  }
};

// **Delete a college**
export const deleteCollegeById = async (collegeId) => {
  try {
    const response = await axiosInstance.delete(`/api/colleges/${collegeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting college with ID ${collegeId}`);
  }
};

// **Update a college**
export const updateCollegeFields = async (collegeId, updateFields) => {
  try {
    const response = await axiosInstance.patch(`/api/colleges/${collegeId}`, updateFields);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating college with ID ${collegeId}`);
  }
};

// **Update a review**
export const updateReview = async (reviewId, updatedReviewData) => {
  try {
    const response = await axiosInstance.put(`/api/ratingCards/${reviewId}`, updatedReviewData);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating review with ID ${reviewId}`);
  }
};

// **Delete a review**
export const deleteReview = async (reviewId) => {
  try {
    const response = await axiosInstance.delete(`/api/ratingCards/${reviewId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting review with ID ${reviewId}`);
  }
};
