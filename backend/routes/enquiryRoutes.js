const express = require('express');
const router = express.Router();
const { submitEnquiry, getEnquiries } = require('../controllers/enquiry.controller');
const { protect, admin } = require('../middleware/authMiddleware');
const validateResource = require('../middleware/validateResource');
const { formLimiter } = require('../middleware/rateLimiter');
const { submitEnquirySchema } = require('../schemas/enquiry.schema');

// Public route to submit an enquiry
router.post('/', formLimiter, validateResource(submitEnquirySchema), submitEnquiry);

// Private/Admin route to get all enquiries
router.get('/', protect, admin, getEnquiries);

module.exports = router;
