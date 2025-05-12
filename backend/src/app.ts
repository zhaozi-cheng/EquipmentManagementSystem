import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import deviceRoutes from './routes/device.routes';
import permissionRoutes from './routes/permission.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = ['http://localhost:3000'];
// 中间件
app.use(cors({
    origin: function (origin, callback) {
        // 允许没有origin的请求（如移动应用、Postman等）
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // 允许携带凭证
    exposedHeaders: ['Authorization']  // 暴露自定义头部
}));
app.use(express.json());
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/permissions', permissionRoutes);

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
