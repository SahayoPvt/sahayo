import handleAsyncError from "../middleware/handleAsyncError.js";
import crypto from "crypto";
import HandleError from "../utils/handleError.js";
import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail, sendOTPEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadImageOnCloudnary } from "../utils/cloudinary.js";
import 'dotenv/config';

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { public_id, secure_url } = await uploadImageOnCloudnary(
    req.file?.path,
    "avatar"
  );
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: public_id,
      url: secure_url,
    },
  });
  sendToken(user, 201, "account created successfully", res);
});

//send Otp on Email
export const SendOtpOnMail=handleAsyncError(async(req,res,next)=>{
  const {email}=req.body;
  const user = await User.findOne({email});
    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    const otp = user.generateVerificationOTP();
    await user.save()
  
    try {

       await sendOTPEmail({
            email: user.email,
            subject: "Email Verification OTP",
            message: `Your OTP for email verification is: ${otp}\n\nThis OTP will expire in 10 minutes.`
        });
        res.status(201).json({
            success: true,
            message: `OTP has been sent to your registered email address.`,
            userId: user._id,
            user
        });
    } catch (error) {
       console.error("Email send error:", error);
        await User.deleteOne({ email });
        return next(new HandleError("Failed to send verification email", 500));
    }


})

// Verify Email with OTP
export const verifyEmail = handleAsyncError(async (req, res, next) => {
    const { userId, otp } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    // Check if OTP matches and not expired
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");    
    if (user.otp !== hashedOTP || user.otpExpiry < Date.now()) {
        return next(new HandleError("Invalid or expired OTP", 400));
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    sendToken(user, 200, "Email verified successfully", res);
});

// Resend Verification OTP
export const resendVerificationOTP = handleAsyncError(async (req, res, next) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return next(new HandleError("User not found", 404));
    }

    if (user.isVerified) {
        return next(new HandleError("Email is already verified", 400));
    }

    // Generate new OTP
    const otp = user.generateVerificationOTP();
    await user.save();

    // Send verification email
    try {
        await sendEmail({
            email: user.email,
            subject: "New Email Verification OTP",
            message: `Your new OTP for email verification is: ${otp}\n\nThis OTP will expire in 10 minutes.`
        });

        res.status(200).json({
            success: true,
            message: `New OTP sent to your email successfully`,
            userId: user._id
        });
    } catch (error) {
        return next(new HandleError("Failed to send verification email", 500));
    }
});

// Login (updated to check verification status)
export const loginUser = handleAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Email or password cannot be empty", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new HandleError("Invalid Email or password", 401));
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return next(new HandleError("Invalid Email or password", 401));
    }

    // Check if email is verified
    if (!user.isVerified) {
        return res.status(403).json({
            success: false,
            isVerified: false,
            message: "Email not verified. Please verify your email first.",
            userId: user._id
        });
    }

    sendToken(user, 200, "User logged in successfully", res);
});


// /Logout
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged out",
  });
});

// Forgot Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("No account found with this email address.", 400));
  }
  let resetToken;
  try {
    resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(
      new HandleError("Could not save reset token, please try again later", 500)
    );
  }
  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordURL}. \n\n This link will expire in 30 minutes.\n\n If you didn’t request a password reset, please ignore this message.`;
  try {
    // Send Email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Password reset link has been sent to your email!
`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email couldn't be sent , please try again later", 500)
    );
  }
});

//Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now()},
  });
  if (!user) {
    return next(
      new HandleError(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password doesn't match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200,"Password reset successfully", res);
});

// Get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update password
export const updatePassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const checkPasswordMatch = await user.verifyPassword(oldPassword);
  if (!checkPasswordMatch) {
    return next(new HandleError("Old password is incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new HandleError("Password doesn't match", 400));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, "Password Updated successfully" ,res);
});

//Updating user profile
export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const updateUserDetails = {
    name,
    email,
  };
  if (avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updateUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });
});

// Admin- Getting user information
export const getUsersList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Admin- Getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new HandleError(`User doesn't exist with this id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Admin- Changing user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const newUserData = {
    role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin - Delete User Profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }
  const imageId = user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId);
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});


