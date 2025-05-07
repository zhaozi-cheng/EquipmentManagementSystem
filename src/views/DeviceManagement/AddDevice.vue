// src/views/DeviceManagement/AddDevice.vue
<template>
  <div>
    <h2>添加设备</h2>
    <DeviceForm :deviceData="{}" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceForm from '@/components/DeviceForm.vue';

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
