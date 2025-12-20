import React, { useState } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { jsPDF } from "jspdf";  // For PDF generation
import { RingLoader } from 'react-spinners';  // For better loading animation
import { useAuth } from "../../../contexts/AuthContext";

const UserSuggestion = () => {
  const { UserData } = useAuth();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');

  const [mealRoutine, setMealRoutine] = useState('');
  const [workoutRoutine, setWorkoutRoutine] = useState('');
  const [goal, setGoal] = useState('gain');
  const [gender, setGender] = useState('male');
  const [timeperiod, setTimeperiod] = useState('1week');  
  const [dietPlan, setDietPlan] = useState(''); // State for diet plan
  const [workoutPlan, setWorkoutPlan] = useState(''); // State for workout plan
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);  // State for loading animation

  // Form submission handler
  // Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Send data to the API - userId bhi add karo
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sharing_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      userId: UserData._id,  // ✅ Ye add karo
      height, 
      weight,
      age, 
      meal_routine: mealRoutine, 
      workout_routine: workoutRoutine, 
      goal, 
      gender,
      timeperiod 
    })
  });

  const data = await response.json();

  // Set diet_plan and workout_plan from the API response
  if (data.diet_plan && data.workout_plan) {
    setDietPlan(data.diet_plan);
    setWorkoutPlan(data.workout_plan);
  } else {
    setDietPlan('No diet plan available');
    setWorkoutPlan('No workout plan available');
  }
  setHeight('');
  setWeight('');
  setAge('');
  setMealRoutine('');
  setWorkoutRoutine('');
  setGoal('gain');  // Default value pe set karo
  setGender('male');  // Default value pe set karo
  setTimeperiod('1week');  // Default value pe set karo
  
  setLoading(false);
  setShowModal(true);
};

  // PDF download function
 // PDF download function - Replace your handleDownload function with this
const handleDownload = () => {
  const doc = new jsPDF();
  
  let yPosition = 20; // Starting Y position
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - (2 * margin);

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Your Personalized Plan", margin, yPosition);
  yPosition += 15;

  // Diet Plan Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Diet Plan:", margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const dietLines = doc.splitTextToSize(dietPlan, maxWidth);
  
  dietLines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, margin, yPosition);
    yPosition += 6;
  });
  
  yPosition += 10; // Add space between sections

  // Workout Plan Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  
  // Check if we need a new page for workout section
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.text("Workout Plan:", margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const workoutLines = doc.splitTextToSize(workoutPlan, maxWidth);
  
  workoutLines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(line, margin, yPosition);
    yPosition += 6;
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  doc.save("Fitness_Plan.pdf");
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
          <Header title='User Suggesstions' />
          <main className='max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8'>
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Enter Your Details</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="height" className="block text-sm font-medium">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="weight" className="block text-sm font-medium">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                </div>
                 <div className="mb-4">
                  <label htmlFor="age" className="block text-sm font-medium">Age</label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mealRoutine" className="block text-sm font-medium">Meal Routine</label>
                  <textarea
                    id="mealRoutine"
                    value={mealRoutine}
                    onChange={(e) => setMealRoutine(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="workoutRoutine" className="block text-sm font-medium">Workout Routine</label>
                  <textarea
                    id="workoutRoutine"
                    value={workoutRoutine}
                    onChange={(e) => setWorkoutRoutine(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="goal" className="block text-sm font-medium">Goal</label>
                  <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  >
                    <option value="gain">Gain</option>
                    <option value="lose">Lose</option>
                  </select>
                </div>
                {/* Gender dropdown */}
                <div className="mb-4">
                  <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                 {/* time dropdown */}
                <div className="mb-4">
                  <label htmlFor="timeperiod" className="block text-sm font-medium">Time period</label>
                  <select
                    id="timeperiod"
                    value={timeperiod}
                    onChange={(e) => setTimeperiod(e.target.value)}
                    className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md"
                  >
                    <option value="1week">1 Week</option>
                    <option value="1month">1 Month</option>
                    <option value="3month">3 Month</option>
                    <option value="6month">6 Month</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-600 text-white rounded-md relative"
                >
                  {loading ? (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <RingLoader color="#fff" size={50} />  {/* React Spinner */}
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>

            {/* Modal for AI Response */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-800 bg-opacity-50">
                <div className="bg-black text-white p-6 rounded-lg max-w-xl w-full max-h-[80vh] overflow-auto">
                  <h2 className="text-xl font-bold mb-4">AI Response</h2>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Diet Plan:</h3>
                    <p>{dietPlan}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Workout Plan:</h3>
                    <p>{workoutPlan}</p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-600 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-green-600 rounded-md"
                    >
                      Download Data as PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default UserSuggestion;
