const { protect, adminOnly } = require('../middleware/auth');

/**
 * crudRouter — generic REST router for a Mongoose model.
 * GET / and GET /:id are public.
 * POST, PUT, DELETE require admin JWT.
 */
module.exports = function crudRouter(Model, { sort = { order: 1, createdAt: -1 } } = {}) {
  const router = require('express').Router();

  router.get('/', async (_req, res, next) => {
    try { res.json(await Model.find().sort(sort)); } catch (e) { next(e); }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc);
    } catch (e) { next(e); }
  });

  router.post('/', protect, adminOnly, async (req, res, next) => {
    try { res.status(201).json(await Model.create(req.body)); } catch (e) { next(e); }
  });

  router.put('/:id', protect, adminOnly, async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json(doc);
    } catch (e) { next(e); }
  });

  router.delete('/:id', protect, adminOnly, async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  return router;
};
