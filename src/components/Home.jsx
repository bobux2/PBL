import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import P5Background from './P5Background';

const Hello = () => {
  const navigate = useNavigate();
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
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Understand Your <span className="text-blue-500">Credit Score</span>
              </h1>
              <p className="text-gray-300 mb-8 text-lg">
                Get instant access to your credit score and personalized recommendations to improve it.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => navigate('/signin')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Login
                </button>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-8 flex flex-wrap gap-4"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Free Credit Monitoring</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Personalized Advice</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Secure & Private</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-w-72"
            >
              <h2 className="text-lg font-semibold mb-4">Your Potential Score</h2>
              
              <div className="relative h-40 w-40 mb-4">
                <div className="absolute inset-0 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <span className="font-bold text-5xl text-blue-500">
                    750
                  </span>
                </div>
                <svg className="absolute inset-0" width="160" height="160" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="12"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="439.6"
                    strokeDashoffset={439.6 - (439.6 * (750 - 300) / 550)}
                  />
                </svg>
              </div>
              
              <div className="text-center mt-4">
                <div className="text-xl mb-2">Very Good</div>
                <div className="text-sm text-gray-400">FICO® Score Range: 300-850</div>
              </div>
              
              <button 
                onClick={() => navigate('/login')}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Check Your Score
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hello;