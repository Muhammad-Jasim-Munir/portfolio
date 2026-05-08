const router = require('express').Router();
const Profile = require('../models/Profile');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', async (_req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (e) { next(e); }
});

router.put('/', protect, adminOnly, async (req, res, next) => {
  try {
    const updated = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.json(updated);
  } catch (e) { next(e); }
});

module.exports = router;
