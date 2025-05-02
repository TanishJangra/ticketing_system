import express from "express";
import { getProfile, updateProfile, addTeamMember, getTeamMembers, updateTeamMember, removeTeamMember } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/team', protect, addTeamMember);
router.get('/team', protect, getTeamMembers);
router.put('/team/:memberId', protect, updateTeamMember);
router.delete('/team/:memberId', protect, removeTeamMember); 

export default router;