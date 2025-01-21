import axios from 'axios';
// Base URLs
const BASE_URL = process.env.REACT_APP_API_URL;

console.log(BASE_URL);
// **Helper function for handling errors**
const handleApiError = (error, message) => {
  console.error(`${message}:`, error);
  throw new Error(message);
};

// **Helper function to get token**
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

// **Add Authorization Header**
const authHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
// **Check if user exists**
export const checkUserExists = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/${email}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // User does not exist
    }
    return handleApiError(error, `Error checking user existence for ${email}`);
  }
};

export const authenticateUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/authenticate`, userData);
    return response.data; // Returns JWT token and additional data
  } catch (error) {
    return handleApiError(error, 'Error authenticating user');
  }
};


// **Fetch list of colleges**
export const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/colleges`);
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
    const response = await axios.get(
      `${BASE_URL}/api/colleges/search`,
      {
        params: {
          name: name || undefined, // Only include if not empty
          location: location || undefined, // Only include if not empty
        },
      }
    );
    console.log("response.data",response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error searching colleges');
  }
};

// **Fetch college details by ID**
export const fetchCollegeById = async (collegeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/colleges/${collegeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching college with ID ${collegeId}`);
  }
};

// **Submit a review**
export const submitReview = async (collegeId, reviewData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ratingCards`,
      { collegeId, ...reviewData },
      { headers: authHeaders() }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error submitting review for college ID ${collegeId}`);
  }
};

// **Fetch reviews for a college**
export const fetchReviewsByCollegeId = async (collegeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/ratingCards/college/${collegeId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching reviews for college ID ${collegeId}`);
  }
};

export const fetchReviewsByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/ratingCards/email/${email}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching reviews for email ${email}`);
  }
};

// **Add a new college**
export const addCollege = async (collegeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/colleges`, collegeData, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Error adding a new college');
  }
};

// **Delete a college**
export const deleteCollegeById = async (collegeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/colleges/${collegeId}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting college with ID ${collegeId}`);
  }
};

// **Update a college**
export const updateCollegeFields = async (collegeId, updateFields) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/colleges/${collegeId}`, updateFields, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating college with ID ${collegeId}`);
  }
};


// **Update a review**
export const updateReview = async (reviewId, updatedReviewData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/ratingCards/${reviewId}`, updatedReviewData, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating review with ID ${reviewId}`);
  }
};

// **Delete a review**
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/ratingCards/${reviewId}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting review with ID ${reviewId}`);
  }
};
