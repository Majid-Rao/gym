import UserActivities from '../models/userActivityModel.js'; // Model import

// POST: Create a new user activity
export const createUserActivity = async (req, res) => {
  try {
    const { user, diet_plan, meal_routine, workout_routine, calories_intake, goal, goal_achievement_percent } = req.body;

    const newUserActivity = new UserActivities({
      user,
      diet_plan,
      meal_routine,
      workout_routine,
      calories_intake,
      goal,
      goal_achievement_percent
    });

    const savedActivity = await newUserActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user activity', error });
  }
};

// GET: Get all user activities
export const getUserActivities = async (req, res) => {
  try {
    const activities = await UserActivities.find().populate('user', 'name email'); // Populate user info
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activities', error });
  }
};

// GET: Get user activity by ID
export const getUserActivityById = async (req, res) => {
  try {
    const activity = await UserActivities.findById(req.params.id).populate('user', 'name email');
    if (!activity) {
      return res.status(404).json({ message: 'User activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activity', error });
  }
};

// PUT: Update user activity
export const updateUserActivity = async (req, res) => {
  try {
    const { diet_plan, meal_routine, workout_routine, calories_intake, goal, goal_achievement_percent } = req.body;

    const updatedActivity = await UserActivities.findByIdAndUpdate(
      req.params.id,
      {
        diet_plan,
        meal_routine,
        workout_routine,
        calories_intake,
        goal,
        goal_achievement_percent
      },
      { new: true } // Return the updated document
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'User activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user activity', error });
  }
};

// DELETE: Delete user activity
export const deleteUserActivity = async (req, res) => {
  try {
    const deletedActivity = await UserActivities.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'User activity not found' });
    }
    res.status(200).json({ message: 'User activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user activity', error });
  }
};
