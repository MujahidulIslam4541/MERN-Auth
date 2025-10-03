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
