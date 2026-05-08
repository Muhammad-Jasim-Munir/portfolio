const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

router.post('/login',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (!user || !(await user.matchPassword(req.body.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({
        token: sign(user._id),
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (e) { next(e); }
  }
);

router.get('/me', protect, (req, res) => res.json(req.user));

module.exports = router;
