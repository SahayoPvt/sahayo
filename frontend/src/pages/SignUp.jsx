
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register, removeErrors, removeSuccess } from "../redux/userSlice";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });

  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(requirements).filter(Boolean).length;
    return { score, requirements };
  };

  // Get password strength info
  const getPasswordStrengthInfo = (score) => {
    if (score === 0)
      return {
        width: "0%",
        color: "bg-gray-200",
        text: "",
        textColor: "text-gray-400",
      };
    if (score <= 2)
      return {
        width: "40%",
        color: "bg-red-400",
        text: "Weak",
        textColor: "text-red-500",
      };
    if (score <= 3)
      return {
        width: "60%",
        color: "bg-yellow-400",
        text: "Fair",
        textColor: "text-yellow-600",
      };
    if (score <= 4)
      return {
        width: "80%",
        color: "bg-blue-400",
        text: "Good",
        textColor: "text-blue-600",
      };
    return {
      width: "100%",
      color: "bg-green-400",
      text: "Strong",
      textColor: "text-green-600",
    };
  };

  // Generate strong password
  const generateStrongPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*";

    let password = "";

    // Ensure at least one character from each category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the rest randomly
    const allChars = lowercase + uppercase + numbers + special;
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setFormData((prev) => ({
      ...prev,
      password: newPassword,
      confirmPassword: newPassword,
    }));
    setPasswordStrength(calculatePasswordStrength(newPassword));

    // Clear any existing password errors
    setFieldErrors((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));

    toast.success("Strong password generated!", {
      position: "top-center",
      duration: 2000,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 4) {
      newErrors.password =
        "Password must be strong (meet at least 4 requirements)";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Calculate password strength when password changes
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        setFieldErrors((prev) => ({
          ...prev,
          avatar: "Please select an image file",
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFieldErrors((prev) => ({
          ...prev,
          avatar: "Image size should be less than 2MB",
        }));
        return;
      }

      setAvatarPreview(URL.createObjectURL(file));
      setAvatar(file);
      setFieldErrors((prev) => ({ ...prev, avatar: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const myForm = new FormData();
    myForm.set("name", formData.name);
    myForm.set("email", formData.email);
    myForm.set("password", formData.password);
    if (avatar) {
      myForm.set("avatar", avatar);
    }

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (typeof error === "object") {
        // Handle field-specific errors
        if (error.name || error.email || error.password || error.avatar) {
          setFieldErrors(error);
          
          // Show the first error in toast
          const firstError = Object.values(error).find(val => val);
          if (firstError) {
            toast.error(firstError, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        } 
        // Handle error with message property
        else if (error.message) {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
        // Handle other object types
        else {
          toast.error("Registration failed. Please check your inputs.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      }

      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration Successful", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/sign-in");
    }
  }, [dispatch, success, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const strengthInfo = getPasswordStrengthInfo(passwordStrength.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 mt-20">
      <div className="bg-white shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Create Account
          </h1>
          <p className="text-indigo-100 text-center mt-2">
            Join us today and get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-4"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  fieldErrors.name
                    ? "border-red-300 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-red-600 text-sm">{fieldErrors.name}</p>
            )}
          </div>

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
                className={`w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  fieldErrors.email
                    ? "border-red-300 bg-red-50 focus:ring-red-500"
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
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                disabled={loading}
              >
                <Zap className="w-3 h-3" />
                Generate
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
                className={`w-full pl-10 pr-12 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  fieldErrors.password
                    ? "border-red-300 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Create a strong password"
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Password Strength
                  </span>
                  <span
                    className={`text-xs font-semibold ${strengthInfo.textColor}`}
                  >
                    {strengthInfo.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${strengthInfo.color}`}
                    style={{ width: strengthInfo.width }}
                  />
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {[
                    { key: "length", text: "8+ chars" },
                    { key: "uppercase", text: "Uppercase" },
                    { key: "lowercase", text: "Lowercase" },
                    { key: "number", text: "Number" },
                    { key: "special", text: "Special" },
                  ].map(({ key, text }) => (
                    <div
                      key={key}
                      className={`flex items-center gap-1 ${
                        passwordStrength.requirements[key]
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          passwordStrength.requirements[key]
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fieldErrors.password && (
              <p className="text-red-600 text-sm">{fieldErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  fieldErrors.confirmPassword
                    ? "border-red-300 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div
                className={`text-xs flex items-center gap-1 ${
                  formData.password === formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                {formData.password === formData.confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </div>
            )}

            {fieldErrors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                {fieldErrors.avatar && (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <label className="flex-1">
                <div
                  className={`w-full px-4 py-2 border rounded text-center cursor-pointer transition-colors ${
                    loading
                      ? "bg-gray-100 cursor-not-allowed"
                      : fieldErrors.avatar
                      ? "bg-red-50 border-red-300 hover:bg-red-100"
                      : "bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {avatar ? "Change Picture" : "Upload Picture"}
                </div>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            </div>
            {fieldErrors.avatar && (
              <p className="text-red-600 text-sm">{fieldErrors.avatar}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || passwordStrength.score < 4}
            className={`w-full py-2 px-4 font-medium text-white rounded transition-all duration-200 flex items-center justify-center gap-2 ${
              loading || passwordStrength.score < 4
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating your account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;