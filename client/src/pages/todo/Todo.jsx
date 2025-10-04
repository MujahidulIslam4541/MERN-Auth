import React, { useState } from 'react';
import { Check, Edit2, Trash2, Plus, Circle, CheckCircle2 } from 'lucide-react';

export default function Todo() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            name: "Learn React",
            description: "Practice hooks and context API",
            completed: false,
        },
        {
            id: 2,
            name: "Complete Assignment",
            description: "Finish MERN stack todo project",
            completed: true,
        },
    ]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addTodo = () => {
        if (name.trim() && description.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                name,
                description,
                completed: false
            }]);
            setName('');
            setDescription('');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const completedCount = todos.filter(t => t.completed).length;

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

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Task name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Add description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                            />
                            <button
                                onClick={addTodo}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-md hover:shadow-xl"
                            >
                                Add Task
                            </button>
                        </div>
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
                                    key={todo.id}
                                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${todo.completed ? 'border-green-400 bg-green-50/30' : 'border-indigo-400'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => toggleComplete(todo.id)}
                                            className="mt-1 transition-transform hover:scale-110"
                                        >
                                            {todo.completed ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
                                            )}
                                        </button>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className={`text-lg font-semibold mb-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                                                        }`}>
                                                        {todo.name}
                                                    </h4>
                                                    <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                                                        }`}>
                                                        {todo.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {todo.completed ? (
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
                                                <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
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
        </div>
    );
}