import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch only accepted projects
    axios.get('/projects/my-projects').then((response) => {
      setProjects(response.data);
    }).catch((err) => {
      console.error('Error fetching accepted projects:', err.response || err.message);
    });
  }, []);

  return (
    <div>
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No accepted projects yet</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>
              <h4>Tasks</h4>
              {project.tasks && project.tasks.map((task) => (
                <div key={task._id}>
                  <p>{task.description}</p>
                  <button disabled={task.is_completed}>
                    {task.is_completed ? 'Completed' : 'Complete'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProjects;
