module.exports = require('../utils/crudRouter')(require('../models/Experience'), { sort: { startDate: -1 } });
