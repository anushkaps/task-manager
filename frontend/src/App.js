// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProgressPage from './pages/ProgressPage';
import ProjectPage from './pages/ProjectPage'; // Add this if you want to show project details
import MyProjects from './components/MyProjects';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />  {/* Project details page */}
      <Route path="/my-projects" element={<MyProjects />} />  {/* Accepted Projects Page */}
    </Routes>
  </Router>
);

export default App;
