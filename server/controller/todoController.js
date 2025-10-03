import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodosByUser,
  updateTodo,
} from "../services/todoService.js";

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

export const getTodosByUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await getTodosByUser(userId);

    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};

// get one
export const getTodoByIdController = async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id, req.user.id);
    if (!todo) {
      return res.json({
        success: false,
        message: "todo not found",
      });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update todo
export const updateTodoController = async (req, res) => {
  try {
    const updatedTodo = await updateTodo(req.params.id, req.user.id, req.body);

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error("Update Todo Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete todo
export const deleteTodoController = async (req, res) => {
  try {
    const deleteToDo = await deleteTodo(req.params.id, req.user.id);
    if (!deleteToDo) {
      return res.status(400).json({
        success: false,
        message: "To do not Found",
      });
    }
    res.json({
      success: true,
      message: "Todo deleted successfully",
      data: deleteToDo,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};
