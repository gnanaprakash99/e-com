import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Login = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login");
  // modes: login | signup | reset

  const [signUpData, setSignUpData] = useState({
    name: "",
    contact_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  const { signUpMutation, loginMutation, resetPasswordMutation } = useAuth();

  useEffect(() => {
    if (isOpen) setMode("login");
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return alert("Enter email & password");

    await loginMutation.mutateAsync(loginData);
    setLoginData({ email: "", password: "" });
    onClose();
  };

  // ✅ Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, contact_number, email, password, confirmPassword } = signUpData;

    if (!email || !contact_number || !password || !confirmPassword)
      return alert("Fill all fields");

    if (password !== confirmPassword) return alert("Passwords do not match");

    await signUpMutation.mutateAsync({ name, contact_number, email, password });

    setSignUpData({
      name: "",
      contact_number: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setMode("login");
  };

  // ✅ Reset Password Submit
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) return alert("Enter email");

    resetPasswordMutation.mutateAsync({ email: resetEmail });

    alert("Reset link sent to email");
    setResetEmail("");
    setMode("login");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-cardBg text-primaryText p-8 rounded-primaryRadius shadow-lg relative">

        <button
          className="absolute top-4 right-4 hover:font-medium text-2xl hover:text-secondaryLite"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login"
            ? "Login to Your Account"
            : mode === "signup"
              ? "Create a New Account"
              : "Reset Password"}
        </h2>

        {/* ✅ LOGIN FORM */}
        {mode === "login" && (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <button
              type="submit"
              className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
            >
              {loginMutation.isPending ? 'Logging In' : 'Login'}
            </button>

            <button
              type="button"
              className="text-secondaryLite text-sm mt-2 hover:underline block"
              onClick={() => setMode("reset")}
            >
              Forgot Password?
            </button>
          </form>
        )}

        {/* ✅ SIGNUP FORM */}
        {mode === "signup" && (
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <input
              type="number"
              placeholder="Mobile Number"
              value={signUpData.contact_number}
              onChange={(e) =>
                setSignUpData({ ...signUpData, contact_number: e.target.value })
              }
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <input
              type="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <input
              type="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({ ...signUpData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <button
              type="submit"
              className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
            >
              {signUpMutation.isPending ? 'Signing Up' : 'Sign Up'}
            </button>
          </form>
        )}

        {/* ✅ RESET FORM */}
        {mode === "reset" && (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            />

            <button
              type="submit"
              className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              className="mt-2 text-secondaryLite hover:underline block mx-auto border border-secondaryLite py-2 px-6 rounded-primaryRadius"
              onClick={() => setMode("login")}
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          {mode !== "reset" && (
            <p className="text-sm text-secondaryText">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-secondaryLite font-medium hover:underline"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
