import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchema } from '../types/UserSchema';
import { signupUser } from '../services/authServices/signupUser';
import { loginUser } from '../services/authServices/loginUser';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
    token: undefined,
    isFirstVisit: true,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        },
        initApplication: (state) => {
            state.token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
        },
        logout: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.data = undefined;
            state.token = undefined;
            window.location.reload();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
