import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-500 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Family Planner
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-6`}
        >
          <Link
            to="/"
            className="block mt-2 md:mt-0 text-white hover:text-gray-200 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block mt-2 md:mt-0 text-white hover:text-gray-200 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block mt-2 md:mt-0 text-white hover:text-gray-200 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
