import mongoose from 'mongoose';

const chatboxCustomizationSchema = new mongoose.Schema({
  headerColor: {
    type: String,
    enum: ['white', 'black', '#33475B'],
    default: '#33475B'
  },
  messageBackgroundColor: {
    type: String,
    enum: ['white', 'black', '#d5d6da'],
    default: '#d5d6da'
  },
  customizedMessages: {
    type: [String],
    default: ['How can I help you?', 'Ask me anything!']
  },
  welcomeMessage: {
    type: String,
    default: "Want to chat about Hubly? I'm a chatbot here to help you find your way."
  },
  headerFontColor: {
    type: String,
    default: '#FFFFFF'
  },
  messageFontColor: {
    type: String,
    default: '#000000'
  }
}, { timestamps: true });

const ChatboxCustomization = mongoose.model('ChatboxCustomization', chatboxCustomizationSchema);
export default ChatboxCustomization;
