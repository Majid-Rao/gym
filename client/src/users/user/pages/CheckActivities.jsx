import React from 'react'
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
const CheckActivities = () => {
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
          <Header title='Check Activities' />
          
          <main className='h-[calc(100vh-80px)] flex items-center justify-center px-4 py-6'>
            <div className="w-full max-w-4xl h-full max-h-[700px] flex flex-col bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
              
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default CheckActivities
