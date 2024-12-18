import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const MyProjects = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);

  useEffect(() => {
    // Fetch assigned projects
    axios.get('/my-assigned-projects')
      .then(response => setAssignedProjects(response.data))
      .catch(error => console.error("Error fetching assigned projects", error));
  }, []);

  return (
    <div>
      <h1 style={{ color: '#333' }}>My Assigned Projects</h1>
      {assignedProjects.length > 0 ? (
        assignedProjects.map(project => (
          <div key={project.id} style={{
            margin: '20px 0', 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            <p>Progress: {project.progress}%</p>
            <a href={`/project/${project.id}`} style={{ textDecoration: 'none', color: '#007BFF' }}>View Progress</a>
          </div>
        ))
      ) : (
        <p>No assigned projects yet.</p>
      )}
    </div>
  );
};

export default MyProjects;
