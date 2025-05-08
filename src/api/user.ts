// src/api/user.ts

import axios from '@/utils/axios';
import type { LoginRequest, LoginResponse } from '@/types/index';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>('/api/auth/login', data);
    return response.data;
};

export const logout = async () => {
    return axios.post('/auth/logout');
};

export const getUserInfo = async () => {
    return axios.get('/api/auth/user');
};

// 添加注册接口
export const register = async (data: {
    username: string;
    email: string;
    password: string;
}): Promise<LoginResponse> => {  // 使用LoginResponse类型
    const response = await axios.post<LoginResponse>('/api/auth/register', data);
    return response.data;
};
// 添加检查用户名是否可用接口
export const checkUsername = async (username: string): Promise<{ available: boolean }> => {
    const response = await axios.get<{ available: boolean }>(`/api/auth/check-username?username=${username}`);
    return response.data;
};
