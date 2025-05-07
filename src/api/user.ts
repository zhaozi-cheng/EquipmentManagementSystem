// src/api/user.ts

import axios from '@/utils/axios';
import type { LoginRequest, LoginResponse } from '@/types/user';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('/api/auth/login', data);
    return response.data;
};

export const logout = async () => {
    return axios.post('/api/auth/logout');
};

export const getUserInfo = async () => {
    return axios.get('/api/auth/user');
};
