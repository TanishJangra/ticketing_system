import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';
import Ticket from '../models/Ticket.js';

export const addChatMessage = asyncHandler(async (req, res) => {
  const { ticketId, sender, message } = req.body;
  if (!ticketId || !sender || !message) { 
    res.status(400);
    throw new Error('Ticket ID, sender, and message are required');
  }
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }


  const chat = await Chat.create({ ticket: ticket._id, sender, message });

  if ((sender === 'admin' || sender === 'team') && !ticket.firstReplyAt) {
    ticket.firstReplyAt = Date.now();

    const oneHour = 60 * 60 * 1000;
    if (ticket.firstReplyAt - ticket.createdAt > oneHour) {
      ticket.missedChat = true;
    }
    await ticket.save();
  }

  res.status(201).json(chat);
});

export const getChatsByTicket = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ ticket: req.params.ticketId }).sort({ createdAt: 1 });
  res.json(chats);
});
