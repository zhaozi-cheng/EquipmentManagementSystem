import { Request, Response } from 'express';
import * as deviceModel from '../models/device.model';
import { apiResponse } from '../utils/apiResponse';

export const getDevices = async (req: Request, res: Response) => {
    try {
        const devices = await deviceModel.getDevices();
        apiResponse(res, 200, devices); // 直接返回数组
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};


export const getDevice = async (req: Request, res: Response) => {
    try {
        const device = await deviceModel.getDeviceById(parseInt(req.params.id));
        if (!device) {
            return apiResponse(res, 404, { error: 'Device not found' });
        }
        apiResponse(res, 200, device);
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};

export const createDevice = async (req: Request, res: Response) => {
    try {
        const deviceId = await deviceModel.createDevice(req.body);
        apiResponse(res, 201, { id: deviceId, ...req.body });
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};

export const updateDevice = async (req: Request, res: Response) => {
    try {
        const success = await deviceModel.updateDevice(parseInt(req.params.id), req.body);
        if (!success) {
            return apiResponse(res, 404, { error: 'Device not found' });
        }
        apiResponse(res, 200, { message: 'Device updated successfully' });
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};

export const deleteDevice = async (req: Request, res: Response) => {
    try {
        const success = await deviceModel.deleteDevice(parseInt(req.params.id));
        if (!success) {
            return apiResponse(res, 404, { error: 'Device not found' });
        }
        apiResponse(res, 200, { message: 'Device deleted successfully' });
    } catch (error) {
        apiResponse(res, 500, { error: 'Internal server error' });
    }
};
