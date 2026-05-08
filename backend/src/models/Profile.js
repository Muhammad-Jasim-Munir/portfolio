const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  headline: String,
  location: String,
  email: String,
  phone: String,
  summary: String,
  avatar: String,
  resumeUrl: { type: String, default: '/resume.pdf' },
  socials: {
    github: String,
    linkedin: String,
    twitter: String,
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
