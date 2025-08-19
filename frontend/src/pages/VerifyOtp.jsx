// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router';
// import { VerifyOTP, SendOtp, removeErrors, removeSuccess } from '../redux/userSlice';
// import { toast } from 'react-hot-toast';

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { loading, error, success, message, user } = useSelector(
//     (state) => state.user
//   );

//   const email = location.state?.email || "";

//   useEffect(() => {
//     // Clear any previous errors or success messages
//     dispatch(removeErrors());
//     dispatch(removeSuccess());

//     // Start countdown for resend OTP
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(removeErrors());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (success && message && isVerified) {
//       toast.success(message);
//       setTimeout(() => {
//         navigate("/sign-in");
//       }, 2000);
//     }
//   }, [success, message, navigate, isVerified]);

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!otp) {
//       toast.error("OTP is required");
//       return;
//     }
//     if (otp.length !== 6) {
//       toast.error("OTP must be 6 digits");
//       return;
//     }
//     if (!user?._id) {
//       toast.error("User information missing");
//       return;
//     }
    
//     setIsVerified(true);
//     dispatch(VerifyOTP({ userId: user._id, otp }));
//   };

//   const handleResendOtp = () => {
//     if (!email) {
//       toast.error("Email not available");
//       return;
//     }
    
//     setResendDisabled(true);
//     setCountdown(30);
    
//     // Start countdown again
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setResendDisabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
    
//     dispatch(SendOtp(email));
//     toast.success("New OTP sent to your email");
    
//     return () => clearInterval(timer);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Verify Your Email
//         </h2>
//         <p className="text-gray-600 mb-6 text-center">
//           We've sent a verification code to <span className="font-semibold">{email}</span>
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//               Verification Code (6 digits)
//             </label>
//             <input
//               type="text"
//               id="otp"
//               name="otp"
//               value={otp}
//               onChange={handleChange}
//               maxLength={6}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter 6-digit code"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Verifying..." : "Verify Email"}
//           </button>

//           <div className="flex items-center justify-between">
//             <button
//               type="button"
//               onClick={() => navigate("/sign-in")}
//               className="text-sm text-blue-600 hover:text-blue-800"
//             >
//               Back to Sign In
//             </button>
            
//             <button
//               type="button"
//               onClick={handleResendOtp}
//               disabled={resendDisabled}
//               className={`text-sm text-blue-600 hover:text-blue-800 ${
//                 resendDisabled ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;



import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { VerifyOTP, SendOtp, removeErrors, removeSuccess } from "../redux/userSlice";
import { toast } from "react-hot-toast";

export default function VerifyOtpNewUI() {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputsRef = useRef([]);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, success, message, user } = useSelector((state) => state.user);

  const email = location.state?.email || "";

  // Start countdown and clear errors/success on mount
  useEffect(() => {
    dispatch(removeErrors());
    dispatch(removeSuccess());
    setResendDisabled(true);
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

  // Show error toast on error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  // On successful verification, navigate to sign-in page after toast
  useEffect(() => {
    if (success && message && isVerified) {
      toast.success(message);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [success, message, navigate, isVerified]);

  // Handle input change for each OTP box
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(0, 1);
    setOtpDigits(newOtpDigits);
    if (value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle keydown for backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpDigits[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste event: allow pasting full 6-digit OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const pasteDigits = paste.split("");
      setOtpDigits(pasteDigits);
      // Focus last input after paste
      inputsRef.current[inputsRef.current.length - 1].focus();
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpDigits.some((digit) => digit === "")) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    const otp = otpDigits.join("");
    if (!user?._id) {
      toast.error("User information missing");
      return;
    }
    setIsVerified(true);
    dispatch(VerifyOTP({ userId: user._id, otp }));
  };

  // Resend OTP handler with countdown restart
  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email not available");
      return;
    }
    setResendDisabled(true);
    setCountdown(30);
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      onPaste={handlePaste}
      className="bg-white text-gray-500 max-w-96 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10 mt-24 mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
           Verify Your Email
      </h2>
      <p className="text-center">Please enter the verification OTP</p>
      <p className="text-gray-500/60 mb-4">
        The verification otp has been sent to your email:{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <div className="flex items-center justify-between mb-6">
        {otpDigits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500/60 transition duration-300"
            type="text"
            maxLength={1}
            required
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>
      <button
        type="submit"
        className="w-full py-2.5 rounded-full text-white bg-indigo-500 active:scale-95 transition"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
      <div className="mt-4 flex justify-between">
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
  );
}
