import React, { useState } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { useAuth } from "../../../contexts/AuthContext";

const UserActivities = () => {
  const { UserData } = useAuth();  // Fetch user data from the AuthContext
  const [formData, setFormData] = useState({
    user: UserData._id, // Automatically set user ID from UserData
    diet_plan: '',
    meal_routine: [],
    workout_routine: [],
    calories_intake: '',
    goal: '',
    goal_achievement_percent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMealRoutineChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      meal_routine: value.split(',').map(item => item.trim())
    });
  };

  const handleWorkoutRoutineChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      workout_routine: value.split(',').map(item => item.trim())
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/insert-act", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert('Data submitted successfully');
        // Reset form data after successful submission
        setFormData({
          user: UserData._id,
          diet_plan: '',
          meal_routine: [],
          workout_routine: [],
          calories_intake: '',
          goal: '',
          goal_achievement_percent: ''
        });
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10 p-8'>
        <Header title='Submit Your Activities' />   
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 space-y-6">
          
          {/* Hidden User ID Field */}
          <input
            type="text"
            name="user"
            value={formData.user}
            className="hidden"
            disabled
          />

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Diet Plan</label>
            <textarea
              name="diet_plan"
              value={formData.diet_plan}
              onChange={handleChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              placeholder="Describe your diet plan"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Meal Routine</label>
            <input
              type="text"
              name="meal_routine"
              value={formData.meal_routine.join(', ')}
              onChange={handleMealRoutineChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              placeholder="Enter meals (comma separated)"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Workout Routine</label>
            <input
              type="text"
              name="workout_routine"
              value={formData.workout_routine.join(', ')}
              onChange={handleWorkoutRoutineChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              placeholder="Enter workouts (comma separated)"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Calories Intake</label>
            <input
              type="number"
              name="calories_intake"
              value={formData.calories_intake}
              onChange={handleChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              placeholder="Enter daily calories intake"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              required
            >
              <option value="lose">Lose</option>
              <option value="gain">Gain</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold">Goal Achievement Percent</label>
            <input
              type="number"
              name="goal_achievement_percent"
              value={formData.goal_achievement_percent}
              onChange={handleChange}
              className="p-2 mt-2 bg-gray-700 rounded-md text-gray-200"
              placeholder="Enter goal achievement percentage"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md mt-6 hover:bg-blue-500"
          >
            Submit Activity
          </button>
        </form>
   
      </div>
    </div>
  );
};

export default UserActivities;
