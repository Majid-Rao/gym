import React, { useState, useEffect, useRef } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { RingLoader } from 'react-spinners';
import { useAuth } from "../../../contexts/AuthContext";

const AiChatbot = () => {
  const { UserData } = useAuth();
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);


  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getchat/${UserData._id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedChats = [];
          data.forEach(chat => {
            // Add user message
            if (chat.userMessage) {
              formattedChats.push({
                _id: `${chat._id}_user`,
                sender: 'user',
                message: chat.userMessage,
                createdAt: chat.createdAt
              });
            }
            // Add bot response
            if (chat.botResponse) {
              formattedChats.push({
                _id: `${chat._id}_bot`,
                sender: 'ai',
                message: chat.botResponse,
                createdAt: chat.createdAt,
                originalId: chat._id // For deletion
              });
            }
          });
          setChatHistory(formattedChats);
        } else {
          setChatHistory([]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setChatHistory([]);
      }
    };

    if (UserData && UserData._id) {
      fetchChatHistory();
    }
  }, [UserData?._id]);

  // Handle user message submission
  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setLoading(true);

      // Temporarily add user message to UI
      const tempUserMessage = { 
        sender: 'user',
        message: userMessage,
        _id: Date.now().toString()
      };
      
      setChatHistory(prev => [...prev, tempUserMessage]);
      const currentMessage = userMessage;
      setUserMessage('');

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: UserData._id, 
            userMessage: currentMessage 
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        const aiMessage = {
          sender: 'ai',
          message: data.botResponse || data.response || data.message || 'No response',
          _id: `${data._id}_bot` || Date.now().toString(),
          originalId: data._id
        };

        setChatHistory(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        setChatHistory(prev => [...prev, {
          sender: 'ai',
          message: 'Sorry, something went wrong. Please try again.',
          _id: Date.now().toString()
        }]);
      }

      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  // Delete a specific chat
  const handleDeleteChat = async (chatId) => {
    try {
      // Get the original ID (remove _user or _bot suffix)
      const originalId = chatId.includes('_') ? chatId.split('_')[0] : chatId;
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/deletechat/${originalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      // Remove both user and bot messages with this ID from UI
      setChatHistory(prevHistory => 
        prevHistory.filter(chat => !chat._id.startsWith(originalId))
      );
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert('Unable to delete chat. Please try again.');
    }
  };

  // Determine if message is from user or AI
  const isUserMessage = (chat) => {
    return chat.sender === 'user' || 
           chat.type === 'user' || 
           chat.role === 'user' ||
           chat.from === 'user';
  };

  return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        {/* Background */}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        
        <Sidebar />
        
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='AI Chatbot' />
          
          <main className='h-[calc(100vh-80px)] flex items-center justify-center px-4 py-6'>
            {/* Chat Container - Centered and larger */}
            <div className="w-full max-w-4xl h-full max-h-[700px] flex flex-col bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white">AI Fitness Assistant 💪</h2>
                <p className="text-sm text-gray-400">Ask me about gym, fitness, workouts & diet plans only!</p>
              </div>

              {/* Info Banner - YE NEW HAI */}
              <div className="bg-blue-600/20 border-l-4 border-blue-500 px-6 py-3">
                <p className="text-sm text-blue-300">
                  ℹ️ <span className="font-semibold">Note:</span> I can only help with gym, fitness, workouts, nutrition, and diet-related questions.
                </p>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <p className="text-lg">No messages yet</p>
                    <p className="text-sm mt-2">Ask me about workouts, diet plans, or fitness tips!</p>
                  </div>
                ) : (
                  chatHistory.map((chat) => {
                    const isUser = isUserMessage(chat);
                    return (
                      <div 
                        key={chat._id} 
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] sm:max-w-[60%] p-4 rounded-lg shadow-md ${
                          isUser
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-100'
                        }`}>
                          <p className="break-words whitespace-pre-wrap">
                            {chat.message}
                          </p>
                          {!isUser && (
                            <button
                              onClick={() => handleDeleteChat(chat._id)}
                              className="text-red-400 hover:text-red-300 text-xs mt-3 font-medium transition-colors"
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                
                {/* Loading indicator */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <RingLoader color="#60A5FA" size={24} />
                    </div>
                  </div>
                )}
                
                {/* Auto scroll anchor */}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input Area */}
              <div className="bg-gray-700 px-6 py-4 border-t border-gray-600">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about workouts, diet, or fitness..."
                    className="flex-1 px-5 py-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] flex items-center justify-center"
                    disabled={loading || !userMessage.trim()}
                  >
                    {loading ? (
                      <RingLoader color="#fff" size={20} />
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AiChatbot;