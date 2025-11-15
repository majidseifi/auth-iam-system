import api from './api';

export interface RegisterData {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    role: string;
    is_active: boolean;
    email_verified: boolean;
}

export const authService = {
    async register(data: RegisterData) {
        const response = await api.post('/auth/register', data);
        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return user;
    },

    async login(data: LoginData) {
        const response = await api.post('/auth/login', data);
        const { accessToken, refreshToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return user;
    },

    async logout() {
        const refreshToken = localStorage.getItem('refreshToken');
        await api.post('/auth/logout', { refreshToken });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshTokeb');
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get('/auth/me');
        return response.data;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken')
    }
};