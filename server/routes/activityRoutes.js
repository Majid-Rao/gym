import express from 'express';
import {
  createUserActivity,
  getUserActivities,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity
} from '../controllers/activityController.js';

const router = express.Router();

// Route to create new user activity
router.post('/insert-act', createUserActivity);

// Route to get all user activities
router.get('/get-act', getUserActivities);

// Route to get user activity by ID
router.get('/getone-act/:id', getUserActivityById);

// Route to update user activity by ID
router.put('/update-act/:id', updateUserActivity);

// Route to delete user activity by ID
router.delete('/delete-act/:id', deleteUserActivity);

export default router;
