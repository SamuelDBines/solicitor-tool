import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Contact Us
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Have questions or need help? Fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Subject Field */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter the subject"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here"
              rows={5}
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Alternatively, you can reach us at{' '}
            <a
              href="mailto:support@familyplanner.com"
              className="text-purple-400 font-medium hover:underline"
            >
              support@familyplanner.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
