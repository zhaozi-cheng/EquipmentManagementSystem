// src/utils/apiResponse.ts
import { Response } from 'express';
export const apiResponse = (
    res: Response,
    status: number,
    data: any
): void => {
    res.status(status).json({
        success: status >= 200 && status < 300,
        ...data
    });
    // 注意这里不返回任何值
};