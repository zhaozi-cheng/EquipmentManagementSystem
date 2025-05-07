// 角色类型
type Role = 'admin' | 'device_manager' | 'maintainer' | 'user';

// 权限类型
export interface Permission {
    id: string;
    name: string;
    code: string;
    description?: string;
}

// 角色权限关联
export interface RolePermission {
    role: Role;
    permissionCodes: string[];
}

// 用户角色关联
export interface UserRole {
    userId: string;
    role: Role;
}