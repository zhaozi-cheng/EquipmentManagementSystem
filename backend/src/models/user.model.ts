import pool from '../config/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

export type UserRole = 'admin' | 'device_manager' | 'maintainer' | 'user';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
}

export const createUser = async (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
}) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [userData.username, userData.email, hashedPassword, userData.role]
    );
};

function assertIsUser(data: any): asserts data is User {
    if (!data ||
        typeof data.id !== 'number' ||
        typeof data.username !== 'string' ||
        typeof data.password !== 'string') {
        throw new Error('Invalid user data');
    }
}
export const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        // 使用类型明确的查询方式
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, username, email, password, role, created_at FROM users WHERE username = ?',
            [username]
        );

        console.log('用户查询结果:', rows);

        if (!rows || rows.length === 0) {
            console.log(`用户 ${username} 不存在`);
            return null;
        }

        const user = rows[0] as User;
        assertIsUser(user);

        if (!user.password) {
            console.error('用户记录缺少password字段:', user);
            throw new Error('数据库记录不完整');
        }

        return user;
    } catch (error) {
        console.error('查询用户出错:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
            [id]
        );
        if (!rows || rows.length === 0) {
            return null;
        }
        const user = rows[0] as User;
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            password: '' // 这里返回空字符串，因为不需要密码
        };
    } catch (error) {
        console.error('根据ID查询用户出错:', error);
        throw error;
    }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
    const [rows] = await pool.query('SELECT 1 FROM users WHERE username = ?', [username]);
    return (rows as any).length > 0;
};
