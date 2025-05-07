import type { App } from 'vue';
import { usePermissionStore } from '@/stores/permission';

export function setupPermissionDirective(app: App) {
    app.directive('permission', {
        mounted(el, binding) {
            const permissionStore = usePermissionStore();
            if (!permissionStore.hasPermission(binding.value)) {
                el.parentNode?.removeChild(el);
            }
        }
    });
}