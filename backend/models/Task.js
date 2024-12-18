const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  is_completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }  // Add this field
});

module.exports = mongoose.model('Task', taskSchema);
