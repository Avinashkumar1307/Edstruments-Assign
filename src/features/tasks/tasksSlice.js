import { createSlice } from '@reduxjs/toolkit';

// Utility function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

// Utility function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: loadTasksFromLocalStorage(),
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },
        editTask: (state, action) => {
            const { id, title } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
            }
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
            saveTasksToLocalStorage(state.tasks); // Save updated tasks to localStorage
        },
    },
});

export const { addTask, editTask, deleteTask, toggleComplete, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
