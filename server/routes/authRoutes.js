import express from "express";
import {
  login,
  logOut,
  register,
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

export default authRouter;
