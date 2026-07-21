const express = require('express');
const router = express.Router();
const { submitTestQuery, getTestQueries } = require('../controllers/testQuery.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to submit a query
router.post('/', submitTestQuery);

// Private/Admin route to get all queries
router.get('/', protect, admin, getTestQueries);

module.exports = router;
