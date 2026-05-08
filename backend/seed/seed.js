require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const data = require('./data');

const Profile = require('../src/models/Profile');
const Skill = require('../src/models/Skill');
const Project = require('../src/models/Project');
const Experience = require('../src/models/Experience');
const Education = require('../src/models/Education');
const Certification = require('../src/models/Certification');
const User = require('../src/models/User');

(async () => {
  try {
    await connectDB();

    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Certification.deleteMany({}),
    ]);

    await Profile.create(data.profile);
    await Skill.insertMany(data.skills);
    await Project.insertMany(data.projects);
    await Experience.insertMany(data.experience);
    await Education.insertMany(data.education);
    await Certification.insertMany(data.certifications);

    const adminEmail = (process.env.ADMIN_EMAIL || data.profile.email).toLowerCase();
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      await User.create({
        name: data.profile.name,
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
        role: 'admin',
      });
      console.log('Admin user created:', adminEmail);
    } else {
      console.log('Admin user already exists:', adminEmail);
    }

    console.log('✓ Seed complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
