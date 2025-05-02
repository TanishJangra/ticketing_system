import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  ticket:   { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  sender:   { type: String, enum: ['visitor', 'admin', 'team'], required: true },
  message:  { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
