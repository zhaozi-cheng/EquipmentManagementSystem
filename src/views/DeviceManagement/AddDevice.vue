// src/views/DeviceManagement/AddDevice.vue
<template>
  <div>
    <!-- 只有有权限的用户才能看到这个按钮 -->
    <button v-permission="'device:create'">添加设备</button>
    <DeviceForm :deviceData="{}" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceForm from '@/components/DeviceForm.vue';
import type { Device } from '@/types/device';
import { ElMessage } from 'element-plus'; // 局部导入 ElMessage

const deviceStore = useDeviceStore();

const handleSubmit = async (deviceData: Partial<Device>) => {
  try {
    await deviceStore.addDevice(deviceData);
    ElMessage.success('设备添加成功');
    // 可以在这里进行页面跳转或其他操作
  } catch (error) {
    ElMessage.error('设备添加失败');
  }
};
</script>
