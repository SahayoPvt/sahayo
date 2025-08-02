import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { VerifyOTP, SendOtp, removeErrors, removeSuccess } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, success, message, user } = useSelector(
    (state) => state.user
  );

  const email = location.state?.email || "";

  useEffect(() => {
    // Clear any previous errors or success messages
    dispatch(removeErrors());
    dispatch(removeSuccess());

    // Start countdown for resend OTP
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && message && isVerified) {
      toast.success(message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [success, message, navigate, isVerified]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("OTP is required");
      return;
    }
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }
    if (!user?._id) {
      toast.error("User information missing");
      return;
    }
    
    setIsVerified(true);
    dispatch(VerifyOTP({ userId: user._id, otp }));
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email not available");
      return;
    }
    
    setResendDisabled(true);
    setCountdown(30);
    
    // Start countdown again
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    dispatch(SendOtp(email));
    toast.success("New OTP sent to your email");
    
    return () => clearInterval(timer);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We've sent a verification code to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Verification Code (6 digits)
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/sign-in")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Sign In
            </button>
            
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendDisabled}
              className={`text-sm text-blue-600 hover:text-blue-800 ${
                resendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;