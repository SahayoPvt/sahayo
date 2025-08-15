import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  forgotPassword,
  removeErrors,
  removeSuccess,
} from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      setLocalError(error);
      setShowSuccess(false);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && message) {
      toast.success(message);
      setShowSuccess(true);
      setLocalError("");
      dispatch(removeSuccess());
    }
  }, [success, message, dispatch]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (localError) {
      setLocalError("");
    }
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setLocalError("Email is required");
      return;
    }
    dispatch(forgotPassword(email));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify Your Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 ${
                localError
                  ? "border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {localError && (
              <p className="text-red-600 text-sm mt-1">{localError}</p>
            )}
            {showSuccess && (
              <p className="text-green-600 text-sm mt-1">{message} </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || showSuccess}
            className={`w-full py-2 px-4 -mt-4 bg-blue-600 text-white font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              loading || showSuccess ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending reset link...</span>
              </div>
            ) : showSuccess ? (
              "Sent successfully"
            ) : (
              "Send"
            )}
          </button>

          <div className="text-center -mt-3">
            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
