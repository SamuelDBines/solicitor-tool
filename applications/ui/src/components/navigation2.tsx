import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ isLoggedIn: boolean; }> = ({ isLoggedIn }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-purple-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
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
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-200"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/teams"
                  className="hover:text-gray-200 transition duration-200"
                >
                  Teams
                </Link>
                <Link
                  to="/tasks"
                  className="hover:text-gray-200 transition duration-200"
                >
                  Tasks
                </Link>
                <Link
                  to="/calendar"
                  className="hover:text-gray-200 transition duration-200"
                >
                  Calendar
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-gray-200 transition duration-200"
                >
                  Profile
                </Link>
                <button
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => alert('Logging out...')}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-200 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-gray-200 transition duration-200"
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
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-purple-500">Navigation</h2>
              <button
                className="absolute top-4 right-4 text-gray-600"
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
                  className="block text-gray-800 hover:text-purple-500"
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
                      className="block text-gray-800 hover:text-purple-500"
                      onClick={toggleDrawer}
                    >
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tasks"
                      className="block text-gray-800 hover:text-purple-500"
                      onClick={toggleDrawer}
                    >
                      Tasks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/calendar"
                      className="block text-gray-800 hover:text-purple-500"
                      onClick={toggleDrawer}
                    >
                      Calendar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block text-gray-800 hover:text-purple-500"
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
                      className="block text-gray-800 hover:text-purple-500"
                      onClick={toggleDrawer}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block text-gray-800 hover:text-purple-500"
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
