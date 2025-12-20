import React from 'react'
import ProtectedRoute from './routecomponent/ProtectedRoute';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Blogs from './components/Blogs.jsx';
import Contact from './components/Contact.jsx';

import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./users/admin/pages/AdminDashboard";
import DashboardUser from "./users/user/pages/DashboardUser.jsx"
import UserSuggestion from './users/user/pages/UserSuggestion.jsx';
import AiChatbot from './users/user/pages/AiChatbot.jsx';
import UserActivities from './users/user/pages/UserActivities.jsx';
import CheckActivities from './users/user/pages/CheckActivities.jsx';
import EditActivities from './users/user/pages/EditActivities.jsx';
import ViewSuggestion from './users/user/pages/ViewSuggestion.jsx';
//////
import Register from './auth/Register/Register';
import Login from './auth/Login/Login';
import { useAuth } from './contexts/AuthContext';


const App = () => {
  const { isAuthenticated } = useAuth();
  const { isAuthenticatedT } = useAuth();
  return (
  <>
  <main className="overflow-x-hidden">

      <Routes>
        {/* //landing page routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />


        {/* //login and signup routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/signIn" element={<Login />} />


        {/* //admindashboard routes */}    
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} role={"admin"} />}/>
        <Route path="/admindashboard" element={<AdminDashboard />} />


         {/* //userdashboard routes */}    
        <Route element={<ProtectedRoute isAuthenticatedT={isAuthenticatedT} role={"user"} />}/>
        <Route path="/userdashboard" element={<DashboardUser />} />
        <Route path="/usersuggestion" element={<UserSuggestion />} />
        <Route path="/chatbot" element={<AiChatbot />} />
        <Route path="/addactivities" element={<UserActivities />} />
        <Route path="/viewactivities/:id" element={<CheckActivities />} />
        <Route path="/updateactivities/:id" element={<EditActivities />} />
        <Route path="/viewsuggestions/:id" element={<ViewSuggestion />} />





     
      </Routes>
  </main>
  </>
  )
}

export default App
