import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import StatCard from "../layouts/StatCard";


const DashboardUser = () => {
  
  return (
    <>
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
    <Sidebar />
    <div className='flex-1 overflow-auto relative z-10'>
      
      <Header title='User Dashboard' />
      
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
       <h1 className="text-center text-xl sm:text-3xl py-3">Welcome to User's Dashboard</h1>
       <h4 className="text-center text-lg sm:text-2xl py-1">Instructions For User</h4>
       
       {/* Bullet List */}
       <ul className="list-disc sm:pl-8 pl-4 text-md text-gray-300 py-3">
         <li><strong>Suggestions:</strong> Follow the instructions carefully for a personalized experience, and feel free to ask if you need help at any step.</li>
         <li className="py-1"><strong>Chatbot:</strong> Our AI-powered chatbot is here to assist you with any queries or tasks you need help with during your journey.</li>
         <li className="py-1"><strong>User Activities:</strong> Keep track of your activities and progress directly from the dashboard to stay organized and on top of your goals.</li>
       </ul>

      </main>
    </div>
    </div>
    </>
  );
};

export default DashboardUser;
