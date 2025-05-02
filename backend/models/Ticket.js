import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  visitor:      { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  assignedTo:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status:       { type: String, enum: ['UnResolved', 'Resolved'], default: 'UnResolved' },
  missedChat:   { type: Boolean, default: false },
  firstReplyAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
