import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourses } from '../services/api';

const CourseProfile = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchCourses();
      const selectedCourse = courses.find((c) => c.id === parseInt(id));
      setCourse(selectedCourse);
    };

    fetchData();
  }, [id]);

  if (!course) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{course.name}</h1>
      <p>University ID: {course.universityId}</p>
      <p>Other details about the course can go here...</p>
    </div>
  );
};

export default CourseProfile;
