import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfessors } from '../services/api';

const ProfessorProfile = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const professors = await fetchProfessors();
      const selectedProfessor = professors.find((p) => p.id === parseInt(id));
      setProfessor(selectedProfessor);
    };

    fetchData();
  }, [id]);

  if (!professor) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{professor.name}</h1>
      <p>Course ID: {professor.courseId}</p>
      <p>Other details about the professor can go here...</p>
    </div>
  );
};

export default ProfessorProfile;
