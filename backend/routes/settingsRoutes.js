const express = require('express');
const router = express.Router();
const { getWhatsAppSettings, updateWhatsAppSettings } = require('../controllers/settings.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// Get settings (public so frontend can fetch where to send)
router.get('/whatsapp', getWhatsAppSettings);

// Update settings (admin only)
router.put('/whatsapp', protect, admin, updateWhatsAppSettings);

module.exports = router;
