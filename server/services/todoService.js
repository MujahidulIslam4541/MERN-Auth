import ToDoModel from "../models/todoModels.js";

export const createTodo = async (userId, data) => {
  const todo = new ToDoModel({
    ...data,
    user: userId,
  });
  await todo.save();
  return todo;
};

export const getTodosByUser = async (userId) => {
  return await ToDoModel.find({ user: userId, isDeleted: false }).sort({
    createdAt: -1,
  });
};

// Get Single Todo by ID
export const getTodoById = async (toDoId, userId) => {
  return await ToDoModel.findOne({
    _id: toDoId,
    user: userId,
    isDeleted: false,
  });
};


// update todo by id
export const updateTodo = async (todoId, userId, data) => {
  // Step 1: find todo by id
  const todo = await ToDoModel.findById(todoId);

  // Step 2: check todo exists or not
  if (!todo || todo.isDeleted) {
    return null; // not found
  }

  // Step 3: check ownership
  if (todo.user.toString() !== userId.toString()) {
    return null; // user mismatch
  }

  // Step 4: update fields
  todo.name = data.name || todo.name;
  todo.description = data.description || todo.description;
  todo.isComplete = data.isComplete ?? todo.isComplete;

  // Step 5: save updated todo
  await todo.save();

  return todo;
};
