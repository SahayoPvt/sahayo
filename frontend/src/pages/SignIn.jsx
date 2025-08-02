import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeErrors, removeSuccess } from "../redux/productSlice";
import { login, logout, SendOtp, VerifyOTP } from "../redux/userSlice";
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const { error, loading, isAuthenticated, success, message, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(removeSuccess());
  }, [dispatch]);

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    // navigate("/confirm-email", { state: { email: formData.email } });
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
      setIsSuccess(true);
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());

      setTimeout(() => {
        setIsSuccess(false);
        navigate("/");
      }, 2000);
    }
  }, [dispatch, success, isAuthenticated, navigate]);

  window.scrollTo({ top: 0, behavior: "smooth" });
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-8">
      <div className="bg-white shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Welcome Back
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border focus:border-transparent transition-all duration-200 ${
                  fieldErrors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-600 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <button onClick={handleForgetPassword}
                className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-2 border focus:border-transparent transition-all duration-200 ${
                  fieldErrors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-red-600 text-sm">{fieldErrors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
              disabled={loading}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Backend error below form */}
          {fieldErrors.general && (
            <p className="text-red-600 text-sm text-center">
              {fieldErrors.general}
            </p>
          )}

          {/* Verify Email Button (shown only when email needs verification) */}
          {isVerify && (
            <button
              type="button"
              onClick={handleVerifyEmail}
              className={`w-full py-2 px-4 font-medium text-white transition-all duration-200 flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl`}
            >
              Verify Email
            </button>
          )}

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={loading}
              >
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
