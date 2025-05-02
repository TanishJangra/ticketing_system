import express from 'express';
import { getTeamMembers, addTeamMember, removeTeamMember } from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTeamMembers)
  .post(protect, addTeamMember);

router.route('/:memberId')
  .delete(protect, removeTeamMember);

export default router;
