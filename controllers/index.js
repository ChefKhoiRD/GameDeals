// Declare router and require express.js
const router = require('express').Router();

// Require our routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use our routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Module export
module.exports = router;