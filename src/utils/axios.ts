import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers['Authorization'] = `Bearer ${userStore.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.code !== 200) {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });

            // 处理特定错误码
            if (res.code === 401) {
                // 未授权，跳转登录
                const userStore = useUserStore();
                userStore.logout();
                location.reload();
            }

            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;