require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const skillRoutes = require('./routes/skill.routes');
const projectRoutes = require('./routes/project.routes');
const experienceRoutes = require('./routes/experience.routes');
const educationRoutes = require('./routes/education.routes');
const certificationRoutes = require('./routes/certification.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('tiny'));

const allowed = (process.env.CLIENT_ORIGIN || '*').split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes('*') || allowed.includes(origin)) return cb(null, true);
    cb(new Error('CORS blocked: ' + origin));
  },
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/', (_req, res) => res.json({ ok: true, name: 'Portfolio API' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/contact', contactRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
});
