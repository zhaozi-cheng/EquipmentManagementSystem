type UserRole = 'admin' | 'device_manager' | 'maintainer' | 'user';

interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;  // 使用新定义的类型
    createdAt: string;
    updatedAt: string;
}
export interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: User;
}