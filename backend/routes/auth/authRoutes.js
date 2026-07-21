const express = require('express');
const router = express.Router();
const { loginUser, getMe, updatePassword, createEmployee, getEmployees, deleteEmployee } = require('../../controllers/auth.controller');
const { protect, admin } = require('../../middleware/authMiddleware');
const validateResource = require('../../middleware/validateResource');
const { authLimiter } = require('../../middleware/rateLimiter');
const { loginSchema, updatePasswordSchema, createEmployeeSchema } = require('../../schemas/auth.schema');

// ─────────────────────────────────────────────
//  Auth Routes
//  Base: /api/auth
// ─────────────────────────────────────────────

// POST /api/auth/login   — Public
router.post('/login', authLimiter, validateResource(loginSchema), loginUser);

// GET  /api/auth/me      — Private
router.get('/me', protect, getMe);

// PUT  /api/auth/password — Private
router.put('/password', protect, validateResource(updatePasswordSchema), updatePassword);

// POST /api/auth/employee — Private (Admin)
router.post('/employee', protect, admin, authLimiter, validateResource(createEmployeeSchema), createEmployee);

// GET  /api/auth/employees — Private (Admin)
router.get('/employees', protect, admin, getEmployees);

// DELETE /api/auth/employee/:id — Private (Admin)
router.delete('/employee/:id', protect, admin, deleteEmployee);

module.exports = router;
