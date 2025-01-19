import React, { Dispatch, SetStateAction } from 'react';
import Button from '../components/button';
import { loginUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC<{ setLoggedIn: Dispatch<SetStateAction<string | null>>; }> = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoggedIn(null);
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(data);
      setLoggedIn(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/calendar');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Login to your account to access your family planner.
        </p>

        {/* Form */}
        <form>
          {/* Email Field */}
          <div className="mb-6">
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
          <div className="mb-6">
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

          {/* Submit Button */}
          <div className="mb-4">
            <Button
              title='Login'
              onClick={handleLogin}
              type="submit"
            // className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <a href="#" className="text-sm text-purple-400 hover:underline">
              Forgot your password?
            </a>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700"></div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              className="text-purple-400 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
