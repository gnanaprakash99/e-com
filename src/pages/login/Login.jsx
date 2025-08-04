import React, { useState, useEffect } from 'react';

const Login = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Reset to login mode whenever modal is opened
  useEffect(() => {
    if (isOpen) setIsLogin(true);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white p-8 rounded-primaryRadius shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-primaryText hover:font-medium text-2xl hover:text-teritaryLite "
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-primaryText mb-6 text-center">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-primaryborder rounded-primaryRadius focus:outline-none focus:ring-2 focus:ring-teritaryLite"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-primaryborder rounded-primaryRadius focus:outline-none focus:ring-2 focus:ring-teritaryLite"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-primaryborder rounded-primaryRadius focus:outline-none focus:ring-2 focus:ring-teritaryLite"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-primaryborder rounded-primaryRadius focus:outline-none focus:ring-2 focus:ring-teritaryLite"
            />
          )}

          <button
            type="submit"
            className="mx-auto block bg-teritaryLite text-white font-semibold py-2 px-6 rounded-primaryRadius transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-secondaryText">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-teritaryLite font-medium hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
