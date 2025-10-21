import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    default: "New Conversation"
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastMessageAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

// Index for better performance
conversationSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Conversation", conversationSchema);