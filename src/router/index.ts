import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 公开路由
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/HomeView.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { requiresAuth: false }
        },
        // 设备管理路由
        {
            path: '/devices',
            name: 'devices',
            component: () => import('@/views/DeviceManagement/DeviceList.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'device:view'
            }
        },
        {
            path: '/devices/add',
            name: 'add-device',
            component: () => import('@/views/DeviceManagement/AddDevice.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'device:create'
            }
        },
        {
            path: '/devices/:id/edit',
            name: 'edit-device',
            component: () => import('@/views/DeviceManagement/EditDevice.vue'),
            props: true,
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'device:edit'
            }
        },
        {
            path: '/devices/:id',
            name: 'device-detail',
            component: () => import('@/views/DeviceManagement/DeviceDetail.vue'),
            props: true,
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager', 'maintainer'],
                permission: 'device:view'
            }
        },

        // 维护管理路由
        {
            path: '/maintenance',
            name: 'maintenance',
            component: () => import('@/views/Maintenance/MaintenanceList.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin', 'maintainer'],
                permission: 'maintenance:view'
            }
        },

        // 采购管理路由
        {
            path: '/purchase-requests',
            name: 'purchase-requests',
            component: () => import('@/views/Purchase/PurchaseRequestList.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'purchase:view'
            }
        },
        {
            path: '/purchase-requests/add',
            name: 'add-purchase-request',
            component: () => import('@/views/Purchase/AddPurchaseRequest.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'purchase:create'
            }
        },
        // 统计路由
        {
            path: '/statistics',
            name: 'statistics',
            component: () => import('@/views/Statistics/DeviceStatistics.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin'],
                permission: 'statistics:view'
            }
        },
        {
            path: '/403',
            name: 'Forbidden',
            component: () => import('@/views/error/403.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () => import('@/views/error/404.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        },
        // 管理员路由
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('@/views/admin/DashboardView.vue'),
            meta: {
                requiresAuth: true,
                roles: ['admin']
            }
        },
        {
            path: '/devices',
            name: 'devices',
            component: () => import('@/views/DeviceManagement/DeviceList.vue'),
            meta: {
                title: '设备管理',  // 添加title
                requiresAuth: true,
                roles: ['admin', 'device_manager'],
                permission: 'device:view'
            }
        },
        // 404 处理
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/error/404.vue')
        }
    ]
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore(); // 正确获取实例
    // 设置标题
    document.title = to.meta.title
        ? `${to.meta.title} - 系统名称`
        : '系统名称';
    // 不需要认证的路由
    if (!to.meta.requiresAuth) return next();
    // 检查登录状态
    if (!userStore.token) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
    // 获取用户信息和权限
    if (!userStore.user) {
        try {
            await Promise.all([
                userStore.getUserInfo(),
                permissionStore.fetchUserPermissions()
            ]);
        } catch (error) {
            await userStore.logout();
            return next('/login');
        }
    }
    // 角色检查 (添加类型断言)
    if (to.meta.roles) {
        const allowedRoles = to.meta.roles as string[]; // 类型断言
        const userRole = userStore.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) { // 现在 includes 可以正常工作
            return next('/403');
        }
    }
    next();
});


export default router;