import { useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add Todo
    const handleAddTodo = () => {
        if (!form.name || !form.description) return;
        const newTodo = {
            id: Date.now(),
            name: form.name,
            description: form.description,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setForm({ name: "", description: "" });
    };

    // Delete Todo
    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Complete Todo
    const handleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Update Todo (basic - toggle name update for now)
    const handleUpdate = (id) => {
        const newName = prompt("Enter new name:");
        const newDesc = prompt("Enter new description:");
        if (newName && newDesc) {
            setTodos(
                todos.map((todo) =>
                    todo.id === id
                        ? { ...todo, name: newName, description: newDesc }
                        : todo
                )
            );
        }
    };
    return (
        <div>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Todo App</h2>

                {/* Form Section */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        placeholder="Enter Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        className="input input-bordered w-full"
                    />
                    <button onClick={handleAddTodo} className="btn btn-primary">
                        Add Todo
                    </button>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.length > 0 ? (
                                todos.map((todo, index) => (
                                    <tr key={todo.id}>
                                        <td>{index + 1}</td>
                                        <td
                                            className={`${todo.completed ? "line-through text-gray-400" : ""
                                                }`}
                                        >
                                            {todo.name}
                                        </td>
                                        <td
                                            className={`${todo.completed ? "line-through text-gray-400" : ""
                                                }`}
                                        >
                                            {todo.description}
                                        </td>
                                        <td>
                                            {todo.completed ? (
                                                <span className="badge badge-success">Completed</span>
                                            ) : (
                                                <span className="badge badge-warning">Pending</span>
                                            )}
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleUpdate(todo.id)}
                                                className="btn btn-sm btn-info"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(todo.id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleComplete(todo.id)}
                                                className="btn btn-sm btn-success"
                                            >
                                                {todo.completed ? "Undo" : "Complete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500">
                                        No Todos Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Todo
