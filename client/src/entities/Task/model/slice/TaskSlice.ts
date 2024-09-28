import { createSlice } from '@reduxjs/toolkit';

import { TaskSchema } from '../types/TaskSchema';
import { createTask } from '../service/createTask';

const initialState: TaskSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const TaskSlice = createSlice({
    name: 'TaskSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: TaskActions } = TaskSlice;
export const { reducer: TaskReducer } = TaskSlice;
