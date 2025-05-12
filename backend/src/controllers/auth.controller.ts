import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/user.model';
import { apiResponse } from '../utils/apiResponse';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // 检查用户名是否已存在
        const usernameExists = await userModel.checkUsernameExists(username);
        if (usernameExists) {
            return apiResponse(res, 400, { error: '用户名已经存在' });
        }

        // 创建用户
        const userId = await userModel.createUser({
            username,
            email,
            password,
            role: 'user'
        });

        // 获取新创建的用户信息
        const user = await userModel.getUserByUsername(username);

        // 生成JWT令牌
        const token = jwt.sign(
            { userId: user!.id, username: user!.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        // 返回token和用户信息
        apiResponse(res, 201, {
            token,
            user: {
                id: user!.id,
                username: user!.username,
                email: user!.email,
                role: user!.role
            }
        });
    } catch (error) {
        apiResponse(res, 500, { error: '服务器内部错误' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        // 从认证中间件中获取用户ID
        const userId = req.user?.userId;
        if (!userId) {
            return apiResponse(res, 401, { error: '未授权' });
        }
        // 使用 userModel 获取用户信息
        const user = await userModel.getUserById(userId);
        if (!user) {
            return apiResponse(res, 404, { error: '用户不存在' });
        }
        apiResponse(res, 200, {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.created_at
        });
    } catch (error) {
        console.error('获取用户信息错误:', error);
        apiResponse(res, 500, { error: '获取用户信息失败' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        console.log('收到登录请求:', req.body); // 记录原始请求

        const { username, password } = req.body;
        if (!username || !password) {
            console.log('缺少用户名或密码');
            return apiResponse(res, 400, { error: '需要用户名和密码' });
        }

        console.log('正在查询用户:', username);
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            console.log('用户不存在:', username);
            return apiResponse(res, 401, { error: '用户名或密码错误' });
        }

        console.log('正在验证密码...');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('密码验证失败');
            return apiResponse(res, 401, { error: '用户名或密码错误' });
        }

        console.log('正在生成Token...');
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET未配置');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('登录成功:', user.id);
        return apiResponse(res, 200, {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('登录过程出错:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date()
        });
        return apiResponse(res, 500, {
            error: '服务器内部错误',
            ...(process.env.NODE_ENV === 'development' && {
                details: error.message
            })
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // 这里可以添加任何注销逻辑，比如将token加入黑名单等
        // 目前只是简单返回成功响应
        apiResponse(res, 200, { message: '注销成功' });
    } catch (error) {
        apiResponse(res, 500, { error: '注销失败' });
    }
};

export const checkUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.query;
        const exists = await userModel.checkUsernameExists(username as string);
        apiResponse(res, 200, { available: !exists });
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};
