import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <svg 
            className="h-8 w-8 text-blue-500 mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" 
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-bold text-white">CreditIQ</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/calculator" active={location.pathname === "/calculator"}>Calculator</NavLink>
          <NavLink to="/dashboard" active={location.pathname === "/dashboard"}>Dashboard</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/signin" 
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  active, 
  children 
}) => {
  return (
    <Link 
      to={to} 
      className={`${
        active 
          ? "text-white border-b-2 border-blue-500" 
          : "text-gray-400 hover:text-white"
      } font-medium pb-1 transition-colors duration-200`}
    >
      {children}
    </Link>
  );
};

export default Header;