const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['available', 'accepted', 'completed'], default: 'available' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]  // Reference to Task model
});

module.exports = mongoose.model('Project', projectSchema);
