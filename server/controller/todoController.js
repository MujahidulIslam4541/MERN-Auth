import { createTodo } from "../services/todoService";

export const createTodoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "ToDo name is required",
      });
    }

    const todo = await createTodo(userId, { name, description });
    res.status(201).json({
      success: true,
      message: "user data created",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
