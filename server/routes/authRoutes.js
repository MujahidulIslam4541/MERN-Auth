import express from "express";
import {
  isAuthenticated,
  login,
  logOut,
  register,
  resetPassword,
  resetPasswordOTP,
  sendVerifyOtp,
  verifyEmail,
} from "../controller/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/logIn", login);
authRouter.post("/logOut", logOut);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/reset-otp-send",  resetPasswordOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
