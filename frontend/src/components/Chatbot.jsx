import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send, Loader2, Trash2, Sparkles } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Generate unique session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('aetherx_chat_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('aetherx_chat_session', sessionId);
  }
  return sessionId;
};

// Chatbot Portal - renders directly to document.body to escape all stacking contexts
const ChatbotPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm AetherX Assistant. How can I help you today? Feel free to ask me anything about AetherX!", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getSessionId());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await axios.get(`${API}/chat/history/${sessionId}`);
        if (response.data.history && response.data.history.length > 0) {
          const historyMessages = response.data.history.map((msg, index) => ({
            id: index + 2,
            text: msg.content,
            isBot: msg.role === 'assistant'
          }));
          setMessages(prev => [prev[0], ...historyMessages]);
        }
      } catch (error) {
        console.log('No previous chat history');
      }
    };
    loadHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: userInput
      });
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: response.data.response, 
        isBot: true 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting right now. Please try again or join our waitlist below for updates!", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete(`${API}/chat/history/${sessionId}`);
      setMessages([{
        id: 1,
        text: "Chat cleared! How can I help you today?",
        isBot: true
      }]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  // Using portal to render outside the main app's transform/perspective context
  return (
    <ChatbotPortal>
      {/* Fixed Chatbot Container */}
      <div 
        className="chatbot-fixed-wrapper"
        data-testid="chatbot-container"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2147483647,
          pointerEvents: 'auto'
        }}
      >
        {/* Chat Button - Modern floating design with animations */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`chatbot-toggle-btn ${isOpen ? 'is-open' : ''}`}
          data-testid="chatbot-toggle"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {/* Animated rings */}
          <span className="chatbot-ring chatbot-ring-1" />
          <span className="chatbot-ring chatbot-ring-2" />
          
          {/* Icon container */}
          <span className="chatbot-icon-wrapper">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <MessageCircle className="w-6 h-6 chatbot-icon-main" />
                <Sparkles className="w-3 h-3 chatbot-icon-sparkle" />
              </>
            )}
          </span>
        </button>

        {/* Chat Window with smooth expand animation */}
        <div 
          className={`chatbot-window-container ${isOpen ? 'is-visible' : ''}`}
          data-testid="chatbot-window"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="chatbot-avatar">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-white text-sm">AetherX Assistant</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="chatbot-status-dot" />
                    AI Powered
                  </p>
                </div>
              </div>
              <button
                onClick={clearHistory}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Clear chat"
                data-testid="chatbot-clear"
              >
                <Trash2 className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" data-testid="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`chatbot-message ${
                    msg.isBot ? 'chatbot-message-bot' : 'chatbot-message-user'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="chatbot-message chatbot-message-bot">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about AetherX..."
                disabled={isLoading}
                className="chatbot-input"
                data-testid="chatbot-input"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="chatbot-send-btn"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by AetherX AI
            </p>
          </div>
        </div>
      </div>
    </ChatbotPortal>
  );
};
