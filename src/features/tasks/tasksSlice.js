import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, title } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
    },
});

export const { addTask, editTask, deleteTask, toggleComplete, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
