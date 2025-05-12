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
    const userStore = useUserStore()

    // 不需要认证的路由直接放行
    if (!to.meta.requiresAuth) return next()

    // 检查token是否存在
    if (!userStore.token) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }

    // 已登录状态下访问登录页则重定向到首页
    if (to.path === '/login') {
        return next('/')
    }

    // 确保用户信息已加载
    if (!userStore.user) {
        try {
            await userStore.getUserInfo()
        } catch (error) {
            await userStore.logout()
            return next('/login')
        }
    }

    next()
})



export default router;