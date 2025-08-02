import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { SendOtp, removeErrors, removeSuccess } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const ConfirmEmailVerification = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, message, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(removeErrors());
    dispatch(removeSuccess());

    if (!email) {
      toast.error("No email provided for verification");
      navigate("/sign-in");
    }
  }, [dispatch, email, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && message && user?._id) {
      toast.success(message);
      navigate("/verify-otp", { 
        state: { 
          email,
          userId: user._id 
        } 
      });
    }
  }, [success, message, navigate, email, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SendOtp(email));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We'll send a verification code to your email address
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending OTP..." : "Send Verification Code"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmailVerification;