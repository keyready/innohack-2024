import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { User } from '../../types/User';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

export const loginUser = createAsyncThunk<{ access_token: string }, User, ThunkConfig<string>>(
    'User/loginUser',
    async (newUser, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response: AxiosResponse<{ access_token: string }> = await extra.api.post(
                '/api/auth/sign-in',
                newUser,
            );

            if (response.status > 300) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.access_token);

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
