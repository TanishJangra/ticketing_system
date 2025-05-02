import ChatboxCustomization from '../models/ChatboxCustomization.js';

export const getCustomization = async (req, res) => {
  try {
    const settings = await ChatboxCustomization.findOne();
    if (!settings) return res.status(404).json({ message: 'Settings not found.' });

    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateCustomization = async (req, res) => {
  try {
    const {
      headerColor,
      messageBackgroundColor,
      customizedMessages,
      welcomeMessage
    } = req.body;

    let settings = await ChatboxCustomization.findOne();

    if (!settings) {
      settings = new ChatboxCustomization({
        headerColor,
        messageBackgroundColor,
        customizedMessages,
        welcomeMessage,
      });
    } else {
      if (headerColor) settings.headerColor = headerColor;
      if(headerColor==="white") settings.headerFontColor = "black";
      if (messageBackgroundColor) settings.messageBackgroundColor = messageBackgroundColor;
      if (customizedMessages) settings.customizedMessages = customizedMessages;
      if (welcomeMessage) settings.welcomeMessage = welcomeMessage;
    }

    await settings.save();
    res.status(200).json({ message: 'Chatbox settings updated successfully.', settings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
