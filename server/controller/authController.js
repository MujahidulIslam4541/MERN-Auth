import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";
import transporter from "../config/nodemailer.js";

// Controller function for user registration
export const register = async (req, res) => {
  // Extract required fields from the request body
  const { name, email, password } = req.body;

  // Basic validation: check if any field is missing
  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    // Step 1: Check if the user already exists in the database by email
    const ExistingUser = await UserModel.findOne({ email });

    if (ExistingUser) {
      // If a user with the same email already exists, stop here
      return res.json({ success: false, message: "User already exists" });
    }

    // Step 2: Hash the password before saving
    // bcrypt.hash(password, saltRounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Create a new user with the hashed password
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Step 4: Generate a JWT token for authentication
    // Payload: user id, secret: JWT_SECRET, expires in 1 day
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Step 5: Send the JWT token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents access to cookie via JavaScript (security)
      secure: process.env.NODE_ENV === "production", // only true in production with HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // handle cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie valid for 7 days
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "📧 Email Verification - Complete Your Registration",
      text: `Hello ${email},

        Thank you for registering with us! 🎉  

        To complete your account setup and verify your email address, please click the verification link we’ve sent to you.  
        If you don’t verify your email, you may not be able to access all the features of your account.  

        If you didn’t request this registration, you can safely ignore this email.  

        Best regards,  
        The Support Team`,
    };

    // Use your transporter to send the email
    await transporter.sendMail(mailOptions);

    // Step 6: Send success response back to client
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    // If any error occurs, send it back in response
    return res.json({ success: false, message: error.message });
  }
};

// Controller function for user login
export const login = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Basic validation: require both fields
  if (!email || !password) {
    // Return a JSON response indicating missing fields
    return res.json({ success: false, message: "all field are required" });
  }

  try {
    // Find the user in the database by email
    const user = await UserModel.findOne({ email });

    // If no user found, respond with a helpful message
    if (!user) {
      return res.json({
        success: false,
        message: "user not found please register then login",
      });
    }

    // Compare the provided password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If password doesn't match, return an invalid password message
      return res.json({ success: false, message: "invalid password" });
    }

    // Step 4: Generate a JWT token for authentication
    // NOTE: This line is kept exactly as in your code (no logic change).
    // Payload: user id, secret: JWT_SECRET, expires in 1 day
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Step 5: Send the JWT token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from reading the cookie (mitigates XSS)
      secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // cross-site cookie behavior
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifespan: 7 days (in milliseconds)
    });

    // Return a success response (cookie carries the token)
    return res.json({ success: true });
  } catch (error) {
    // On any error, respond with a generic server error message
    return res.json({ success: false, message: "server error" });
  }
};

// Controller function for user logOut
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, // Prevents client-side JS from reading the cookie (mitigates XSS)
      secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // cross-site cookie behavior
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifespan: 7 days (in milliseconds)
    });
    return res.json({ success: true, message: "user logOut Successful" });
  } catch (error) {
    return res.json({ success: false, message: "server error" });
  }
};

// controller sends email to user for verification
export const sendVerificationEmail = async (req, res) => {
  try {
    const userId = req.body;
    const user = await UserModel.findById({ _id: userId });
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "user already  verified" });
    }
    // create otp for email verification
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.verifyOTP = otp;
    user.verifyOTPExpireAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification  OTP",
      text: ` your otp is ${otp} .verify your account using this otp`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Verification otp send on email" });
  } catch (error) {
    return res.json({ success: false, message: "server error" });
  }
};

// verify email with otp
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "missing Details" });
  }
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ success: false, message: "INvalid OTP" });
    }
    if (user.verifyOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }
    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "verified email successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
