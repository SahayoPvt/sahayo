import User from "../models/userModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { name, email, avatar } = req.body; // phoneNumber is optional

    // Find if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // User already exists, generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "logging susscessfull",
        user
      });
    }

    // Create new user for Google login
    const randomPassword = crypto.randomBytes(16).toString("hex");
    const newUser = new User({
      name,
      email,
      password: randomPassword,
      avatar: { url: avatar },
      isVerified: true
    });
    user = await newUser.save();
     user=user.toObject({getters:true})
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "login successfull",
      user
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
