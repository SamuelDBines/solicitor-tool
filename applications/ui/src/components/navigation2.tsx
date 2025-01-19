import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ isLoggedIn: boolean; setLoggedIn: Dispatch<SetStateAction<string | null>>; }> = ({ isLoggedIn, setLoggedIn }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-transparent backdrop-blur-lg w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-purple-400 transition duration-200"
          >
            Family Planner
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleDrawer}
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/teams"
                  className="text-gray-300 hover:text-white transition"
                >
                  Teams
                </Link>
                <Link
                  to="/tasks"
                  className="text-gray-300 hover:text-white transition"
                >
                  Tasks
                </Link>
                <Link
                  to="/calendar"
                  className="text-gray-300 hover:text-white transition"
                >
                  Calendar
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition"
                >
                  Profile
                </Link>
                <button
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => {
                    localStorage.removeItem('token');
                    setLoggedIn(null);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact us
                </Link>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About us
                </Link>
                <Link
                  to="/pricing"
                  className="text-gray-300 hover:text-white transition"
                >
                  pricing
                </Link>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Side Drawer for Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg z-50">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-purple-400">Navigation</h2>
              <button
                className="absolute top-4 right-4 text-gray-300"
                onClick={toggleDrawer}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="p-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-300 hover:text-purple-400 transition"
                  onClick={toggleDrawer}
                >
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/teams"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tasks"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Tasks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/calendar"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Calendar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="w-full text-left text-red-500 hover:text-red-700"
                      onClick={() => {
                        toggleDrawer();
                        alert('Logging out...');
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block text-gray-300 hover:text-purple-400 transition"
                      onClick={toggleDrawer}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
