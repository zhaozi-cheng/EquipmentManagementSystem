import { defineStore } from 'pinia';
import {
    getDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    getDeviceRepairs,
    createDeviceRepair,
    scrapDevice,
    getPurchaseRequests,
    createPurchaseRequest, getDeviceById
} from '@/api/device';
import type { Device, DeviceRepair, DeviceScrap, PurchaseRequest } from '@/types/device';

export const useDeviceStore = defineStore('device', {
    state: () => ({
        devices: [] as Device[],
        currentDevice: null as Device | null,
        deviceRepairs: [] as DeviceRepair[],
        purchaseRequests: [] as PurchaseRequest[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchDevices(params?: any) {
            this.loading = true;
            try {
                const response = await getDevices(params);
                this.devices = response.data;
            } catch (error) {
                this.error = (error as Error).message;
            } finally {
                this.loading = false;
            }
        },

        async fetchDeviceById(id: string) {
            this.loading = true;
            try {
                const response = await getDeviceById(id);
                this.currentDevice = response.data;
            } catch (error) {
                this.error = (error as Error).message;
            } finally {
                this.loading = false;
            }
        },

        async addDevice(deviceData: Partial<Device>) {
            this.loading = true;
            try {
                const response = await createDevice(deviceData);
                this.devices.push(response.data);
                return response.data;
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async updateDevice(id: string, deviceData: Partial<Device>) {
            this.loading = true;
            try {
                const response = await updateDevice(id, deviceData);
                const index = this.devices.findIndex(d => d.id === Number(id));
                if (index !== -1) {
                    this.devices[index] = response.data;
                }
                if (this.currentDevice?.id === Number(id)) {
                    this.currentDevice = response.data;
                }
                return response.data;
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async deleteDevice(id: string) {
            this.loading = true;
            try {
                await deleteDevice(id);
                this.devices = this.devices.filter(d => d.id !== Number(id));
                if (this.currentDevice?.id === Number(id)) {
                    this.currentDevice = null;
                }
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchDeviceRepairs(deviceId: string) {
            this.loading = true;
            try {
                const response = await getDeviceRepairs(deviceId);
                this.deviceRepairs = response.data;
            } catch (error) {
                this.error = (error as Error).message;
            } finally {
                this.loading = false;
            }
        },

        async addDeviceRepair(deviceId: string, repairData: Partial<DeviceRepair>) {
            this.loading = true;
            try {
                const response = await createDeviceRepair(deviceId, repairData);
                this.deviceRepairs.push(response.data);
                return response.data;
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async scrapDevice(deviceId: string, scrapData: Partial<DeviceScrap>) {
            this.loading = true;
            try {
                const response = await scrapDevice(deviceId, scrapData);
                await this.fetchDeviceById(deviceId); // 刷新设备状态
                return response.data;
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchPurchaseRequests(params?: any) {
            this.loading = true;
            try {
                const response = await getPurchaseRequests(params);
                this.purchaseRequests = response.data;
            } catch (error) {
                this.error = (error as Error).message;
            } finally {
                this.loading = false;
            }
        },

        async addPurchaseRequest(requestData: Partial<PurchaseRequest>) {
            this.loading = true;
            try {
                const response = await createPurchaseRequest(requestData);
                this.purchaseRequests.push(response.data);
                return response.data;
            } catch (error) {
                this.error = (error as Error).message;
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});