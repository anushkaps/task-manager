const express = require('express');
const Project = require('../models/Project');
const Task = require('../models/Task');  // Ensure Task model is included
const router = express.Router();

// Get all projects with associated tasks
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

// Get accepted projects only
router.get('/my-projects', async (req, res) => {
  try {
    const acceptedProjects = await Project.find({ status: 'accepted' }).populate('tasks');
    res.json(acceptedProjects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching accepted projects', error: err.message });
  }
});

// Accept a project (update status to 'accepted') and return associated tasks
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('tasks');
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check if the project is already accepted
    if (project.status === 'accepted') {
      return res.status(400).json({ message: 'Project has already been accepted' });
    }

    project.status = 'accepted';
    await project.save();

    // Optionally, return project with tasks
    res.json({ project, tasks: project.tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error accepting project', error: err.message });
  }
});

// Mark task as completed (update is_completed) and calculate project progress
router.patch('/tasks/:taskId/complete', async (req, res) => {
  try {
    // Find and update task
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.is_completed = true;
    await task.save();

    // Get associated project and calculate progress
    const project = await Project.findById(task.projectId).populate('tasks');
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const completedTasks = project.tasks.filter(task => task.is_completed);
    const progress = (completedTasks.length / project.tasks.length) * 100;

    // Return task completion status and updated project progress
    res.status(200).json({ task, progress });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error: error.message });
  }
});

module.exports = router;
