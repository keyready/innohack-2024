import { createSlice } from '@reduxjs/toolkit';

import { ProjectSchema } from '../types/ProjectSchema';
import { addProject } from '../service/addProject';

const initialState: ProjectSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const ProjectSlice = createSlice({
    name: 'ProjectSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProject.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addProject.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProjectActions } = ProjectSlice;
export const { reducer: ProjectReducer } = ProjectSlice;
