import axios from '@/utils/axios';

// 获取用户权限列表
export const getUserPermissions = async () => {
    return axios.get('/api/permissions');
};

// 获取所有权限列表
export const getAllPermissions = async () => {
    return axios.get('/api/permissions/all');
};

// 获取角色权限
export const getRolePermissions = async (role: string) => {
    return axios.get(`/api/permissions/roles/${role}`);
};

// 更新角色权限
export const updateRolePermissions = async (role: string, permissionCodes: string[]) => {
    return axios.put(`/api/permissions/roles/${role}`, { permissionCodes });
};