import express from 'express'
import {authenticateToken, isAdmin} from '../middleware/authenticateToken.mjs'

import {
  postStaff,
  getAllStaff,
  deleteStaffbyId
} from '../controller/staffController.mjs'

const router = express.Router();

router.post('/api/staff',authenticateToken, isAdmin, postStaff);
router.get('/api/staff/all', getAllStaff);
router.delete('/api/staff/:id', authenticateToken, isAdmin, deleteStaffbyId);

export default router;