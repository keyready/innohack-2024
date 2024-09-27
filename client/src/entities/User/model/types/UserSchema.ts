import { User } from './User';

export interface TelegramUser {
    phone: string;
    username: string;
}

export interface UserSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
    token?: string;
    isFirstVisit?: boolean;

    telegramLoading?: boolean;
    telegramProfile?: TelegramUser;
}
