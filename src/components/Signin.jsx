import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import P5Background from './P5Background';

export const Sign = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* P5.js animated background */}
      <div className="absolute inset-0 opacity-20">
        <P5Background />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center absolute top-8">Credit Dashboard</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>
              
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Username</label>
                  <input 
                    type="text" 
                    placeholder="Enter your username" 
                    className="w-full p-3 bg-gray-700 bg-opacity-50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="w-full p-3 bg-gray-700 bg-opacity-50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2 bg-gray-700" />
                    <label htmlFor="remember" className="text-gray-400">Remember me</label>
                  </div>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition">Forgot password?</a>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Sign In
                </button>
                
                <div className="text-center text-sm text-gray-400 mt-4">
                  Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300 transition">Sign up</a>
                </div>
              </form>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 text-center text-sm text-gray-400"
            >
              Protected by industry-standard encryption
              <div className="flex justify-center gap-2 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Login</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};