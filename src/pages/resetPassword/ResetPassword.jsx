import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmResetPasswordMutation } = useAuth();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwords.new_password || !passwords.confirm_password)
      return alert("All fields required");

    if (passwords.new_password !== passwords.confirm_password)
      return alert("Passwords do not match");

    try {
      await confirmResetPasswordMutation.mutateAsync({
        uid,
        token,
        new_password: passwords.new_password,
      });

      alert("Password reset successful");
      navigate("/");
    } catch (err) {
      alert("Invalid or expired reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pageBg">
      <div className="w-full max-w-md bg-cardBg p-8 rounded-primaryRadius shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            value={passwords.new_password}
            onChange={(e) =>
              setPasswords({ ...passwords, new_password: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-mutedText bg-inputBg rounded-primaryRadius"
            value={passwords.confirm_password}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm_password: e.target.value })
            }
          />

          <button
            type="submit"
            className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
          >
            {confirmResetPasswordMutation.isPending
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;