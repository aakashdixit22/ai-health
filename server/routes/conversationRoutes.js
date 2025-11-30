import express from "express";
import User from "../models/user.js";
import authenticateToken from "../middleware/auth.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all conversations for a user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('conversations');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Filter active conversations and sort by lastMessageAt
    const conversations = user.conversations
      .filter(conv => conv.isActive)
      .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
      .map(conv => ({
        id: conv.conversationId,
        title: conv.title,
        lastMessageAt: conv.lastMessageAt,
        createdAt: conv.createdAt
      }));

    res.json({
      success: true,
      conversations
    });
  } catch (err) {
    console.error('Get conversations error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Create a new conversation
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    const conversationId = uuidv4();
    
    const newConversation = {
      conversationId,
      title: title || "New Conversation",
      chats: [],
      isActive: true,
      lastMessageAt: new Date(),
      createdAt: new Date()
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    user.conversations.push(newConversation);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation: {
        id: conversationId,
        title: newConversation.title,
        createdAt: newConversation.createdAt,
        lastMessageAt: newConversation.lastMessageAt
      }
    });
  } catch (err) {
    console.error('Create conversation error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Get conversation details with chat history
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const conversation = user.conversations.find(
      conv => conv.conversationId === id && conv.isActive
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    // Sort chats by timestamp
    const chats = conversation.chats
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(chat => ({
        id: chat._id,
        message: chat.message,
        response: chat.response,
        messageType: chat.messageType,
        fileInfo: chat.fileInfo,
        isProcessed: chat.isProcessed,
        processingTime: chat.processingTime,
        createdAt: chat.timestamp
      }));

    res.json({
      success: true,
      conversation: {
        id: conversation.conversationId,
        title: conversation.title,
        createdAt: conversation.createdAt,
        lastMessageAt: conversation.lastMessageAt
      },
      chats
    });
  } catch (err) {
    console.error('Get conversation details error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Add a chat message to a conversation
router.post("/:id/chats", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message, messageType = 'text', fileInfo } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Message content is required"
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const conversation = user.conversations.find(
      conv => conv.conversationId === id && conv.isActive
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    // Create new chat message
    const newChat = {
      message: message.trim(),
      sender: "user",
      messageType,
      fileInfo,
      isProcessed: false,
      timestamp: new Date()
    };

    conversation.chats.push(newChat);
    conversation.lastMessageAt = new Date();
    
    await user.save();

    // Get the newly created chat with its ID
    const savedChat = conversation.chats[conversation.chats.length - 1];

    res.status(201).json({
      success: true,
      message: "Message added successfully",
      chat: {
        id: savedChat._id,
        message: savedChat.message,
        messageType: savedChat.messageType,
        fileInfo: savedChat.fileInfo,
        isProcessed: savedChat.isProcessed,
        createdAt: savedChat.timestamp
      }
    });
  } catch (err) {
    console.error('Add chat message error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Update chat with AI response
router.put("/:conversationId/chats/:chatId", authenticateToken, async (req, res) => {
  try {
    const { conversationId, chatId } = req.params;
    const { response, processingTime } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const conversation = user.conversations.find(
      conv => conv.conversationId === conversationId && conv.isActive
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    const chat = conversation.chats.id(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat message not found"
      });
    }

    // Update chat with response
    chat.response = response;
    chat.isProcessed = true;
    chat.processingTime = processingTime;

    await user.save();

    res.json({
      success: true,
      message: "Chat updated with AI response",
      chat: {
        id: chat._id,
        message: chat.message,
        response: chat.response,
        isProcessed: chat.isProcessed,
        processingTime: chat.processingTime,
        createdAt: chat.timestamp
      }
    });
  } catch (err) {
    console.error('Update chat response error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// // Update conversation title
// router.put("/:id", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;

//     if (!title || title.trim() === '') {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required"
//       });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     const conversation = user.conversations.find(
//       conv => conv.conversationId === id && conv.isActive
//     );

//     if (!conversation) {
//       return res.status(404).json({
//         success: false,
//         message: "Conversation not found"
//       });
//     }

//     conversation.title = title.trim();
//     await user.save();

//     res.json({
//       success: true,
//       message: "Conversation updated successfully",
//       conversation: {
//         id: conversation.conversationId,
//         title: conversation.title,
//         lastMessageAt: conversation.lastMessageAt
//       }
//     });
//   } catch (err) {
//     console.error('Update conversation error:', err);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server error" 
//     });
//   }
// });

// Delete a conversation (soft delete)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const conversation = user.conversations.find(
      conv => conv.conversationId === id && conv.isActive
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }

    conversation.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: "Conversation deleted successfully"
    });
  } catch (err) {
    console.error('Delete conversation error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

export default router;