import express from 'express';
import { register, login, refreshToken } from '../controllers/admin.js';
import adminAuth from '../middleware/admin-auth.js';
import { hasPermission } from '../middleware/admin-auth.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Example of protected admin routes
router.get('/dashboard', adminAuth, (req, res) => {
  res.status(200).json({ message: 'Admin dashboard access granted' });
});

// Example of permission-based route
router.post('/settings', adminAuth, hasPermission('manage'), (req, res) => {
  res.status(200).json({ message: 'Admin settings access granted' });
});

export default router;