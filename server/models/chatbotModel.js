import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatLog = mongoose.model('ChatLog', chatLogSchema);
export default ChatLog;
