import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModels";

// Controller function for user registration
export const register = async (req, res) => {
  // Extract required fields from the request body
  const { name, email, password } = req.body;

  // Basic validation: check if any field is missing
  if (!name || !email || !password) {
    return res.send({ success: false, message: "All fields are required" });
  }

  try {
    // Step 1: Check if the user already exists in the database by email
    const ExistingUser = await UserModel.findOne({ email });

    if (ExistingUser) {
      // If a user with the same email already exists, stop here
      return res.send({ success: false, message: "User already exists" });
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

    // Step 6: Send success response back to client
    res.send({ success: true, message: "User registered successfully" });
  } catch (error) {
    // If any error occurs, send it back in response
    res.send({ success: false, message: error.message });
  }
};
