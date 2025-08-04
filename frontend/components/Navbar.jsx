import React from "react";
import { Link } from "react-router-dom"; // Optional: Use only if using React Router

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link to="/teacher-login" className="text-lg text-gray-700 hover:text-blue-600">
              Teacher's Login
            </Link>
            <Link to="/student-login" className="text-lg text-gray-700 hover:text-blue-600">
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
