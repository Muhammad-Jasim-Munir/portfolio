const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: String,
  type: { type: String, default: 'Self-Project' },
  startDate: Date,
  endDate: Date,
  current: { type: Boolean, default: false },
  bullets: [String],
  technologies: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', expSchema);
