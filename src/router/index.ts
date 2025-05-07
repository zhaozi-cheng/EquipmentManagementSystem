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
        {
            path: '/403',
            name: 'Forbidden',
            component: () => import('@/views/error/403.vue'),
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
    const permissionStore = usePermissionStore();

    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title} - 实验室设备管理系统`;
    } else {
        document.title = '实验室设备管理系统';
    }

    // 检查是否需要认证
    if (to.meta.requiresAuth) {
        if (!userStore.token) {
            // 未登录则跳转到登录页，并携带重定向路径
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
            return;
        }

        // 检查用户信息是否已加载
        if (!userStore.user) {
            try {
                await userStore.getUserInfo();
                await permissionStore.fetchUserPermissions();
            } catch (error) {
                // 获取用户信息失败则退出登录
                await userStore.logout();
                next('/login');
                return;
            }
        }

        // 安全的角色检查
        if (to.meta.roles && userStore.user?.role) {
            const allowedRoles = to.meta.roles as string[];
            if (!allowedRoles.includes(userStore.user.role)) {
                next('/403');
                return;
            }
        }

        // 安全的权限检查
        if (to.meta.permission && !permissionStore.hasPermission(to.meta.permission as string)) {
            next('/403');
            return;
        }

    }

    next();
});

export default router;