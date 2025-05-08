import axios from 'axios';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user';

const service = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000, // 增加超时时间
    withCredentials: true, // 如果需要跨域携带cookie
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.Authorization = `Bearer ${userStore.token}`;
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
        return response;
    },
    error => {
        console.error('响应错误:', error);

        if (error.response) {
            // 有响应但状态码不在2xx范围内
            const { status, data } = error.response;
            let errorMessage = data?.message || '请求失败';

            if (status === 401) {
                errorMessage = '未授权，请重新登录';
                const userStore = useUserStore();
                userStore.logout();
                window.location.href = '/login';
            } else if (status === 403) {
                errorMessage = '拒绝访问';
            } else if (status === 404) {
                errorMessage = '资源不存在';
            } else if (status >= 500) {
                errorMessage = '服务器错误';
            }

            message.error(errorMessage);
        } else if (error.request) {
            // 请求已发出但没有收到响应
            message.error('网络错误，请检查网络连接');
        } else {
            // 请求配置出错
            message.error('请求配置错误');
        }

        return Promise.reject(error);
    }
);

export default service;