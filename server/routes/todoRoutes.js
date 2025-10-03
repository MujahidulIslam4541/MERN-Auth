import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  createTodoController,
  getTodoByIdController,
  getTodosByUserController,
  updateTodoController,
} from "../controller/todoController.js";
const todoRoute = express.Router();

todoRoute.post("/createTodo", userAuth, createTodoController);
todoRoute.get("/todos", userAuth, getTodosByUserController);
todoRoute.get("/todo/:id", userAuth, getTodoByIdController);
todoRoute.patch("/todo/update/:id", userAuth, updateTodoController);

export default todoRoute;
