import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import axios from '../services/api';

const TaskProgress = () => {
  const [projects, setProjects] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/projects')
      .then((response) => {
        const acceptedProjects = response.data.filter(project => project.status === 'accepted');
        setProjects(acceptedProjects);

        let totalTasks = 0;
        let completedTasks = 0;
        
        acceptedProjects.forEach(project => {
          totalTasks += project.tasks.length;
          completedTasks += project.tasks.filter(task => task.is_completed).length;
        });

        setProgress((completedTasks / totalTasks) * 100);
      })
      .catch((err) => {
        setError('Failed to fetch projects. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleComplete = (projectId, taskId) => {
    axios.patch(`/tasks/${taskId}/complete`)
      .then((response) => {
        if (response.status === 200) {
          const updatedProjects = projects.map(project => {
            if (project._id === projectId) {
              project.tasks = project.tasks.map(task =>
                task._id === taskId ? { ...task, is_completed: true } : task
              );
            }
            return project;
          });

          setProjects(updatedProjects);

          let totalTasks = 0;
          let completedTasks = 0;

          updatedProjects.forEach(project => {
            totalTasks += project.tasks.length;
            completedTasks += project.tasks.filter(task => task.is_completed).length;
          });

          setProgress((completedTasks / totalTasks) * 100);
        }
      })
      .catch((err) => {
        console.error('Error completing task:', err.response || err.message);
        setError('Failed to complete task. Please try again later.');
      });
  };    

  // if (loading) {
  //   return <div>Loading tasks...</div>;
  // }

  return (
    <div style={{ padding: '10px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Task Progress</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProgressBar progress={progress} />

      {projects.map((project) => (
        <div key={project._id} style={{
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ fontSize: '16px', color: '#007bff' }}>{project.title}</h3>
          <div>
            <h4 style={{ fontSize: '14px', marginTop: '10px' }}>Tasks</h4>
            {project.tasks.map((task) => (
              <div key={task._id} style={{ margin: '10px 0' }}>
                <p style={{ fontSize: '12px' }}>{task.description}</p>
                <button
                  onClick={() => handleComplete(project._id, task._id)}
                  disabled={task.is_completed}
                  style={{
                    backgroundColor: task.is_completed ? '#76c7c0' : '#28a745',
                    color: '#fff',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {task.is_completed ? 'Completed' : 'Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskProgress;
