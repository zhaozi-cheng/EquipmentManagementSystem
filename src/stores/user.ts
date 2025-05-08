// src/stores/user.ts
import { defineStore } from 'pinia';
import { login, logout, getUserInfo, register } from '@/api/user';
import type { User, LoginRequest, LoginResponse } from '@/types/index';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null as User | null,
    }),
    actions: {
        // src/stores/user.ts
        async login(loginData: LoginRequest) {
            try {
                const response = await axios.post('/api/auth/login', loginData);
                const data = response.data as LoginResponse;

                // 确保响应数据存在且结构正确
                if (!response.data || !response.data.token || !response.data.user) {
                    throw new Error('服务器返回的数据格式不正确');
                }

                if (!data.token) {
                    throw new Error('登录失败: 未获取到token');
                }
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);

                return response.data;
            } catch (error: any) {
                let errorMessage = '登录失败';

                if (error.response) {
                    if (error.response.status === 404) {
                        errorMessage = 'API端点不存在，请检查后端服务';
                    } else {
                        errorMessage = error.response.data?.message || errorMessage;
                    }
                }

                throw new Error(errorMessage);
            }
        }
        ,
        async logout() {
            try {
                // 先尝试调用后端注销接口
                await fetch('http://localhost:3001/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                // 无论后端注销是否成功，都清除前端状态
                this.token = '';
                this.user = null;
                localStorage.removeItem('token');
            } catch (error) {
                // 即使注销请求失败，也清除本地状态
                this.token = '';
                this.user = null;
                localStorage.removeItem('token');
                console.error('注销时出错:', error);
            }
        },
        async getUserInfo() {
            try {
                const response = await getUserInfo();
                console.log('用户信息:', response.data); // 添加日志
                this.user = response.data;
                // 确保本地存储也更新
                if (this.user) {
                    localStorage.setItem('user', JSON.stringify(this.user));
                }
            } catch (error) {
                console.error('获取用户信息失败:', error);
                throw error;
            }
        },
        async register(registerData: {
            username: string;
            email: string;
            password: string;
        }) {
            try {
                const response = await fetch('http://localhost:3001/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registerData),
                });

                // 检查响应状态
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `注册失败: ${response.statusText}`);
                }

                const data = await response.json();

                // 验证响应结构
                if (!data.token || !data.user) {
                    throw new Error('服务器返回的数据格式不正确');
                }

                // 更新store状态
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);

                return data;
            } catch (error: any) {
                // 统一错误处理
                const errorMessage = error.message || '注册过程中发生未知错误';
                console.error('注册错误:', error);
                throw new Error(errorMessage);
            }
        }

    },
});
