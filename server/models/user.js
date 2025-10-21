import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: String, required: true },
  response: { type: String },
  messageType: { type: String, enum: ['text', 'file'], default: 'text' },
  fileInfo: {
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String
  },
  isProcessed: { type: Boolean, default: false },
  processingTime: { type: Number }, // in milliseconds
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  title: { type: String, default: "New Conversation" },
  chats: [chatSchema],
  isActive: { type: Boolean, default: true },
  lastMessageAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  conversations: [conversationSchema],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
