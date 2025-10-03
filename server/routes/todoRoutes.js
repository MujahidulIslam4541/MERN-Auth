import express from "express";
import userAuth from "../middleware/userAuth.js";
import { createTodoController } from "../controller/todoController.js";
const todoRoute=express.Router()

todoRoute.post("/createTodo",userAuth,createTodoController)

export default todoRoute;