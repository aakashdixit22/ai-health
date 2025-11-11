import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Send, 
  Plus, 
  Trash2, 
  MessageSquare, 
  FileText, 
  User, 
  Bot,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

function Second() {
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    conversations,
    currentConversation,
    chatHistory,
    loading,
    error,
    loadConversations,
    loadConversationDetails,
    createConversation,
    sendMessage,
    uploadFileAndSendMessage,
    deleteConversation,
    clearError
  } = useChat();

  const [inputText, setInputText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Load conversations on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
    }
  }, [isAuthenticated]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (!currentConversation) {
      // Create new conversation first
      const newConv = await createConversation();
      if (newConv) {
        await loadConversationDetails(newConv.id);
      }
      return;
    }

    if (selectedFile) {
      await uploadFileAndSendMessage(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (inputText.trim()) {
      await sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleCreateNewConversation = async () => {
    const newConv = await createConversation();
    if (newConv) {
      await loadConversationDetails(newConv.id);
    }
  };

  const handleSelectConversation = async (conversation) => {
    await loadConversationDetails(conversation.id);
  };

  const handleDeleteConversation = async (conversationId, e) => {
    e.stopPropagation(); // Prevent triggering the select conversation handler
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(conversationId);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      {/* Mobile Overlay */}
      {showSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed left-0 top-0 w-full max-w-xs md:w-80 h-screen border-r flex flex-col z-40 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Sidebar Header */}
            <div className={`p-3 md:p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className={`text-base md:text-lg font-semibold truncate ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Health Assistant
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  ×
                </button>
              </div>
              
              <button
                onClick={handleCreateNewConversation}
                disabled={loading}
                className={`w-full flex items-center gap-2 p-2.5 md:p-3 rounded-lg font-medium transition-colors text-sm md:text-base ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">New Conversation</span>
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4">
              {error && (
                <div className={`mb-4 p-2.5 md:p-3 rounded-lg border text-sm ${
                  isDarkMode
                    ? 'bg-red-900/20 border-red-800 text-red-300'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm truncate">{error}</span>
                    <button 
                      onClick={clearError}
                      className="ml-auto text-xs underline flex-shrink-0"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`group p-2.5 md:p-3 rounded-lg cursor-pointer transition-colors border ${
                      currentConversation?.id === conversation.id
                        ? isDarkMode
                          ? 'bg-blue-900/30 border-blue-700'
                          : 'bg-blue-50 border-blue-200'
                        : isDarkMode
                          ? 'hover:bg-gray-700 border-transparent'
                          : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-blue-500 flex-shrink-0" />
                          <h3 className={`text-xs md:text-sm font-medium truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {conversation.title}
                          </h3>
                        </div>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {formatTime(conversation.lastMessageAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteConversation(conversation.id, e)}
                        className={`p-1 md:p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex-shrink-0 ${
                          isDarkMode
                            ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300'
                            : 'hover:bg-red-100 text-red-600 hover:text-red-700'
                        }`}
                        title="Delete conversation"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {conversations.length === 0 && !loading && (
                <div className={`text-center py-8 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No conversations yet.</p>
                  <p className="text-xs mt-1">Start a new conversation to begin!</p>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className={`p-3 md:p-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <User className="h-3 w-3 md:h-4 md:w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs md:text-sm font-medium truncate ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user?.name || 'User'}
                  </p>
                  <p className={`text-xs truncate ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        showSidebar ? 'md:ml-80' : 'ml-0'
      }`}>
        {/* Chat Header */}
        <div className={`p-3 md:p-4 border-b flex items-center justify-between relative z-10 ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          {!showSidebar && (
            <button
              onClick={() => setShowSidebar(true)}
              className={`p-1.5 md:p-2 rounded-lg mr-2 md:mr-4 flex-shrink-0 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          )}
          
          <h1 className={`text-base md:text-xl font-semibold truncate ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {currentConversation ? currentConversation.title : 'Select a conversation or start a new one'}
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          {!currentConversation ? (
            <div className={`text-center py-16 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Welcome to your AI Health Assistant</h3>
              <p className="text-sm mb-4">Start a new conversation to get personalized health insights and recommendations.</p>
              <button
                onClick={handleCreateNewConversation}
                disabled={loading}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus className="h-4 w-4" />
                Start New Conversation
              </button>
            </div>
          ) : (
            <>
              {chatHistory.map((chat) => (
                <div key={chat.id} className="space-y-4">
                  {/* User Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 justify-end"
                  >
                    <div className={`max-w-lg p-4 rounded-lg ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {chat.messageType === 'file' && (
                          <FileText className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-80">
                          {formatTime(chat.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{chat.message}</p>
                      {chat.fileInfo && (
                        <div className="mt-2 text-xs opacity-80">
                          📎 {chat.fileInfo.originalName} ({(chat.fileInfo.size / 1024).toFixed(1)} KB)
                        </div>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <User className="h-4 w-4" />
                    </div>
                  </motion.div>

                  {/* AI Response */}
                  {chat.response && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDarkMode ? 'bg-purple-700' : 'bg-purple-100'
                      }`}>
                        <Bot className={`h-4 w-4 ${
                          isDarkMode ? 'text-purple-300' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className={`max-w-lg p-4 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        <div className="text-xs opacity-60 mb-2">
                          AI Assistant
                          {chat.processingTime && (
                            <span className="ml-2">
                              • {chat.processingTime}ms
                            </span>
                          )}
                        </div>
                        <div className={`text-sm markdown-content ${
                          isDarkMode ? 'markdown-dark' : 'markdown-light'
                        }`}>
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Style markdown elements
                              h1: ({children}) => (
                                <h1 className={`text-lg font-bold mb-2 ${
                                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}>{children}</h1>
                              ),
                              h2: ({children}) => (
                                <h2 className={`text-base font-semibold mb-2 ${
                                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}>{children}</h2>
                              ),
                              h3: ({children}) => (
                                <h3 className={`text-sm font-semibold mb-1 ${
                                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                                }`}>{children}</h3>
                              ),
                              p: ({children}) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({children}) => (
                                <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                              ),
                              ol: ({children}) => (
                                <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                              ),
                              li: ({children}) => (
                                <li className="text-sm">{children}</li>
                              ),
                              strong: ({children}) => (
                                <strong className={`font-semibold ${
                                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}>{children}</strong>
                              ),
                              em: ({children}) => (
                                <em className="italic">{children}</em>
                              ),
                              code: ({children}) => (
                                <code className={`px-1 py-0.5 rounded text-xs font-mono ${
                                  isDarkMode 
                                    ? 'bg-gray-800 text-purple-300' 
                                    : 'bg-gray-200 text-purple-600'
                                }`}>{children}</code>
                              ),
                              pre: ({children}) => (
                                <pre className={`p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2 ${
                                  isDarkMode 
                                    ? 'bg-gray-800 text-gray-300' 
                                    : 'bg-gray-200 text-gray-700'
                                }`}>{children}</pre>
                              ),
                              blockquote: ({children}) => (
                                <blockquote className={`border-l-4 pl-3 italic mb-2 ${
                                  isDarkMode 
                                    ? 'border-purple-600 text-gray-400' 
                                    : 'border-purple-400 text-gray-600'
                                }`}>{children}</blockquote>
                              ),
                              table: ({children}) => (
                                <div className="overflow-x-auto mb-2">
                                  <table className={`min-w-full text-sm border ${
                                    isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                  }`}>{children}</table>
                                </div>
                              ),
                              th: ({children}) => (
                                <th className={`px-2 py-1 text-left font-semibold border-b ${
                                  isDarkMode 
                                    ? 'bg-gray-800 border-gray-600 text-gray-200' 
                                    : 'bg-gray-100 border-gray-300 text-gray-800'
                                }`}>{children}</th>
                              ),
                              td: ({children}) => (
                                <td className={`px-2 py-1 border-b ${
                                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                }`}>{children}</td>
                              ),
                              a: ({children, href}) => (
                                <a 
                                  href={href} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`underline hover:no-underline ${
                                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                  }`}
                                >{children}</a>
                              )
                            }}
                          >
                            {chat.response}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Loading indicator for pending response */}
                  {!chat.isProcessed && !chat.response && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDarkMode ? 'bg-purple-700' : 'bg-purple-100'
                      }`}>
                        <Bot className={`h-4 w-4 ${
                          isDarkMode ? 'text-purple-300' : 'text-purple-600'
                        }`} />
                      </div>
                      <div className={`p-4 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        {currentConversation && (
          <div className={`p-3 md:p-4 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            {/* File Selection Display */}
            {selectedFile && (
              <div className={`mb-3 p-2.5 md:p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FileText className="h-3 w-3 md:h-4 md:w-4 text-blue-500 flex-shrink-0" />
                    <span className={`text-xs md:text-sm truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className={`text-xs flex-shrink-0 ml-2 ${
                      isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Input Controls */}
            <div className="flex items-end gap-2 md:gap-3">
              <div className="flex-1">
                <div
                  className={`relative border rounded-lg ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : isDarkMode 
                        ? 'border-gray-600' 
                        : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Describe your symptoms or ask a health question..."
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className={`w-full p-2.5 md:p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm md:text-base ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    rows={window.innerWidth < 768 ? 2 : 3}
                  />
                </div>
              </div>

              <div className="flex gap-1.5 md:gap-2 flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className={`p-2 md:p-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Upload className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={loading || (!inputText.trim() && !selectedFile)}
                  className={`p-2 md:p-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className={`mt-2 text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } hidden md:block`}>
              Press Enter to send, Shift+Enter for new line. Drag & drop files or click upload icon.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Second;
