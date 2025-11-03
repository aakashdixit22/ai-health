import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoadedConversations, setHasLoadedConversations] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';
  const AI_API_URL = 'http://localhost:5001';

  // Helper function for API calls
  const apiCall = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error('API call timed out:', endpoint);
        throw new Error('Request timed out. Please try again.');
      } else {
        console.error('API call error:', error);
        throw error;
      }
    }
  };

  // Load conversations (only once or when explicitly refreshed)
  const loadConversations = async (forceRefresh = false) => {
    if (!isAuthenticated || (!forceRefresh && hasLoadedConversations)) return;
    
    try {
      setLoading(true);
      const data = await apiCall('/conversations');
      setConversations(data.conversations || []);
      setHasLoadedConversations(true);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load conversation details with chat history
  const loadConversationDetails = async (conversationId) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const data = await apiCall(`/conversations/${conversationId}`);
      setCurrentConversation(data.conversation);
      setChatHistory(data.chats || []);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load conversation details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new conversation
  const createConversation = async (title = 'New Conversation') => {
    if (!isAuthenticated) return null;
    
    try {
      setLoading(true);
      const data = await apiCall('/conversations', {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
      
      // Add new conversation to the list
      setConversations(prev => [data.conversation, ...prev]);
      return data.conversation;
    } catch (error) {
      setError(error.message);
      console.error('Failed to create conversation:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Send message to current conversation
  const sendMessage = async (message, messageType = 'text', fileInfo = null) => {
    if (!isAuthenticated || !currentConversation) return null;
    
    try {
      setLoading(true);
      
      // Add message to backend
      const chatData = await apiCall(`/conversations/${currentConversation.id}/chats`, {
        method: 'POST',
        body: JSON.stringify({ message, messageType, fileInfo }),
      });

      // Add user message to chat history immediately
      const newChat = chatData.chat;
      setChatHistory(prev => [...prev, newChat]);

      // Get AI response with chat history context
      const aiResponse = await getAIResponse(message, chatHistory, messageType, fileInfo);
      
      if (aiResponse) {
        // Update the chat with AI response
        await apiCall(
          `/conversations/${currentConversation.id}/chats/${newChat.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              response: aiResponse.response,
              processingTime: aiResponse.processing_time
            }),
          }
        );

        // Update chat history with AI response
        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === newChat.id
              ? { ...chat, response: aiResponse.response, isProcessed: true }
              : chat
          )
        );
      }

      return newChat;
    } catch (error) {
      setError(error.message);
      console.error('Failed to send message:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get AI response from Flask API
  const getAIResponse = async (message, history = [], messageType = 'text', fileInfo = null) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      if (messageType === 'file' && fileInfo) {
        // For file uploads, we need to handle differently
        // This would be called from a file upload handler
        clearTimeout(timeoutId);
        return await getAIResponseFromFile(fileInfo, history);
      } else {
        // For text messages
        const response = await fetch(`${AI_API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            history: history.map(chat => ({
              message: chat.message,
              response: chat.response
            }))
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('AI API request failed');
        }

        return await response.json();
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error('AI API request timed out');
        throw new Error('AI request timed out. Please try again.');
      } else {
        console.error('AI API error:', error);
        throw error;
      }
    }
  };

  // Get AI response from file upload
  const getAIResponseFromFile = async (file, history = []) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('history', JSON.stringify(
        history.map(chat => ({
          message: chat.message,
          response: chat.response
        }))
      ));

      const response = await fetch(`${AI_API_URL}/analyze-file`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('File analysis failed');
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error('File analysis request timed out');
        throw new Error('File analysis timed out. Please try again.');
      } else {
        console.error('File analysis error:', error);
        throw error;
      }
    }
  };

  // Upload file and send message
  const uploadFileAndSendMessage = async (file) => {
    if (!isAuthenticated || !currentConversation) return null;

    try {
      setLoading(true);
      
      // Get AI response from file first
      const aiResponse = await getAIResponseFromFile(file, chatHistory);
      
      const fileInfo = {
        filename: file.name,
        originalName: file.name,
        size: file.size,
        mimetype: file.type
      };

      // Send message with file info and AI response
      const message = `Uploaded file: ${file.name}`;
      const chatData = await apiCall(`/conversations/${currentConversation.id}/chats`, {
        method: 'POST',
        body: JSON.stringify({ 
          message, 
          messageType: 'file', 
          fileInfo 
        }),
      });

      // Add user message to chat history
      const newChat = chatData.chat;
      setChatHistory(prev => [...prev, newChat]);

      // Update the chat with AI response
      await apiCall(
        `/conversations/${currentConversation.id}/chats/${newChat.id}`, 
        {
          method: 'PUT',
          body: JSON.stringify({ 
            response: aiResponse.response, 
            processingTime: aiResponse.processing_time 
          }),
        }
      );

      // Update chat history with AI response
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === newChat.id 
            ? { ...chat, response: aiResponse.response, isProcessed: true }
            : chat
        )
      );

      return newChat;
    } catch (error) {
      setError(error.message);
      console.error('Failed to upload file and send message:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId) => {
    if (!isAuthenticated) return false;
    
    try {
      await apiCall(`/conversations/${conversationId}`, {
        method: 'DELETE',
      });
      
      // Remove from conversations list
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      // Clear current conversation if it was deleted
      if (currentConversation && currentConversation.id === conversationId) {
        setCurrentConversation(null);
        setChatHistory([]);
      }
      
      return true;
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete conversation:', error);
      return false;
    }
  };

  // Update conversation title
  const updateConversationTitle = async (conversationId, title) => {
    if (!isAuthenticated) return false;
    
    try {
      const data = await apiCall(`/conversations/${conversationId}`, {
        method: 'PUT',
        body: JSON.stringify({ title }),
      });
      
      // Update in conversations list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, title: data.conversation.title }
            : conv
        )
      );
      
      // Update current conversation if needed
      if (currentConversation && currentConversation.id === conversationId) {
        setCurrentConversation(prev => ({ ...prev, title: data.conversation.title }));
      }
      
      return true;
    } catch (error) {
      setError(error.message);
      console.error('Failed to update conversation title:', error);
      return false;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Reset chat state
  const resetChatState = () => {
    setConversations([]);
    setCurrentConversation(null);
    setChatHistory([]);
    setHasLoadedConversations(false);
    setError(null);
  };

  // Load conversations when authenticated
  useEffect(() => {
    if (isAuthenticated && !hasLoadedConversations) {
      loadConversations();
    } else if (!isAuthenticated) {
      resetChatState();
    }
  }, [isAuthenticated]);

  const value = {
    // State
    conversations,
    currentConversation,
    chatHistory,
    loading,
    error,
    hasLoadedConversations,
    
    // Actions
    loadConversations,
    loadConversationDetails,
    createConversation,
    sendMessage,
    uploadFileAndSendMessage,
    deleteConversation,
    updateConversationTitle,
    clearError,
    resetChatState,
    
    // Setters for direct state management if needed
    setCurrentConversation,
    setChatHistory,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};