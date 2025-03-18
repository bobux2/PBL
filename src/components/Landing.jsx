import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import P5Background from './P5Background';

const Login = () => {
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
        staggerChildren: 0.15
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
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-12 text-gray-300"
            >
              Get your credit score in three simple steps
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-12 md:space-y-0"
            >
              {/* Step 1 */}
              <motion.div 
                variants={itemVariants}
                className="relative bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-xs"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                  1
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
                  <p className="text-gray-300">Create your account with basic information and verify your identity</p>
                </div>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                variants={itemVariants}
                className="relative bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-xs"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                  2
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-4">Connect Your Data</h3>
                  <p className="text-gray-300">Securely link your financial accounts for accurate score calculation</p>
                </div>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                variants={itemVariants}
                className="relative bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-xs"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                  3
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold mb-4">Get Your Score</h3>
                  <p className="text-gray-300">Instantly receive your credit score with detailed analysis and recommendations</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-16"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg">
                Get Started Now
              </button>
              
              <div className="flex justify-center mt-6 space-x-4">
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure & confidential
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Login;