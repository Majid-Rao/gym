import React, { useState, useEffect } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth to get user data
import { useNavigate } from 'react-router-dom';
const CheckActivities = () => {
  const { UserData } = useAuth();  // Fetching UserData from context
  const [activities, setActivities] = useState([]);  // To store fetched activities
  const navigate = useNavigate();
  useEffect(() => {
    fetchActivities();
  }, [UserData._id]);  // Fetch data again when the User ID changes

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getone-act/${UserData._id}`);  // Pass UserData._id directly
      const data = await response.json();
      if (response.ok) {
        setActivities(data);
      } else {
        alert("Error fetching activities: " + data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/delete-act/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        alert("Activity deleted successfully");
        fetchActivities();  // Re-fetch the activities after deletion
      } else {
        alert("Error deleting activity: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateactivities/${id}`);
  };  

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      
      <Sidebar />
      
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Check Activities' />
        
        <main className='h-[calc(100vh-80px)] flex items-center justify-center px-4 py-6'>
          <div className="w-full max-w-5xl h-full max-h-[700px] flex flex-col bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Table Section */}
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Diet Plan</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Meal Routine</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Workout Routine</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Calories Intake</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Goal</th>
                        <th scope="col" className="px-1 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Achievement</th>

                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {activities.map((activity) => (
                        <tr key={activity._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.diet_plan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.meal_routine.join(', ')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.workout_routine.join(', ')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.calories_intake}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.goal}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{activity.goal_achievement_percent}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => handleEdit(activity._id)} 
                              className="text-blue-600 hover:text-blue-800 mr-4"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(activity._id)} 
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckActivities;
