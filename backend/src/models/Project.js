const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description: String,
  longDescription: String,
  technologies: [String],
  category: String,
  github: String,
  liveUrl: String,
  images: [String],
  cover: String,
  featured: { type: Boolean, default: false },
  completedAt: Date,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
