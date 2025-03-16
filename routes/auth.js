// //routes/auth.js
// import express from 'express';
// import { refreshToken, auth } from '../controllers/auth.js';

// const router = express.Router();

// router.post('/refresh-token', refreshToken);
// router.post('/signin', auth);

// export default router;

import express from 'express';
import { refreshToken, signin, signup, deactivateAccount } from '../controllers/auth.js';
import authMiddleware from '../middleware/authentication.js';

const router = express.Router();

router.post('/refresh-token', refreshToken);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/deactivate', authMiddleware, deactivateAccount);

export default router;