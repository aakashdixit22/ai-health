import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                    bg-white/30 backdrop-blur-md border border-white/40 
                    rounded-full px-6 py-3 shadow-lg flex items-center space-x-6">
      
      <Link 
        to="/" 
        className="text-gray-800 font-medium hover:text-blue-600 transition"
      >
        Home
      </Link>
      
      <Link 
        to="/about" 
        className="text-gray-800 font-medium hover:text-blue-600 transition"
      >
        About
      </Link>
      
      <Link 
        to="/services" 
        className="text-gray-800 font-medium hover:text-blue-600 transition"
      >
        Services
      </Link>
      
      <Link 
        to="/contact" 
        className="text-gray-800 font-medium hover:text-blue-600 transition"
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
