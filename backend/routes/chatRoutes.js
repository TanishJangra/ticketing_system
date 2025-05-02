// routes/chatRoutes.js
import express from 'express';
import { addChatMessage, getChatsByTicket } from '../controllers/chatController.js';

const router = express.Router();
router.post('/', addChatMessage); 
router.get('/:ticketId', getChatsByTicket);

export default router;
