const express = require('express');
const router = express.Router();
const {
    submitContact,
    getAllContacts,
    getContactById,
    markContactRead,
    deleteContact,
} = require('../../controllers/contact.controller');
const { protect } = require('../../middleware/authMiddleware');
const validateResource = require('../../middleware/validateResource');
const { formLimiter } = require('../../middleware/rateLimiter');
const { contactSchema, markReadSchema } = require('../../schemas/contact.schema');

// ─────────────────────────────────────────────
//  Contact Routes
//  Base: /api/contact
// ─────────────────────────────────────────────

// POST /api/contact       — Public (Submit form)
router.post('/', formLimiter, validateResource(contactSchema), submitContact);

// GET  /api/contact       — Private (Admin view all)
router.get('/', protect, getAllContacts);

// GET  /api/contact/:id   — Private (Admin view one)
router.get('/:id', protect, getContactById);

// PATCH /api/contact/:id/read — Private (Mark as read/unread)
router.patch('/:id/read', protect, validateResource(markReadSchema), markContactRead);

// DELETE /api/contact/:id — Private (Delete inquiry)
router.delete('/:id', protect, deleteContact);

module.exports = router;
