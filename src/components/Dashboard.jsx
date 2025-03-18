import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import P5Background from './P5Background';

const Dashboard = () => {
  const [creditScore, setCreditScore] = useState(750);
  const [isLoading, setIsLoading] = useState(true);
  
  const [creditFactors, setCreditFactors] = useState([
    {
      name: 'Payment History',
      value: 95,
      weight: 35,
      status: 'excellent',
      description: 'Your payments are consistently on time.'
    },
    {
      name: 'Credit Utilization',
      value: 25,
      weight: 30,
      status: 'good',
      description: 'Your credit card balances are relatively low compared to your limits.'
    },
    {
      name: 'Credit Age',
      value: 70,
      weight: 15,
      status: 'good',
      description: 'Your average account age is 7 years.'
    },
    {
      name: 'Account Mix',
      value: 65,
      weight: 10,
      status: 'fair',
      description: 'You have a moderate mix of credit types.'
    },
    {
      name: 'Recent Inquiries',
      value: 85,
      weight: 10,
      status: 'good',
      description: 'You have few recent credit inquiries.'
    }
  ]);
  
  const [recommendations, setRecommendations] = useState([
    'Keep making all payments on time',
    'Consider lowering your credit card balances below 20%',
    'Avoid opening new credit accounts in the next 6 months',
    'Consider diversifying your credit mix with a small installment loan'
  ]);
  
  const [historicalScores, setHistoricalScores] = useState([
    { month: 'Jan', score: 715 },
    { month: 'Feb', score: 725 },
    { month: 'Mar', score: 730 },
    { month: 'Apr', score: 740 },
    { month: 'May', score: 745 },
    { month: 'Jun', score: 750 }
  ]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate score color based on range
  const getScoreColor = () => {
    if (creditScore < 580) return 'text-red-500';
    if (creditScore < 670) return 'text-yellow-500';
    if (creditScore < 740) return 'text-green-500';
    if (creditScore < 800) return 'text-blue-500';
    return 'text-purple-500';
  };
  
  // Get status color for credit factors
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
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
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Credit Dashboard</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Credit Score Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-3 md:col-span-1"
            >
              <h2 className="text-xl font-semibold mb-4">Your Credit Score</h2>
              
              <div className="flex flex-col items-center">
                <div className="relative h-48 w-48 mb-4">
                  <div className="absolute inset-0 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                    <span className={`font-bold text-5xl ${getScoreColor()}`}>
                      {creditScore}
                    </span>
                  </div>
                  <svg className="absolute inset-0" width="192" height="192" viewBox="0 0 192 192">
                    <circle
                      cx="96"
                      cy="96"
                      r="86"
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth="12"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="86"
                      fill="none"
                      stroke={
                        creditScore < 580 ? "#ef4444" :
                        creditScore < 670 ? "#f59e0b" :
                        creditScore < 740 ? "#10b981" :
                        creditScore < 800 ? "#3b82f6" : "#8b5cf6"
                      }
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="540.8"
                      strokeDashoffset={540.8 - (540.8 * (creditScore - 300) / 550)}
                    />
                  </svg>
                </div>
                
                <div className="text-xl mb-2">
                  {creditScore < 580 ? "Poor" :
                   creditScore < 670 ? "Fair" :
                   creditScore < 740 ? "Good" :
                   creditScore < 800 ? "Very Good" : "Excellent"}
                </div>
                
                <div className="text-sm text-gray-400">
                  FICO® Score Range: 300-850
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center text-sm">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-gray-400">Last updated: March 12, 2025</div>
              </div>
            </motion.div>
            
            {/* Historical Score Trend */}
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-3 md:col-span-2"
            >
              <h2 className="text-xl font-semibold mb-4">Score History</h2>
              
              <div className="h-48 relative">
                {/* Chart bars */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-40">
                  {historicalScores.map((item, index) => {
                    const height = ((item.score - 300) / 550) * 100;
                    const color = 
                      item.score < 580 ? "bg-red-500" :
                      item.score < 670 ? "bg-yellow-500" :
                      item.score < 740 ? "bg-green-500" :
                      "bg-blue-500";
                    
                    return (
                      <div key={index} className="flex flex-col items-center w-1/6">
                        <div 
                          className={`w-12 rounded-t-lg ${color}`} 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-2">{item.month}</div>
                        <div className="text-xs text-gray-400">{item.score}</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Line chart overlay */}
                <svg className="absolute inset-0 h-40" viewBox="0 0 100 40">
                  <polyline
                    points={historicalScores.map((item, index) => {
                      const x = (index * 100) / (historicalScores.length - 1);
                      const y = 40 - ((item.score - 300) / 550) * 40;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {historicalScores.map((item, index) => {
                    const x = (index * 100) / (historicalScores.length - 1);
                    const y = 40 - ((item.score - 300) / 550) * 40;
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="1"
                        fill="#60a5fa"
                      />
                    );
                  })}
                </svg>
              </div>
              
              <div className="mt-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>6-month improvement: +35 points</span>
                  <span>Projection: ↗ Increasing</span>
                </div>
              </div>
            </motion.div>
            
            {/* Credit Factors */}
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-3 md:col-span-2"
            >
              <h2 className="text-xl font-semibold mb-4">Credit Score Factors</h2>
              
              <div className="space-y-4">
                {creditFactors.map((factor, index) => (
                  <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(factor.status)}`}></div>
                        <h3 className="font-medium">{factor.name}</h3>
                      </div>
                      <div className="text-sm text-gray-400">Weight: {factor.weight}%</div>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-600 rounded-full mb-2">
                      <div 
                        className={`h-full rounded-full ${getStatusColor(factor.status)}`}
                        style={{ width: `${factor.value}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-sm text-gray-300">{factor.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Recommendations */}
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-3 md:col-span-1"
            >
              <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
              
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-blue-400 mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                Get Personalized Plan
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;