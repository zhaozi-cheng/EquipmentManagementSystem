// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/apiResponse';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 扩展Express的Request类型
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                username: string;
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // 1. 从请求头获取token
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return apiResponse(res, 401, { error: '认证失败：请提供有效的认证令牌' });
        }
        // 2. 验证JWT_SECRET配置
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET未配置');
            return apiResponse(res, 500, { error: '服务器配置错误' });
        }
        // 3. 验证token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: number;
            username: string;
        };
        // 4. 将用户信息附加到请求对象
        req.user = {
            userId: decoded.userId,
            username: decoded.username
        };
        next();
    } catch (error) {
        console.error('认证中间件错误:', error);

        if (error instanceof jwt.TokenExpiredError) {
            return apiResponse(res, 401, { error: '认证失败：令牌已过期' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return apiResponse(res, 401, { error: '认证失败：无效令牌' });
        }

        return apiResponse(res, 500, { error: '服务器内部错误' });
    }
};
