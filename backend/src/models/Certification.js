const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: String,
  startDate: String,
  endDate: String,
  url: String,
  image: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certification', certSchema);
