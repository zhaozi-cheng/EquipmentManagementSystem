import axios from '../utils/axios';
import type { Device, DeviceRepair, DeviceScrap, PurchaseRequest } from '@/types/device';

export const getDevices = async (params?: any) => {
    return axios.get('/api/devices', { params });
};

export const createDevice = async (data: Partial<Device>) => {
    return axios.post('/api/devices', data);
};

export const updateDevice = async (id: string, data: Partial<Device>) => {
    return axios.put(`/api/devices/${id}`, data);
};

export const deleteDevice = async (id: string) => {
    return axios.delete(`/api/devices/${id}`);
};

// 设备维修相关API
export const getDeviceRepairs = async (deviceId: string) => {
    return axios.get(`/api/devices/${deviceId}/repairs`);
};

export const createDeviceRepair = async (deviceId: string, data: Partial<DeviceRepair>) => {
    return axios.post(`/api/devices/${deviceId}/repairs`, data);
};

// 设备报废相关API
export const scrapDevice = async (deviceId: string, data: Partial<DeviceScrap>) => {
    return axios.post(`/api/devices/${deviceId}/scrap`, data);
};

// 采购申请相关API
export const getPurchaseRequests = async (params?: any) => {
    return axios.get('/api/purchase-requests', { params });
};

export const createPurchaseRequest = async (data: Partial<PurchaseRequest>) => {
    return axios.post('/api/purchase-requests', data);
};

export const getDeviceById = async (id: string) => {
    return axios.get(`/api/devices/${id}`);
};