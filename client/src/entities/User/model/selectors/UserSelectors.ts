import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user?.data;
export const getUserIsLoading = (state: StateSchema) => state.user?.isLoading;
export const getUserError = (state: StateSchema) => state.user?.error;
export const getUserToken = (state: StateSchema) => state.user?.token;
export const getIsFirstAppVisit = (state: StateSchema) => state.user?.isFirstVisit;

export const getIsTelegramLoading = (state: StateSchema) => state.user?.telegramLoading;
export const getTelegramProfile = (state: StateSchema) => state.user?.telegramProfile;
