import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm AetherX Assistant. How can I help you today?", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for your interest in AetherX! We're launching soon. Join our waitlist to get early access.",
        "AetherX combines neural architecture with quantum-inspired algorithms for unprecedented AI capabilities.",
        "Have questions about our technology? Feel free to ask, or sign up for our waitlist to stay updated!",
        "Our team is working hard to bring you the future of AI. Stay tuned for our launch!"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { id: Date.now(), text: randomResponse, isBot: true }]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform hover:scale-105"
        data-testid="chatbot-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          data-testid="chatbot-window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-violet-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-syne font-bold text-white">AetherX Assistant</h3>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-4" data-testid="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot
                      ? 'bg-white/5 text-gray-300 rounded-tl-none'
                      : 'bg-cyan-600 text-white rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                data-testid="chatbot-input"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center transition-colors"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
