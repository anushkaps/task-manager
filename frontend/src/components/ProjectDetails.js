import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h2>Project Details for ID: {id}</h2>
      {/* Fetch and display project details using the ID */}
    </div>
  );
};

export default ProjectDetails;
