const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    image: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderUsername: { type: String, required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User receiving the message
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('PrivateMessage', privateMessageSchema);
  