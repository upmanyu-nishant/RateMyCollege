import axios from 'axios';

// Base URL for the mock API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch a list of universities (use /users as a placeholder for universities)
export const fetchUniversities = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data.map((user) => ({
    id: user.id,
    name: user.name,
    location: user.address.city,
  }));
};

// Fetch a list of courses (use /posts as a placeholder for courses)
export const fetchCourses = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data.map((post) => ({
    id: post.id,
    name: post.title,
    universityId: Math.ceil(post.userId / 2), // Simulate course-university mapping
  }));
};

// Fetch a list of professors (use /comments as a placeholder for professors)
export const fetchProfessors = async () => {
  const response = await axios.get(`${BASE_URL}/comments`);
  return response.data.map((comment) => ({
    id: comment.id,
    name: comment.name,
    courseId: Math.ceil(comment.postId / 2), // Simulate professor-course mapping
  }));
};
