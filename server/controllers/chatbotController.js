import ChatLog from '../models/chatbotModel.js';  // Importing the ChatLog model
import { OpenAI } from 'openai';  // Importing OpenAI to generate bot responses
import 'dotenv/config.js';

// OpenAI client instance (for GPT-3 or GPT-4 model)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate AI response based on user input
const generateAIResponse = async (userMessage) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // You can switch to gpt-4 or any other model
      messages: [{
        role: 'user',
        content: userMessage
      }],
      max_tokens: 150  // Limit the response length
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

    await chatLog.save();  // Saving the chat log in the database
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
    // Fetch chat history for a specific user
    const chatHistory = await ChatLog.find({ userId }).sort({ createdAt: -1 });  // Sort by most recent chat first
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
    // Delete the chat by ID
    await ChatLog.findByIdAndDelete(chatId);
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Error deleting chat" });
  }
};

export { handleChat, getChatHistory, deleteChat };
