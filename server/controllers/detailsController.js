import { OpenAI } from 'openai';
import Detail from '../models/detailModel.js';
import 'dotenv/config.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate user plan and save it in the database
const generateUserPlan = async (req, res) => {
  const { userId,height, weight, age, gender, meal_routine, workout_routine, goal, timeperiod } = req.body;

  try {
    const user = new Detail({
      userId,
      height,
      weight,
      age,
      gender,
      meal_routine,
      workout_routine,
      goal,
      timeperiod
    });

    await user.save(); // Save user data to DB

    let openAiPrompt = `
      User details:
      Height: ${height} cm
      Weight: ${weight} kg
      Age: ${age}
      Gender: ${gender}
      Meal routine: ${meal_routine}
      Workout routine: ${workout_routine}
      Goal: ${goal}
      Time Period: ${timeperiod}

      Based on the user's goal and time period:
      - If the goal is "gain", suggest a caloric surplus diet plan for ${timeperiod}.
      - If the goal is "lose", suggest a caloric deficit diet plan for ${timeperiod}.
      - Provide a detailed workout plan that matches the goal and time period.

      The response should include:
      1. **Diet Plan**: 
         - Caloric count for each meal.
         - Meals for Monday to Sunday (weekly meal plan).
         - Total calories for each day and total weekly calories.
      2. **Workout Plan**: 
         - Detailed workout routine for Monday to Sunday (weekly workout plan).
         - Exercises for each day with sets, reps, and rest times.
         - Any modifications after 1 week, 1 month, or other intervals.
      3. **Guidance**:
         - Provide suggestions for whether to follow the same plan for the entire time period or if changes should be made at specific intervals (e.g., after 1 week, 1 month, etc.).
         - Suggest when to update the workout or diet plan based on progress.
    `;

    // Requesting AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant.'
      }, {
        role: 'user',
        content: openAiPrompt
      }],
      max_tokens: 500
    });

    const aiResponse = response.choices[0].message.content.trim();
    console.log('AI Response:', aiResponse);

    // Saving AI-generated plans
    user.diet_plan = aiResponse;
    user.workout_plan = aiResponse;
    await user.save(); // Save the updated data with generated plans

    // Sending response back to the user
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

// Fetch all user data (for all plans)
const fetchAllPlans = async (req, res) => {
  try {
    const users = await Detail.find(); // Fetch all users with their plans
    res.status(200).json({
      message: 'Fetched all user plans successfully',
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching all user plans' });
  }
};

// Fetch a specific user data based on ID
const fetchOnePlan = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Detail.findOne({ userId: userId }); 
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'Fetched user plan successfully',
      user: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user plan' });
  }
};

// Delete a specific user based on ID
const deleteUserPlan = async (req, res) => {
  const { id } = req.params; // Get user ID from request params
  try {
    const user = await Detail.findByIdAndDelete(id); // Delete user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User plan deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting user plan' });
  }
};

export { generateUserPlan, fetchAllPlans, fetchOnePlan, deleteUserPlan };
