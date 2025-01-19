import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Choose Your Plan</h1>
          <p className="text-gray-300 text-lg">
            Find the right plan for your family and start organizing with ease.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Basic</h2>
            <p className="text-gray-400 mb-6">
              Great for small families looking to get organized.
            </p>
            <div className="text-4xl font-extrabold mb-4">$5<span className="text-xl font-medium">/month</span></div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Shared Calendar
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Task Management
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Email Notifications
              </li>
            </ul>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition duration-200">
              Get Started
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Standard</h2>
            <p className="text-gray-400 mb-6">
              Perfect for medium families needing extra features.
            </p>
            <div className="text-4xl font-extrabold mb-4">$10<span className="text-xl font-medium">/month</span></div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Everything in Basic
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Multiple Calendars
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Priority Support
              </li>
            </ul>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition duration-200">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-purple-700 border border-purple-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-white">Premium</h2>
            <p className="text-gray-300 mb-6">
              Ideal for large families or advanced planning needs.
            </p>
            <div className="text-4xl font-extrabold mb-4">$20<span className="text-xl font-medium">/month</span></div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Everything in Standard
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced Analytics
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Dedicated Support
              </li>
            </ul>
            <button className="w-full bg-white text-purple-700 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
