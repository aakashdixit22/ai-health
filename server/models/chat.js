import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  conversationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Conversation', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  response: { 
    type: String 
  },
  messageType: { 
    type: String, 
    enum: ['text', 'file'],
    default: 'text'
  },
  fileInfo: {
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String
  },
  isProcessed: { 
    type: Boolean, 
    default: false 
  },
  processingTime: { 
    type: Number // in milliseconds
  }
}, { 
  timestamps: true 
});

// Index for better performance
chatSchema.index({ conversationId: 1, createdAt: -1 });
chatSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Chat", chatSchema);