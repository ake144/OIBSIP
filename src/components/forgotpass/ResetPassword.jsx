import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync, selectResetPasswordStatus } from "./../auth/AuthSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const resetPasswordStatus = useSelector(selectResetPasswordStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(resetPasswordAsync({ password }));

    // Handle reset password status change in Redux slice extraReducers
  };

  return (
    <>
      <div className="justify-center items-center flex flex-col h-screen">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="bg-black text-white "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            required
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            className="bg-black text-white "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm new password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            focus:outline-none focus:shadow-outline"
            disabled={resetPasswordStatus === "pending"}
          >
            {resetPasswordStatus === "pending" ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
