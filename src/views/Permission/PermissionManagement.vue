<template>
  <div class="permission-management">
    <a-tabs v-model:activeKey="activeRole">
      <a-tab-pane v-for="role in roles" :key="role.value" :tab="role.label">
        <a-transfer
            v-model:target-keys="selectedPermissions"
            :data-source="allPermissions"
            :titles="['可用权限', '已分配权限']"
            :render="(item: PermissionItem) => item.name"
            :row-key="(record: PermissionItem) => record.code"
        />
        <div style="margin-top: 20px; text-align: center;">
          <a-button type="primary" @click="savePermissions">保存</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { usePermissionStore } from '@/stores/permission';
import { message } from 'ant-design-vue';

// 定义权限项的类型
interface PermissionItem {
  code: string;
  name: string;
}

const permissionStore = usePermissionStore();

const activeRole = ref('admin');
const selectedPermissions = ref<string[]>([]);

const roles = [
  { value: 'admin', label: '管理员' },
  { value: 'device_manager', label: '设备管理员' },
  { value: 'maintainer', label: '维护人员' },
  { value: 'user', label: '普通用户' }
];

const allPermissions = ref<PermissionItem[]>([]);

onMounted(async () => {
  await permissionStore.fetchAllPermissions();
  allPermissions.value = permissionStore.allPermissions.map(p => ({
    code: p.code,
    name: p.name
  }));
  loadRolePermissions();
});

watch(activeRole, () => {
  loadRolePermissions();
});

const loadRolePermissions = async () => {
  const permissions = await permissionStore.fetchRolePermissions(activeRole.value);
  selectedPermissions.value = permissions;
};

const savePermissions = async () => {
  await permissionStore.updateRolePermissions(activeRole.value, selectedPermissions.value);
  message.success('权限保存成功');
};
</script>
