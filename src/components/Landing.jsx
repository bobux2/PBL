import React from 'react';

const Login = () => {
  return (
    <div className="bg-black text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">How It Works</h2>
      <p className="text-lg mb-10">Get your credit score in three simple steps</p>
      
      <div className="flex justify-center items-center space-x-6">
        {/* Step 1 */}
        <div className="relative bg-gray-900 p-6 rounded-lg border border-blue-500 w-80">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
            1
          </div>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-gray-400">Create your account with basic information and verify your identity</p>
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl">→</div>
        </div>

        {/* Step 2 */}
        <div className="relative bg-gray-900 p-6 rounded-lg border border-blue-500 w-80">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
            2
          </div>
          <h3 className="text-xl font-semibold">Connect Your Data</h3>
          <p className="text-gray-400">Securely link your financial accounts for accurate score calculation</p>
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-blue-500 text-2xl">→</div>
        </div>

        {/* Step 3 */}
        <div className="relative bg-gray-900 p-6 rounded-lg border border-blue-500 w-80">
          <h3 className="text-xl font-semibold">Get Your Score</h3>
          <p className="text-gray-400">Instantly receive your credit score with detailed analysis and recommendations</p>
        </div>
      </div>
      
      <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
        Get Started Now
      </button>
    </div>
  );
};

export default Login;
