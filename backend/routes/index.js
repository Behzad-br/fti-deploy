const express = require('express');
const router = express.Router();

// ─────────────────────────────────────────────
//  Parent Router (Mounts all feature routes)
// ─────────────────────────────────────────────

// 1. Auth & Users
router.use('/auth', require('./auth/authRoutes'));

// 2. Modular Pages CMS
router.use('/page', require('./pageRoutes'));

// 2.5 Image Uploads
router.use('/upload', require('./uploadRoutes'));

// 3. Contact Form
router.use('/contact', require('./contact/contactRoutes'));

// 4. Applications (Study Abroad + IELTS)
router.use('/apply', require('./apply/applyRoutes'));

// 5. Free Consultation
router.use('/consultation', require('./consultation/consultationRoutes'));

// 6. Enquiries & Test Queries (from contact forms)
router.use('/enquiries', require('./enquiryRoutes'));
router.use('/test-queries', require('./testQueryRoutes'));

// 7. CMS (Dynamic Pages Content)
router.use('/cms', require('./cms/cmsRoutes'));

// 8. Global Settings
router.use('/settings', require('./settingsRoutes'));

module.exports = router;
