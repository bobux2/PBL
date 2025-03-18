import React from 'react'
import { useNavigate } from 'react-router-dom'



const Hello = () => {

  const navigate = useNavigate();

    return (
        <div className="h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-4">
            Understand Your <span className="text-blue-500">Credit Score</span>
          </h1>
          <p className="text-gray-400 mb-6">
            Get instant access to your credit score and personalized recommendations to improve it.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"onClick={()=>navigate('/login')}>Get Started</button>
            <button className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600" onClick={() => navigate('/signin')}>Login</button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-72 h-48 flex items-center justify-center">
          <span className="text-5xl font-bold text-blue-500">750</span>
        </div>
      </div>
    </div>
    )
}

export default Hello