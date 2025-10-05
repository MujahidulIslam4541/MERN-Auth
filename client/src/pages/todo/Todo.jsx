import { useContext, useState } from 'react';
import { Edit2, Trash2, Plus, Circle, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast'
import axios from 'axios'
import { AppContent } from '../../context/AppContent';
import { useQuery } from '@tanstack/react-query'

export default function Todo() {
    const { backendUrl } = useContext(AppContent)
    axios.defaults.withCredentials = true;

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [deleteConfirm, setDeleteConfirm] = useState(null); // for delete modal

    // get todo
    const fetchTodos = async () => {
        const res = await axios.get(backendUrl + '/api/task/todos');
        return res.data;
    };
    const { data = [], refetch } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
    const todos = data?.data || [];

    // add todo
    const handleAddTodo = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const { data } = await axios.post(backendUrl + '/api/task/createTodo', { name, description })
        if (data.success) {
            toast.success(data.message)
            refetch()
            form.reset()
        }
        else {
            toast.error(data.message)
        }
    }

    // handle delete
    const handleDeleteTodo = async (id) => {
        try {
            const res = await axios.delete(backendUrl + `/api/task/todo/${id}`)
            if (res.data.success) {
                toast.success(res.data.message)
                refetch()
                setDeleteConfirm(null) // close modal
            }
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to delete task")
        }
    }

    // open delete confirmation modal
    const openDeleteModal = (todo) => {
        setDeleteConfirm(todo);
    };

    // close delete modal
    const closeDeleteModal = () => {
        setDeleteConfirm(null);
    };

    // open update modal
    const handleUpdateTodo = (id) => {
        const todo = todos.find(t => t._id === id);
        setSelectedTodo(todo);
        setFormData({ name: todo.name, description: todo.description || "" });
    };

    // close modal
    const closeModal = () => {
        setSelectedTodo(null);
        setFormData({ name: "", description: "" });
    };

    // handle update form submit
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Task name is required!");
            return;
        }

        try {
            const res = await axios.patch(
                backendUrl + `/api/task/todo/update/${selectedTodo._id}`,
                formData
            );

            if (res?.data?.success) {
                toast.success("Todo updated successfully!");
                closeModal();
                refetch();
            } else {
                toast.error(res?.data?.message || "Failed to update todo!");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Something went wrong while updating!");
        }
    };

    // isComplete
    const handleIsComplete = async (id, completed) => {
        console.log(id,completed)
        try {
            const res = await axios.patch(backendUrl + `/api/task/todo/update/${id}`, {
                isComplete: !completed  // toggle true/false
            });

            if (res.data.success) {
                toast.success("Status updated!");
                refetch(); // UI refresh
            } else {
                toast.error(res.data.message || "Failed to update status");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    }

    const completedCount = todos.filter(t => t.isComplete).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header with Stats */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        ✨ My Tasks
                    </h1>
                    <p className="text-gray-600">
                        {completedCount} of {todos.length} tasks completed
                    </p>
                    {todos.length > 0 && (
                        <div className="w-48 mx-auto mt-3 bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(completedCount / todos.length) * 100}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Split Layout: Form Left, Tasks Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Add Todo Card - Left Side */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-indigo-100 h-fit sticky top-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <Plus className="w-5 h-5 text-white" />
                            </div>
                            Add New Task
                        </h3>

                        <form onSubmit={handleAddTodo} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Task name..."
                                name='name'
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Add description..."
                                name='description'
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />
                            <button
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-md hover:shadow-xl"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>

                    {/* Tasks Grid - Right Side */}
                    <div className="space-y-4">
                        {todos.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
                            </div>
                        ) : (
                            todos.map((todo) => (
                                <div
                                    key={todo._id}
                                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${todo.isComplete ? 'border-green-400 bg-green-50/30' : 'border-indigo-400'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => handleIsComplete(todo._id, todo.isComplete)}
                                            className="mt-1 transition-transform hover:scale-110"
                                        >
                                            {todo.isComplete ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
                                            )}
                                        </button>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className={`text-lg font-semibold mb-1 ${todo.isComplete ? 'line-through text-gray-400' : 'text-gray-800'
                                                        }`}>
                                                        {todo.name}
                                                    </h4>
                                                    <p className={`text-sm ${todo.isComplete ? 'line-through text-gray-400' : 'text-gray-600'
                                                        }`}>
                                                        {todo.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {todo.isComplete ? (
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                            Done
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => handleUpdateTodo(todo._id)}
                                                    className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(todo)}
                                                    className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {selectedTodo && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
                        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                            Update Task
                        </h3>
                        <form onSubmit={handleSubmitUpdate} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Task name..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Add description..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-1/2 bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-400 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
                                >
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] border-2 border-red-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">
                                Are you sure?
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Do you really want to delete this task?
                            </p>
                            <p className="text-sm font-semibold text-gray-700 mb-6">
                                "{deleteConfirm.name}"
                            </p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={closeDeleteModal}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteTodo(deleteConfirm._id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}