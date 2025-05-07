import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/devices',
            name: 'devices',
            component: () => import('../views/DeviceManagement/DeviceList.vue')
        },
        {
            path: '/devices/add',
            name: 'add-device',
            component: () => import('../views/DeviceManagement/AddDevice.vue')
        },
        {
            path: '/devices/:id/edit',
            name: 'edit-device',
            component: () => import('../views/DeviceManagement/EditDevice.vue'),
            props: true
        },
        {
            path: '/devices/:id',
            name: 'device-detail',
            component: () => import('../views/DeviceManagement/DeviceDetail.vue'),
            props: true
        },
        {
            path: '/maintenance',
            name: 'maintenance',
            component: () => import('../views/Maintenance/MaintenanceList.vue')
        },
        {
            path: '/purchase-requests',
            name: 'purchase-requests',
            component: () => import('../views/Purchase/PurchaseRequestList.vue')
        },
        {
            path: '/purchase-requests/add',
            name: 'add-purchase-request',
            component: () => import('../views/Purchase/AddPurchaseRequest.vue')
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: () => import('../views/Statistics/DeviceStatistics.vue')
        }
    ]
});

export default router;