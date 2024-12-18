import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects').then((response) => {
      setProjects(response.data.filter(project => project.status !== 'accepted'));
      setAcceptedProjects(response.data.filter(project => project.status === 'accepted'));
    }).catch((err) => {
      console.error('Error fetching projects:', err.response || err.message);
    });
  }, []);

  const handleAccept = (id) => {
    axios.patch(`/projects/${id}`).then((response) => {
      alert('Project accepted!');
      const acceptedProject = response.data;

      setProjects((prev) => prev.filter((project) => project._id !== id));
      setAcceptedProjects((prev) => [...prev, acceptedProject]);
    }).catch((err) => {
      console.error('Error accepting project:', err.response || err.message);
    });
  };

  return (
    <div style={{ padding: '10px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Available Projects</h2>
      {projects.length === 0 ? (
        <p>No pending projects available</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            fontSize: '14px'
          }}>
            <h3 style={{ fontSize: '16px', color: '#007bff' }}>{project.title}</h3>
            <p style={{ fontSize: '12px', color: '#555' }}>{project.description}</p>
            <button
              onClick={() => handleAccept(project._id)}
              disabled={project.status === 'accepted'}
              style={{
                backgroundColor: project.status === 'accepted' ? '#76c7c0' : '#28a745',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {project.status === 'accepted' ? 'Accepted' : 'Accept'}
            </button>
            <div>
              <h4 style={{ fontSize: '14px', marginTop: '10px' }}>Tasks</h4>
              {project.tasks && project.tasks.map((task) => (
                <div key={task._id} style={{ fontSize: '12px' }}>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <h2 style={{ fontSize: '20px', marginTop: '20px' }}>Accepted Projects</h2>
      {acceptedProjects.length === 0 ? (
        <p>No accepted projects yet</p>
      ) : (
        acceptedProjects.map((project) => (
          <div key={project._id} style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            fontSize: '14px'
          }}>
            <h3 style={{ fontSize: '16px', color: '#007bff' }}>{project.title}</h3>
            <p style={{ fontSize: '12px', color: '#555' }}>{project.description}</p>
            <div>
              <h4 style={{ fontSize: '14px', marginTop: '10px' }}>Tasks</h4>
              {project.tasks && project.tasks.map((task) => (
                <div key={task._id} style={{ fontSize: '12px' }}>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
