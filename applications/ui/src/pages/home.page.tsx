import React from 'react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-purple-500 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Family Planner</h1>
          <nav>
            <a
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Login
            </a>
            <a
              href="/register"
              className="ml-4 text-black bg-white px-4 py-2 rounded-md hover:bg-gray-100 border transition duration-200"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Organize Your Family's Life with Ease
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your family’s schedule, plan events, and keep track of important dates with our
            easy-to-use family calendar app.
          </p>
          <a
            href="/register"
            className="bg-purple-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-purple-600 transition duration-200"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose Family Planner?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-purple-500 mb-4">Shared Calendar</h4>
            <p className="text-gray-600">
              Easily share a calendar with your entire family and plan events together.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-purple-500 mb-4">Reminders</h4>
            <p className="text-gray-600">
              Set reminders for important dates like birthdays, school events, and appointments.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-purple-500 mb-4">Custom Events</h4>
            <p className="text-gray-600">
              Create custom events and tailor the app to fit your family’s unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Family Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
