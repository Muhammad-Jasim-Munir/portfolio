const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  level: { type: Number, min: 0, max: 100, default: 70 },
  icon: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
