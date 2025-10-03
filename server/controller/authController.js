// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import UserModel from "../models/userModels.js";
// import transporter from "../config/nodemailer.js";
// import {
//   EMAIL_VERIFY_TEMPLATE,
//   PASSWORD_RESET_TEMPLATE,
// } from "../config/emailTemplates.js";

// // Controller function for user registration
// export const register = async (req, res) => {
//   // Extract required fields from the request body
//   const { name, email, password } = req.body;

//   // Basic validation: check if any field is missing
//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "All fields are required" });
//   }

//   try {
//     // Step 1: Check if the user already exists in the database by email
//     const ExistingUser = await UserModel.findOne({ email });

//     if (ExistingUser) {
//       // If a user with the same email already exists, stop here
//       return res.json({ success: false, message: "User already exists" });
//     }

//     // Step 2: Hash the password before saving
//     // bcrypt.hash(password, saltRounds)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Step 3: Create a new user with the hashed password
//     const newUser = new UserModel({ name, email, password: hashedPassword });
//     await newUser.save();

//     // Step 4: Generate a JWT token for authentication
//     // Payload: user id, secret: JWT_SECRET, expires in 1 day
//     const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     // Step 5: Send the JWT token in a cookie
//     res.cookie("token", token, {
//       httpOnly: true, // prevents access to cookie via JavaScript (security)
//       secure: process.env.NODE_ENV === "production", // only true in production with HTTPS
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // handle cross-site cookies
//       maxAge: 7 * 24 * 60 * 60 * 1000, // cookie valid for 7 days
//     });

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "📧 Email Verification - Complete Your Registration",
//       text: `Hello ${email},

//         Thank you for registering with us! 🎉  

//         To complete your account setup and verify your email address, please click the verification link we’ve sent to you.  
//         If you don’t verify your email, you may not be able to access all the features of your account.  

//         If you didn’t request this registration, you can safely ignore this email.  

//         Best regards,  
//         The Support Team`,
//     };

//     // Use your transporter to send the email
//     await transporter.sendMail(mailOptions);

//     // Step 6: Send success response back to client
//     res.json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     // If any error occurs, send it back in response
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Controller function for user login
// export const login = async (req, res) => {
//   // Extract email and password from request body
//   const { email, password } = req.body;

//   // Basic validation: require both fields
//   if (!email || !password) {
//     // Return a JSON response indicating missing fields
//     return res.json({ success: false, message: "all field are required" });
//   }

//   try {
//     // Find the user in the database by email
//     const user = await UserModel.findOne({ email });

//     // If no user found, respond with a helpful message
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "user not found please register then login",
//       });
//     }

//     // Compare the provided password with the hashed password stored in DB
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       // If password doesn't match, return an invalid password message
//       return res.json({ success: false, message: "invalid password" });
//     }

//     // Step 4: Generate a JWT token for authentication
//     // NOTE: This line is kept exactly as in your code (no logic change).
//     // Payload: user id, secret: JWT_SECRET, expires in 1 day
//     const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     // Step 5: Send the JWT token in a cookie
//     res.cookie("token", token, {
//       httpOnly: true, // Prevents client-side JS from reading the cookie (mitigates XSS)
//       secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // cross-site cookie behavior
//       maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifespan: 7 days (in milliseconds)
//     });

//     // Return a success response (cookie carries the token)
//     return res.json({ success: true });
//   } catch (error) {
//     // On any error, respond with a generic server error message
//     return res.json({ success: false, message: "server error" });
//   }
// };

// // Controller function for user logOut
// export const logOut = async (req, res) => {
//   try {
//     // Clearing the 'token' cookie from the user's browser
//     // This is how we effectively log out the user from the server side.
//     res.clearCookie("token", {
//       httpOnly: true, // This ensures that the cookie cannot be accessed via client-side JavaScript.
//       // It helps prevent Cross-Site Scripting (XSS) attacks.
//       secure: process.env.NODE_ENV === "production",
//       // In production environment, this cookie will only be sent over HTTPS.
//       // In development (localhost), it can be sent over HTTP.
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       // sameSite attribute controls whether the cookie is sent along with cross-site requests.
//       // "strict" prevents sending in cross-site requests (good for dev).
//       // "none" allows cross-site usage (necessary for production with HTTPS and cross-domain frontend/backend).
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       // Sets the cookie expiration time.
//       // Here it is 7 days in milliseconds (7 days * 24 hours * 60 minutes * 60 seconds * 1000 ms)
//     });

//     // Sending JSON response back to the client indicating successful logout
//     return res.json({ success: true, message: "user logOut Successful" });
//   } catch (error) {
//     // Catch any errors that happen during logout process and send error response
//     return res.json({ success: false, message: "server error" });
//   }
// };

// // Controller function to send a verification OTP to the user's email
// export const sendVerifyOtp = async (req, res) => {
//   try {
//     // Get user ID from the authenticated request (middleware must attach user info to req)
//     const userId = req.user.id;

//     // Find the user in the database using their ID
//     const user = await UserModel.findById(userId);

//     // If user does not exist, send error response
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // If the user's account is already verified, send an error response
//     if (user.isAccountVerified) {
//       return res.json({ success: false, message: "User already verified" });
//     }

//     // Generate a 6-digit OTP for email verification
//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     // Save the OTP and its expiration time in the user document
//     user.verifyOTP = otp;
//     user.verifyOTPExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour expiration
//     await user.save();

