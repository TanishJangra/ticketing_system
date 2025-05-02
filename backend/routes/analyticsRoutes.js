import express from 'express';
import {
  getTotalChats,
  getResolvedChats,
  getMissedChats,
  getMissedChatsPerWeek,
  averageReplyTime
} from '../controllers/analyticsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/total-chats', protect, getTotalChats);
router.get('/resolved-chats', protect, getResolvedChats);
router.get('/missed-chats', protect, getMissedChats);
router.get('/missed-chats-per-week', protect, getMissedChatsPerWeek);
router.get('/average-reply-time', protect, averageReplyTime);

export default router;
