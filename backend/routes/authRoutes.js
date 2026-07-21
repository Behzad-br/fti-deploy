const express = require('express');
const router = express.Router();
const { loginUser, getMe, updatePassword, createEmployee, getEmployees, deleteEmployee } = require('../controllers/auth.controller');
const { protect, admin } = require('../middleware/authMiddleware');

// ─────────────────────────────────────────────
//  Auth Routes
// ─────────────────────────────────────────────

router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

router.post('/employees', protect, admin, createEmployee);
router.get('/employees', protect, admin, getEmployees);
router.delete('/employees/:id', protect, admin, deleteEmployee);

module.exports = router;
