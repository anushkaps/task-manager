const Project = require('../models/Project');
const Task = require('../models/Task');

// API to accept a project
exports.acceptProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.status === 'available') {
      project.status = 'accepted';
      await project.save();

      // Fetch all tasks associated with the project
      const tasks = await Task.find({ _id: { $in: project.tasks } });

      res.status(200).json({ project, tasks });
    } else {
      res.status(400).json({ message: 'Project is already accepted or completed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error accepting project', error });
  }
};

// API to mark task as completed
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.is_completed = true;
    await task.save();

    const project = await Project.findById(task.projectId).populate('tasks');
    const completedTasks = project.tasks.filter(task => task.is_completed);
    const progress = (completedTasks.length / project.tasks.length) * 100;

    res.status(200).json({ task, progress });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error });
  }
};
