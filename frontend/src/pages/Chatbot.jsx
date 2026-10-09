import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Namaste! 🙏 I am JusticeBuddy, your legal assistant. Ask me anything about Indian law in English, Tamil, Hindi, Telugu, or Kannada.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/process`, {
        message: input
      });

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        metadata: {
          detected_language: response.data.detected_language,
          intent: response.data.intent,
          source: response.data.source
        },
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        type: 'error',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "How to file RTI?",
    "How to file FIR?",
    "What is bail procedure?",
    "How to get legal aid?",
    "Consumer rights in India"
  ];

  return (
    <div className="min-h-screen pt-10 px-6 flex justify-center">
      <div className="max-w-3xl w-full">
        <div className="card bg-base-200 shadow-xl" style={{ height: '80vh' }}>
          <div className="card-body p-0 flex flex-col h-full">
            <div className="bg-primary text-primary-content p-6 rounded-t-2xl text-center">
              <h1 className="text-3xl font-bold">💬 Legal Assistant</h1>
              <p className="text-sm opacity-90">Ask in English, Tamil, Hindi, Telugu, or Kannada</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat ${msg.type === 'user' ? 'chat-end' : 'chat-start'}`}
                >
                  <div className={`chat-bubble ${
                    msg.type === 'user' 
                      ? 'chat-bubble-primary' 
                      : msg.type === 'error'
                      ? 'chat-bubble-error'
                      : 'chat-bubble-secondary'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.metadata && (
                      <div className="text-xs opacity-70 mt-2">
                        <span>Lang: {msg.metadata.detected_language}</span>
                        {msg.metadata.intent && (
                          <span className="ml-2">• {msg.metadata.intent}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="chat-footer opacity-50 text-xs">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chat chat-start">
                  <div className="chat-bubble">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-6 py-4 bg-base-300 text-center">
                <p className="text-sm font-semibold mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(q)}
                      className="badge badge-outline badge-lg hover:badge-primary cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 bg-base-300 rounded-b-2xl">
              <div className="join w-full flex justify-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your legal question..."
                  className="input input-bordered join-item flex-1 text-center"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="btn btn-primary join-item"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-base-content/60 mt-2 text-center flex items-center justify-center gap-1">
                
                Supports: English, தமிழ், हिंदी, తెలుగు, ಕನ್ನಡ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
