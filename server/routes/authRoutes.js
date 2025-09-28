import express from "express";
import { login, logOut, register } from "../controller/authController.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/logIn", login);
authRouter.post("/logOut", logOut);

export default authRouter;