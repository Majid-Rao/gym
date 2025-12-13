import mongoose from 'mongoose';

// Schema definition
const userActivitiesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Linking to the User model
    ref: 'User', // Reference to the User model
    required: true
  },
   diet_plan: {
    type: String, 
    required: false
  },
  meal_routine: {
    type: [String], // Meal routine (e.g., Breakfast, Lunch, Dinner)
    required: true
  },
  workout_routine: {
    type: [String], // User's workout routine
    required: true
  },
  calories_intake: {
    type: Number, // Calories intake tracked by user
    required: true
  },
  goal: {
    type: String,
    enum: ['lose', 'gain'], // Goal options
    required: true
  },
  goal_achievement_percent: {
    type: Number, 
    default: 0 
  },
 
}, {
  timestamps: true 
});

// Model creation
const UserActivities = mongoose.model('UserActivities', userActivitiesSchema);

// Export the model
export default UserActivities;
