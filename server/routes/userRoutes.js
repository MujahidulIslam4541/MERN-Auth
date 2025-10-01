import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserProfile } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.get("/profileData/:id", userAuth, getUserProfile);

export default userRouter;
