// src/controllers/permission.controller.ts
import { Request, Response } from 'express';
import * as permissionModel from '../models/permission.model';
import { apiResponse } from '../utils/apiResponse';

export const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await permissionModel.getAllPermissions();
        apiResponse(res, 200, permissions);
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};

export const getRolePermissions = async (req: Request, res: Response) => {
    try {
        const { role } = req.params;
        const permissions = await permissionModel.getRolePermissions(role);
        apiResponse(res, 200, permissions);
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};

export const updateRolePermissions = async (req: Request, res: Response) => {
    try {
        const { role } = req.params;
        const { permissionCodes } = req.body;
        await permissionModel.updateRolePermissions(role, permissionCodes);
        apiResponse(res, 200, { message: 'Permissions updated successfully' });
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};
