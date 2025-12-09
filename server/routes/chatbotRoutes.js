import express from 'express';
import { handleChat, getChatHistory, deleteChat } from '../controllers/chatbotController.js';  // Importing the controller functions

const router = express.Router();

// Route to handle user chat (POST request)
router.post('/chat', handleChat);  // POST request to /chat endpoint

// Route to get chat history (GET request)
router.get('/getchat/:userId', getChatHistory);  // GET request to fetch chat history by userId

// Route to delete a specific chat (DELETE request)
router.delete('/deletechat/:chatId', deleteChat);  // DELETE request to delete a specific chat by chatId

export default router;
