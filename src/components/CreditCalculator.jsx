import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import P5Background from './P5Background';
import ThreeDCreditScore from './ThreeDCreditScore';

const CreditCalculator = () => {
  const [formData, setFormData] = useState({
    paymentHistory: 50, // Default values
    creditUtilization: 30,
    creditHistoryLength: 15,
    creditMix: 10,
    newCredit: 10
  });
  
  const [creditScore, setCreditScore] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };
  
  const calculateScore = () => {
    setCalculating(true);
    
    // Simulate calculation with delay for animation effect
    setTimeout(() => {
      const {
        paymentHistory,
        creditUtilization,
        creditHistoryLength,
        creditMix,
        newCredit
      } = formData;
      
      // Formula based on FICO score factors and their weights
      // Payment History (35%), Credit Utilization (30%), Length of Credit History (15%), 
      // Credit Mix (10%), New Credit (10%)
      const score = Math.floor(
        (paymentHistory * 3.5) + 
        (100 - creditUtilization) * 3 + 
        (creditHistoryLength * 1.5) + 
        (creditMix * 1) + 
        (newCredit * 1)
      );
      
      // FICO scores range from 300 to 850
      const normalizedScore = Math.max(300, Math.min(850, score));
      
      setCreditScore(normalizedScore);
      setCalculating(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* P5.js animated background */}
      <div className="absolute inset-0 opacity-20">
        <P5Background />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Credit Score Calculator</h1>
        
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl max-w-4xl mx-auto overflow-hidden backdrop-blur-sm">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              className={`py-4 px-6 font-medium text-lg ${activeTab === 'calculator' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('calculator')}
            >
              Calculator
            </button>
            <button
              className={`py-4 px-6 font-medium text-lg ${activeTab === 'insights' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('insights')}
            >
              Insights
            </button>
            <button
              className={`py-4 px-6 font-medium text-lg ${activeTab === 'visualization' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('visualization')}
            >
              3D View
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === 'calculator' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Payment History (35%)</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="paymentHistory"
                        min="0"
                        max="100"
                        value={formData.paymentHistory}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-12 text-right">{formData.paymentHistory}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Credit Utilization (30%)</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="creditUtilization"
                        min="0"
                        max="100"
                        value={formData.creditUtilization}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-12 text-right">{formData.creditUtilization}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Length of Credit History (15%)</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="creditHistoryLength"
                        min="0"
                        max="30"
                        value={formData.creditHistoryLength}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-12 text-right">{formData.creditHistoryLength} yrs</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Credit Mix (10%)</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="creditMix"
                        min="0"
                        max="100"
                        value={formData.creditMix}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-12 text-right">{formData.creditMix}%</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">New Credit (10%)</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="newCredit"
                        min="0"
                        max="100"
                        value={formData.newCredit}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-12 text-right">{formData.newCredit}%</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={calculateScore}
                    disabled={calculating}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    {calculating ? 'Calculating...' : 'Calculate Credit Score'}
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  {creditScore !== null ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="mb-6">
                        <div className="relative h-64 w-64">
                          <div className="absolute inset-0 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                            <span className="font-bold text-6xl">
                              {creditScore}
                            </span>
                          </div>
                          <svg className="absolute inset-0" width="256" height="256" viewBox="0 0 256 256">
                            <circle
                              cx="128"
                              cy="128"
                              r="120"
                              fill="none"
                              stroke="#1f2937"
                              strokeWidth="16"
                            />
                            <motion.circle
                              cx="128"
                              cy="128"
                              r="120"
                              fill="none"
                              stroke={
                                creditScore < 580 ? "#ef4444" :
                                creditScore < 670 ? "#f59e0b" :
                                creditScore < 740 ? "#10b981" :
                                "#3b82f6"
                              }
                              strokeWidth="16"
                              strokeLinecap="round"
                              strokeDasharray="753.6"
                              strokeDashoffset={753.6 - (753.6 * (creditScore - 300) / 550)}
                              initial={{ strokeDashoffset: 753.6 }}
                              animate={{ strokeDashoffset: 753.6 - (753.6 * (creditScore - 300) / 550) }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="text-xl mb-2">
                        {creditScore < 580 ? "Poor" :
                         creditScore < 670 ? "Fair" :
                         creditScore < 740 ? "Good" :
                         creditScore < 800 ? "Very Good" : "Excellent"}
                      </div>
                      
                      <div className="text-gray-400 text-sm">
                        FICO® Score Range: 300-850
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <div className="mb-4 text-6xl opacity-30">?</div>
                      <p>Adjust the sliders and calculate your score</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Understanding Your Credit Score</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Payment History (35%)</h3>
                    <p className="text-gray-300">Your track record of paying bills on time. Late payments, bankruptcies, and collections can significantly lower your score.</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Credit Utilization (30%)</h3>
                    <p className="text-gray-300">The ratio of your credit card balances to your credit limits. Lower utilization rates are better for your score.</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Length of Credit History (15%)</h3>
                    <p className="text-gray-300">How long you've had credit accounts. Longer histories typically result in higher scores.</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Credit Mix (10%)</h3>
                    <p className="text-gray-300">The variety of credit accounts you have, including credit cards, retail accounts, installment loans, and mortgages.</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">New Credit (10%)</h3>
                    <p className="text-gray-300">New accounts and recent credit inquiries. Opening several new accounts in a short period may indicate higher risk.</p>
                  </div>
                  
                  <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Score Ranges</h3>
                    <ul className="space-y-2">
                      <li><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span><span className="font-medium">300-579:</span> Poor</li>
                      <li><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span><span className="font-medium">580-669:</span> Fair</li>
                      <li><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span><span className="font-medium">670-739:</span> Good</li>
                      <li><span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span><span className="font-medium">740-799:</span> Very Good</li>
                      <li><span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span><span className="font-medium">800-850:</span> Excellent</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'visualization' && (
              <div className="h-96">
                <ThreeDCreditScore score={creditScore || 700} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCalculator;