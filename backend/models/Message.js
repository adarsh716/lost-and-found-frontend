const mongoose = require('mongoose');

// Message Schema
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The message text
  image: { type: String }, // URL or file path of the image if uploaded
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  username: { type: String, required: true }, // Username of the sender
  createdAt: { type: Date, default: Date.now }, // Timestamp of the message
});

module.exports = mongoose.model('Message', messageSchema);
