import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  createTodoController,
  deleteTodoController,
  getTodoByIdController,
  getTodosByUserPaginatedController,
  updateTodoController,
} from "../controller/todoController.js";
const todoRoute = express.Router();

todoRoute.post("/createTodo", userAuth, createTodoController);
todoRoute.get("/todos", userAuth, getTodosByUserPaginatedController);
todoRoute.get("/todo/:id", userAuth, getTodoByIdController);
todoRoute.patch("/todo/update/:id", userAuth, updateTodoController);
todoRoute.delete("/todo/:id", userAuth, deleteTodoController);

export default todoRoute;
