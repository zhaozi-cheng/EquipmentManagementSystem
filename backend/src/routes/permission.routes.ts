// src/routes/permission.routes.ts
import express from 'express';
import {
    getAllPermissions,
    getRolePermissions,
    updateRolePermissions
} from '../controllers/permission.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// 获取所有权限列表
router.get('/', authenticate, getAllPermissions);

// 获取角色权限
router.get('/roles/:role', authenticate, getRolePermissions);

// 更新角色权限
router.put('/roles/:role', authenticate, updateRolePermissions);

export default router;
