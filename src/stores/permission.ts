import { defineStore } from 'pinia';
import { getUserPermissions, getAllPermissions, getRolePermissions, updateRolePermissions } from '@/api/permission';
import type { Permission, RolePermission } from '@/types/index';

export const usePermissionStore = defineStore('permission', {
    state: () => ({
        userPermissions: [] as string[],
        allPermissions: [] as Permission[],
        rolePermissions: [] as RolePermission[],
        loading: false
    }),
    actions: {
        async fetchUserPermissions() {
            this.loading = true;
            try {
                const response = await getUserPermissions();
                this.userPermissions = response.data;
            } finally {
                this.loading = false;
            }
        },

        async fetchAllPermissions() {
            this.loading = true;
            try {
                const response = await getAllPermissions();
                this.allPermissions = response.data;
            } finally {
                this.loading = false;
            }
        },

        async fetchRolePermissions(role: string) {
            this.loading = true;
            try {
                const response = await getRolePermissions(role);
                return response.data;
            } finally {
                this.loading = false;
            }
        },

        async updateRolePermissions(role: string, permissionCodes: string[]) {
            this.loading = true;
            try {
                await updateRolePermissions(role, permissionCodes);
            } finally {
                this.loading = false;
            }
        },

        hasPermission(code: string): boolean {
            return this.userPermissions?.includes(code) || false;
        }
    }
});