//     // Prepare the email options including sender, recipient, subject, and HTML content
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL, // Email address of the sender from environment variables
//       to: user.email, // Recipient email address
//       subject: "Account Verification OTP", // Email subject line
//       // text: `Your OTP is ${otp}. Verify your account using this OTP.`, // Plain text alternative (optional)
//       html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
//         "{{email}}",
//         user.email
//       ), // HTML template with OTP and user email dynamically inserted
//     };

//     // Send the email using the configured transporter
//     await transporter.sendMail(mailOptions);

//     // Respond to the client indicating the OTP has been sent successfully
//     res.json({ success: true, message: "Verification OTP sent to email" });
//   } catch (error) {
//     // Catch any errors and send them in the response
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Controller function to verify user's email using OTP
// export const verifyEmail = async (req, res) => {
//   // Extract OTP from request body
//   const { otp } = req.body;

//   // Get user ID from authenticated request (middleware should attach user info to req)
//   const userId = req.user.id;

//   // If OTP is not provided in request, return error
//   if (!otp) {
//     return res.json({ success: false, message: "OTP is required" });
//   }

//   try {
//     // Find the user in the database using their ID
//     const user = await UserModel.findById(userId);

//     // If user is not found in database, return error
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Check if provided OTP matches the one saved in the database
//     if (user.verifyOTP !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     // Check if OTP has expired
//     if (user.verifyOTPExpireAt < Date.now()) {
//       return res.json({ success: false, message: "OTP Expired" });
//     }

//     // Mark user's account as verified
//     user.isAccountVerified = true;

//     // Clear OTP and expiration time from user document
//     user.verifyOTP = "";
//     user.verifyOTPExpireAt = 0;

//     // Save updated user data to the database
//     await user.save();

//     // Return success response
//     return res.json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     // Catch any errors and return them in the response
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Controller function to check if the user is authenticated
// export const isAuthenticated = async (req, res) => {
//   try {
//     // Simply return success true if this endpoint is reached
//     // Assumes that authentication middleware has already verified the user's token/session
//     return res.json({ success: true });
//   } catch (error) {
//     // Catch any unexpected errors and return them in the response
//     return res.json({ success: false, message: error.message });
//   }
// };

// // Controller function to send a reset password OTP to user's email
// export const resetPasswordOTP = async (req, res) => {
//   // Extract email from request body
//   const { email } = req.body;

//   // Check if email is provided
//   if (!email) {
//     return res.json({ success: false, message: "email is required" });
//   }

//   try {
//     // Find user in the database using the provided email
//     const user = await UserModel.findOne({ email });

//     // If user does not exist, return error
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Generate a 6-digit OTP for password reset
//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     // Save the OTP and its expiration time in the user document
//     user.resetOTP = otp;
//     user.resetOTPExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     // Prepare email options
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL, // Sender email from environment variables
//       to: user.email, // Recipient email
//       subject: "Password Reset OTP", // Subject of the email
//       // text: `Your reset password OTP  ${otp}.`, // Optional plain text version
//       html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
//         "{{email}}",
//         user.email
//       ), // HTML template with OTP and email dynamically inserted
//     };

//     // Send the OTP email
//     await transporter.sendMail(mailOptions);

//     // Respond to client indicating OTP has been sent
//     res.json({ success: true, message: "Reset password OTP sent to email" });
//   } catch (error) {
//     // Catch any unexpected errors and return them in the response
//     return res.json({ success: false, message: error.message });
//   }
// };


// // Controller function to reset user's password using OTP

// export const resetPassword = async (req, res) => {
//   // Extract email, OTP, and new password from request body
//   const { email, otp, newPassword } = req.body;

//   // Validate all required fields
//   if (!email || !otp || !newPassword) {
//     return res.json({ success: false, message: "All fields are required" });
//   }

//   try {
//     // Find user in the database using the provided email
//     const user = await UserModel.findOne({ email });

//     // If user does not exist, return error
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Check if OTP exists and matches the one in the database
//     if (user.resetOTP === "" || user.resetOTP !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     // Check if OTP has expired
//     if (user.resetOTPExpireAt < Date.now())
//        {
//       return res.json({ success: false, message: "OTP time expired" });
//     }

//     // Hash the new password using bcrypt
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password and clear OTP and expiration time
//     user.password = hashedPassword;
//     user.resetOTP = "";
//     user.resetOTPExpireAt = 0;

//     // Save updated user data to the database
//     await user.save();

//     // Return success response to the client
//     return res.json({
//       success: true,
//       message: "Your password has been reset successfully",
//     });
//   } catch (error) {
//     // Catch any unexpected errors and return them
//     res.json({ success: false, message: error.message });
//   }
// };
// controllers/authController.js

import {
  registerService,
  loginService,
  sendVerifyOtpService,
  verifyEmailService,
  resetPasswordOtpService,
  resetPasswordService,
} from "../services/authService.js";

// ==================== REGISTER ====================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Call service
    const { token } = await registerService({ name, email, password });

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call service
    const { token } = await loginService({ email, password });

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== LOGOUT ====================
export const logOut = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== SEND VERIFY OTP ====================
export const sendVerifyOtp = async (req, res) => {
  try {
    await sendVerifyOtpService(req.user.id);
    res.json({ success: true, message: "Verification OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== VERIFY EMAIL ====================
export const verifyEmail = async (req, res) => {
  try {
    await verifyEmailService(req.user.id, req.body.otp);
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== IS AUTH ====================
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ==================== RESET PASSWORD OTP ====================
export const resetPasswordOTP = async (req, res) => {
  try {
    await resetPasswordOtpService(req.body.email);
    res.json({ success: true, message: "Password reset OTP sent" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==================== RESET PASSWORD ====================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    await resetPasswordService({ email, otp, newPassword });
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
