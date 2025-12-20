import ChatLog from '../models/chatbotModel.js';
import { OpenAI } from 'openai';
import 'dotenv/config.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate AI response based on user input
const generateAIResponse = async (userMessage) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful fitness and gym assistant. You ONLY answer questions related to:
- Gym workouts and exercises
- Fitness routines and training plans
- Diet plans and nutrition
- Weight loss and muscle gain
- Health and wellness related to fitness

If someone asks about anything else (movies, politics, general knowledge, etc.), politely tell them: "Sorry, I can only help with gym, fitness, and diet-related questions. Please ask me something about workouts, nutrition, or health!"

Always be friendly and motivating!`
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I couldn't understand your request.";
  }
};

// Function to store the chat history
const storeChatHistory = async (userId, userMessage, botResponse) => {
  try {
    const chatLog = new ChatLog({
      userId,
      userMessage,
      botResponse
    });

    await chatLog.save();
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

// Controller function to handle user interaction and store chat history
const handleChat = async (req, res) => {
  const { userId, userMessage } = req.body;

  // Generate AI response
  const botResponse = await generateAIResponse(userMessage);

  // Store the chat history in the database
  await storeChatHistory(userId, userMessage, botResponse);

  // Send the response back to the client
  res.json({
    message: 'Chat history saved successfully',
    botResponse,
  });
};

// Controller function to get chat history for a user
const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const chatHistory = await ChatLog.find({ userId }).sort({ createdAt: -1 });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

// Controller function to delete a specific chat
const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    await ChatLog.findByIdAndDelete(chatId);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Error deleting chat" });
  }
};

export { handleChat, getChatHistory, deleteChat };