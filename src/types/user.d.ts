interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
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