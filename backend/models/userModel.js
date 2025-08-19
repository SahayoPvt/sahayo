import mongoose from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  nano_id: {
    type: String,
    unique: true,
    sparse: true // Allows null/undefined for normal user signups
  },
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [25, "Invalid name. Please enter a name with fewer than 25 characters"],
    minLength: [3, "Name should contain more than 3 characters"]
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false
  },
  avatar: {
    public_id: { type: String },
    url: { type: String }
  },
  role: { type: String, default: "user" },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY || "hfdiqwdsafhfdfhisfjdgawsd", {
    expiresIn: process.env.JWT_EXPIRE || "3d"
  });
};

userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};

// OTP for email verification
userSchema.methods.generateVerificationOTP = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.otp = crypto.createHash("sha256").update(otp).digest("hex");
  this.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

// Password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
  return resetToken;
};

export default mongoose.model("User", userSchema);
