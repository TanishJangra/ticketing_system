import ChatboxCustomization from '../models/ChatboxCustomization.js';

const initChatboxCustomization = async () => {
  const existing = await ChatboxCustomization.findOne();
  if (!existing) {
    await ChatboxCustomization.create({});
    console.log('✅ Default Chatbox Customization settings initialized.');
  } else {
    console.log('ℹ️ Chatbox Customization already initialized.');
  }
};

export default initChatboxCustomization;
