import React from 'react';
import { registerUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Create an Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Join us to simplify your family planning experience.
        </p>

        {/* Form */}
        <form>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="fullName"
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
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="mt-2 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Register Button */}
          <div className="mb-4">
            <button
              onClick={handleRegister}
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-purple-400 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
