import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeErrors, removeSuccess } from "../redux/productSlice";
import {
  google,
  login,
  logout,
} from "../redux/userSlice";
import {auth,provider} from "../utils/firebase"
import { signInWithPopup } from "firebase/auth";


const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isVerify, setIsVerify] = useState(false);
  
  const LoginWithGoogle=async()=>{
     const response = await signInWithPopup(auth, provider);
     const user = response.user;
     dispatch(google(user))
  }

  const { error, loading, isAuthenticated, success,message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(removeSuccess());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});
    if (!validateForm()) return;
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  const handleVerifyEmail = () => {
    navigate("/confirm-email", { state: { email: formData.email } });
  }; 

  const handleForgetPassword = () => {
    navigate("/forget-password", { state: { email: formData.email } });
  };

  useEffect(() => {
    if (error) {
      if (error === "Email not verified. Please verify your email first.") {
        toast.error(error);
        setIsVerify(true);
      } else if (typeof error === "object" && error !== null) {
        setFieldErrors(error);
      } else {
        setFieldErrors({ general: error });
      }
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success && isAuthenticated) {
   
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [dispatch, success, isAuthenticated, navigate]);

  return (
    <div className="flex h-[600px] w-full px-24 pt-24">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-[490px] w-full "
          src="WhatsApp Image 2025-08-18 at 2.14.28 PM.jpeg"
          alt="leftSideImage"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <form
          className="md:w-[420px] w-80 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full mt-5 bg-gray-500/10 flex items-center justify-center h-11 rounded-full cursor-pointer hover:bg-gray-500/20 transition-colors"
            onClick={LoginWithGoogle}
           disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Connecting with Google...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                  alt="googleLogo"
                  className="mr-2"
                />
              </div>
            )}
          </button>

          <div className="flex items-center gap-4 w-full my-4">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Email Input */}
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="text-red-500/90 text-sm mt-2 w-full text-left">
              {fieldErrors.email}
            </p>
          )}

          {/* Password Input */}
          <div className="flex items-center mt-5 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 relative">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              disabled={loading}
              style={{ background: "none", border: "none", outline: "none" }}
            >
              {showPassword ? (
                // EyeOff icon
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94a6.963 6.963 0 01-5.94 2.56c-3.31 0-6.26-2.16-8.29-5.63a10.96 10.96 0 011.63-2.18m3.74-3.74A7 7 0 0012 7c3.31 0 6.26 2.16 8.29 5.63a10.97 10.97 0 01-2.49 3.57"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18"/>
                </svg>
              ) : (
                // Eye icon
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12A3 3 0 119 12a3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.856-1.724 5-9.542 7C4.182 17 2.733 12.856 2.458 12z"></path>
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-500/90 text-sm mt-2 w-full text-left">
              {fieldErrors.password}
            </p>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="w-full flex items-center justify-between mt-5 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input
                className="h-5"
                type="checkbox"
                id="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm underline"
              onClick={handleForgetPassword}
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-12 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          {fieldErrors.general && (
            <p className="text-red-600 text-sm text-center mt-2">
              {fieldErrors.general}
            </p>
          )}

          {/* Verify Email Button */}
          {isVerify && (
            <button
              type="button"
              onClick={handleVerifyEmail}
              className="mt-4 w-full h-11 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Verify Email
            </button>
          )}

          <p className="text-gray-500/90 text-sm mt-4">
            Don't have an account?{" "}
            <Link className="text-indigo-400 hover:underline" to="/sign-up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;