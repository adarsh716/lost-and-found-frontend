const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  image: { type: String }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  username: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Message', messageSchema);
