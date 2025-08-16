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
      <div className="w-full max-w-md bg-cardBg text-primaryText p-8 rounded-primaryRadius shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 hover:font-medium text-2xl hover:text-secondaryLite "
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius focus:ring-2 focus:ring-secondaryLite focus:outline-none"
            />
          )}

          <button
            type="submit"
            className="
             sm:px-6 text-sm sm:text-md border border-buttonBorder cursor-pointer transition-transform hover:scale-105 focus:outline-none disabled:opacity-50
            mx-auto block bg-primaryBtn text-buttonText font-semibold py-2 px-6 rounded-primaryRadius duration-200"

          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-secondaryText">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-secondaryLite font-medium hover:underline"
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
