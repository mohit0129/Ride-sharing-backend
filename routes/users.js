// import express from 'express';
// import { 
//   getAllUsers,
//   getUserById,
//   updateUser,
//   updateUserStatus,
//   deleteUser,
//   createUser
// } from '../controllers/users.js';
// import { auth, restrictTo, hasPermission } from '../middleware/authentication.js';

// const router = express.Router();

// // All routes require authentication
// router.use(auth);

// // Admin-only routes
// router.get('/', restrictTo('admin'), getAllUsers);
// router.post('/', restrictTo('admin'), hasPermission('create_user'), createUser);

// // Get and update specific user
// router.get('/:id', restrictTo('admin'), getUserById);
// router.patch('/:id', restrictTo('admin'), hasPermission('update_user'), updateUser);
// router.patch('/:id/status', restrictTo('admin'), hasPermission('update_user_status'), updateUserStatus);
// router.delete('/:id', restrictTo('admin'), hasPermission('delete_user'), deleteUser);

// export default router;