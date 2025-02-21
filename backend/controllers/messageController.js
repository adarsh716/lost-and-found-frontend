const Message = require('../models/Message');
const PrivateMessage = require('../models/PrivateMessage');

// 1. Create a new community message
exports.createCommunityMessage = async (req, res) => {
  try {
    const { text, image, userId, username } = req.body;

    // Create a new message
    const newMessage = new Message({
      text,
      image,
      userId,
      username,
    });

    // Save message to the database
    const savedMessage = await newMessage.save();

    // Emit the new message via socket for real-time updates (optional)
    // io.emit('newCommunityMessage', savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

// 2. Get all community messages
exports.getCommunityMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Fetch messages, most recent first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

// 3. Create a new private message between two users
exports.createPrivateMessage = async (req, res) => {
  try {
    const { text, image, senderId, senderUsername, recipientId } = req.body;

    // Create a new private message
    const newPrivateMessage = new PrivateMessage({
      text,
      image,
      senderId,
      senderUsername,
      recipientId,
    });

    // Save the private message to the database
    const savedPrivateMessage = await newPrivateMessage.save();

    // Emit the private message via socket (optional)
    // io.to(recipientId).emit('newPrivateMessage', savedPrivateMessage);

    res.status(201).json(savedPrivateMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending private message', error });
  }
};

// 4. Get all private messages between two users
exports.getPrivateMessages = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const { senderId } = req.body; // Assuming senderId is passed in the request body

    // Fetch private messages between the two users
    const messages = await PrivateMessage.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching private messages', error });
  }
};
