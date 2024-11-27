import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, toggleComplete, setTasks } from '../features/tasks/tasksSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const TaskManagement = () => {
    const [newTask, setNewTask] = useState('');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const tasks = useSelector((state) => state.tasks.tasks);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user.username}`));
        if (storedTasks) {
            dispatch(setTasks(storedTasks));
        }
    }, [user.username, dispatch]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            const task = { id: Date.now(), title: newTask, completed: false };
            dispatch(addTask(task));
            setNewTask('');
            saveTasksToLocalStorage();
        }
    };

    const handleEditTask = () => {
        if (editTitle.trim()) {
            dispatch(editTask({ id: editId, title: editTitle }));
            setEditId(null);
            setEditTitle('');
            saveTasksToLocalStorage();
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
        saveTasksToLocalStorage();
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
        saveTasksToLocalStorage();
    };

    const saveTasksToLocalStorage = () => {
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(tasks));
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="p-4 w-[100vw] h-[100vh]">
            <div className='px-10 w-full '>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl">Task Management</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2"
                    >
                        Logout
                    </button>
                </div>
                <div className='px-10 w-full  flex justify-center py-5'>
                    <div className='max-w-lg  flex justify-center flex-col items-center'>
                        <div className="flex items-center space-x-4">
                            <textarea
                                type="text"
                                placeholder="New Task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleAddTask}
                                className="bg-blue-500 text-white rounded-md p-2 mb-4 hover:bg-blue-600 transition duration-300 text-nowrap"
                            >
                                Add Task
                            </button>
                        </div>
                        <div >
                            <ul className='grid grid-col-4'>
                                {tasks.map((task) => (
                                    <li key={task.id} className="flex items-center mb-2">
                                        {editId === task.id ? (
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="border p-2 mr-2"
                                            />
                                        ) : (
                                            <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                                                {task.title}
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleToggleComplete(task.id)}
                                            className="bg-green-500 text-white p-2 ml-2"
                                        >
                                            {task.completed ? 'Undo' : 'Complete'}
                                        </button>
                                        {editId === task.id ? (
                                            <button
                                                onClick={handleEditTask}
                                                className="bg-blue-500 text-white p-2 ml-2"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditId(task.id);
                                                    setEditTitle(task.title);
                                                }}
                                                className="bg-yellow-500 text-white p-2 ml-2"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="bg-red-500 text-white p-2 ml-2"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;