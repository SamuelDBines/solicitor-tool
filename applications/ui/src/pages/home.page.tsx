import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Organize Your Family’s Life with Ease
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Plan events, manage schedules, and track important dates effortlessly with our intuitive family calendar.
          </p>
          <a
            href="/register"
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-extrabold text-center text-white mb-12">
          Why Choose Family Planner?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-8 text-center">
            <h4 className="text-2xl font-bold text-purple-400 mb-4">Shared Calendar</h4>
            <p className="text-gray-300">
              Collaborate with your family on a shared calendar for seamless planning.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-8 text-center">
            <h4 className="text-2xl font-bold text-purple-400 mb-4">Reminders</h4>
            <p className="text-gray-300">
              Get timely reminders for birthdays, school events, and appointments.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-8 text-center">
            <h4 className="text-2xl font-bold text-purple-400 mb-4">Custom Events</h4>
            <p className="text-gray-300">
              Tailor the app to fit your family’s unique needs with customizable events.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Family Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
