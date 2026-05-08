const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('message').trim().isLength({ min: 1, max: 2000 }),
  body('subject').optional().isLength({ max: 200 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const msg = await Message.create(req.body);

      // Best-effort email — won't fail the request if SMTP is not configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          });
          await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
            replyTo: req.body.email,
            subject: `[Portfolio] ${req.body.subject || 'New message'}`,
            text: `From: ${req.body.name} <${req.body.email}>\n\n${req.body.message}`,
          });
        } catch (mailErr) { console.warn('Email failed:', mailErr.message); }
      }

      res.status(201).json({ ok: true, id: msg._id });
    } catch (e) { next(e); }
  }
);

router.get('/', protect, adminOnly, async (_req, res, next) => {
  try { res.json(await Message.find().sort({ createdAt: -1 })); } catch (e) { next(e); }
});

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try { await Message.findByIdAndDelete(req.params.id); res.json({ ok: true }); } catch (e) { next(e); }
});

module.exports = router;
