import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    description: string;
    dateTime: string;
    location: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

interface TasksState {
    list: Task[];
}

const initialState: TasksState = {
    list: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.list.push(action.payload);
        },
        updateTaskStatus(
            state,
            action: PayloadAction<{ id: string; status: Task['status'] }>
        ) {
            const task = state.list.find((t) => t.id === action.payload.id);
            if (task) task.status = action.payload.status;
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.list = state.list.filter((t) => t.id !== action.payload);
        },
    },
});

export const { addTask, updateTaskStatus, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;