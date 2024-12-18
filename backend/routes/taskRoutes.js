const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project'); // Ensure you import Project model
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark task as completed (update is_completed)
// Mark task as completed (update is_completed)
router.patch('/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log('Task found:', task);

    // Update the task completion status
    task.is_completed = true;
    await task.save();

    // Find the project associated with the task
    const project = await Project.findById(task.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log('Project found:', project); // Check if project exists

    // Calculate the progress of the project based on completed tasks
    const completedTasks = project.tasks.filter(task => task.is_completed);
    const progress = (completedTasks.length / project.tasks.length) * 100;

    // Send back the updated task and progress
    res.status(200).json({ task, progress });
  } catch (error) {
    console.error('Error completing task:', error.message);
    res.status(500).json({ message: 'Error completing task', error: error.message });
  }
});

module.exports = router;
