const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: String,
  startYear: String,
  endYear: String,
  coursework: [String],
  description: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
