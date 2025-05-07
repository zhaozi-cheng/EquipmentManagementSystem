<template>
  <div class="permission-management">
    <el-tabs v-model="activeRole">
      <el-tab-pane v-for="role in roles" :key="role.value" :label="role.label" :name="role.value">
        <el-transfer
            v-model="selectedPermissions"
            :data="allPermissions"
            :titles="['可用权限', '已分配权限']"
            :props="{ key: 'code', label: 'name' }"
        />
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary" @click="savePermissions">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { usePermissionStore } from '@/stores/permission';
import { ElMessage } from 'element-plus';

const permissionStore = usePermissionStore();

const activeRole = ref('admin');
const selectedPermissions = ref<string[]>([]);

const roles = [
  { value: 'admin', label: '管理员' },
  { value: 'device_manager', label: '设备管理员' },
  { value: 'maintainer', label: '维护人员' },
  { value: 'user', label: '普通用户' }
];

const allPermissions = ref<Array<{ code: string; name: string }>>([]);

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
  ElMessage.success('权限保存成功');
};
</script>