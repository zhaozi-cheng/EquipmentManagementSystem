// src/models/permission.model.ts
import pool from '../config/db';

interface Permission {
    id: number;
    code: string;
    name: string;
    description: string | null;
}

export const getAllPermissions = async (): Promise<Permission[]> => {
    const [rows] = await pool.query('SELECT * FROM permissions');
    return rows as Permission[];
};

export const getRolePermissions = async (role: string): Promise<string[]> => {
    const [rows] = await pool.query(
        'SELECT permission_code FROM role_permissions WHERE role = ?',
        [role]
    );
    return (rows as { permission_code: string }[]).map(r => r.permission_code);
};

export const updateRolePermissions = async (role: string, permissionCodes: string[]): Promise<void> => {
    await pool.query('DELETE FROM role_permissions WHERE role = ?', [role]);

    if (permissionCodes.length > 0) {
        const values = permissionCodes.map(code => [role, code]);
        await pool.query(
            'INSERT INTO role_permissions (role, permission_code) VALUES ?',
            [values]
        );
    }
};
