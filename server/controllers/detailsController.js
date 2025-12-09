import { OpenAI } from 'openai';  // OpenAI package ko import kar rahe hain
import Detail from '../models/detailModel.js'; // User model ko import kar rahe hain
import 'dotenv/config.js'

// OpenAI client ka instance create karna
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // .env file se API key fetch kar rahe hain
});

// User data ko receive karne aur AI se diet aur workout plan generate karne ka controller
const generateUserPlan = async (req, res) => {
  const { height, weight, gender, meal_routine, workout_routine, goal } = req.body;

  try {
    // Step 1: User ka data database mein save karna
    const user = new Detail({
      height,
      weight,
      gender,
      meal_routine,
      workout_routine,
      goal
    });

    await user.save(); // User data ko database mein save karte hain

    // Step 2: OpenAI API ke liye prompt create karna (with calories suggestion)
    const openAiPrompt = `
      User details:
      Height: ${height} cm
      Weight: ${weight} kg
      Gender: ${gender}
      Meal routine: ${meal_routine}
      Workout routine: ${workout_routine}
      Goal: ${goal}
      
      Based on the user's goal, generate a detailed diet plan and workout routine. 
      If the goal is "gain", also suggest the number of calories the user should consume to help them gain weight, and provide a caloric surplus diet plan. 
      Additionally, provide a workout routine to build muscle and increase strength.
      If the goal is "lose", suggest the number of calories the user should consume to create a deficit, and provide a weight loss diet plan. 
      Provide a workout routine for fat loss, including cardio and strength exercises.
      
      Make sure to include:
      - Diet plan (calories, meals)
      - Workout plan (types of exercises, repetitions, and sets)
    `;

    // Step 3: OpenAI API ko request bhejna using OpenAI client (using GPT-3.5 Turbo)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Using GPT-3.5 Turbo for this request
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant.'
      }, {
        role: 'user',
        content: openAiPrompt
      }],
      max_tokens: 500 // Tokens ki limit, aap isko adjust kar sakte hain
    });

    // Step 4: AI response ko log karte hain (debugging purpose)
    const aiResponse = response.choices[0].message.content.trim();

    console.log('AI Response:', aiResponse); // Logs the full AI response

    // Step 5: Diet aur workout plan ko user record mein store karna
    user.diet_plan = aiResponse;  // Save the entire response as the diet plan
    user.workout_plan = aiResponse; // Save the entire response as the workout plan
    await user.save(); // Save updated user data with AI plans

    // Step 6: User ko response bhejna (AI response)
    res.status(200).json({
      message: 'User data and plans generated successfully',
      diet_plan: user.diet_plan,
      workout_plan: user.workout_plan
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

export {generateUserPlan};
