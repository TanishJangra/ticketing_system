import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },

  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },

  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, 'Please add a password']
  },

  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'admin'
  },
  
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;