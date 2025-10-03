import ToDoModel from "../models/todoModel.js";


export const createTodo = async (userId, data) => {
  const todo = new ToDoModel({
    ...data,   
    user: userId
  });
  await todo.save();
  return todo;
};