// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";
import transporter from "../config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js";

// ==================== REGISTER SERVICE ====================
export const registerService = async ({ name, email, password }) => {
  // Check if user already exists
  const ExistingUser = await UserModel.findOne({ email });
  if (ExistingUser) {
    throw new Error("User already exists");
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user to DB
  const newUser = new UserModel({ name, email, password: hashedPassword });
  await newUser.save();

  // Create JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Send verification email (simple version)
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "📧 Email Verification - Complete Your Registration",
    text: `Hello ${email}, Please verify your account.`,
  };
  await transporter.sendMail(mailOptions);

  return { token, newUser };
};

// ==================== LOGIN SERVICE ====================
export const loginService = async ({ email, password }) => {
  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, user };
};

// ==================== SEND VERIFY OTP SERVICE ====================
export const sendVerifyOtpService = async (userId) => {
  // Find user by ID
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.isAccountVerified) throw new Error("User already verified");

  // Generate OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOTP = otp;
  user.verifyOTPExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  await user.save();

  // Send OTP via email
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Account Verification OTP",
    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      user.email
    ),
  };

  await transporter.sendMail(mailOptions);
  return true;
};

// ==================== VERIFY EMAIL SERVICE ====================
export const verifyEmailService = async (userId, otp) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.verifyOTP !== otp) throw new Error("Invalid OTP");
  if (user.verifyOTPExpireAt < Date.now()) throw new Error("OTP expired");

  // Update user as verified
  user.isAccountVerified = true;
  user.verifyOTP = "";
  user.verifyOTPExpireAt = 0;
  await user.save();

  return true;
};

// ==================== RESET PASSWORD OTP SERVICE ====================
export const resetPasswordOtpService = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  // Generate OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOTP = otp;
  user.resetOTPExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // Send OTP via email
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Password Reset OTP",
    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      user.email
    ),
  };

  await transporter.sendMail(mailOptions);
  return true;
};

// ==================== RESET PASSWORD SERVICE ====================
export const resetPasswordService = async ({ email, otp, newPassword }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.resetOTP !== otp) throw new Error("Invalid OTP");
  if (user.resetOTPExpireAt < Date.now()) throw new Error("OTP expired");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetOTP = "";
  user.resetOTPExpireAt = 0;
  await user.save();

  return true;
};
