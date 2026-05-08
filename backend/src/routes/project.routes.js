module.exports = require('../utils/crudRouter')(require('../models/Project'), { sort: { featured: -1, order: 1, createdAt: -1 } });
