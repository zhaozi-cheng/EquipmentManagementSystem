// src/types/index.ts
export type UserRole = 'admin' | 'device_manager' | 'maintainer' | 'user';

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface Permission {
    id: number;
    code: string;
    name: string;
    description?: string;
}

export interface RolePermission {
    role: UserRole;
    permissionCodes: string[];
}
