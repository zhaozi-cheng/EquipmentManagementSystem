// src/stores/user.ts

import { defineStore } from 'pinia';
import { login, logout, getUserInfo } from '@/api/user';
import type { User, LoginRequest, LoginResponse } from '@/types/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null as User | null,
    }),
    actions: {
        async login(loginData: LoginRequest) {
            try {
                const response: LoginResponse = await login(loginData);
                this.token = response.token;
                this.user = response.user;
                localStorage.setItem('token', this.token);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            try {
                await logout();
                this.token = '';
                this.user = null;
                localStorage.removeItem('token');
            } catch (error) {
                throw error;
            }
        },
        async getUserInfo() {
            try {
                const response = await getUserInfo();
                this.user = response.data;
            } catch (error) {
                throw error;
            }
        },
    },
});
