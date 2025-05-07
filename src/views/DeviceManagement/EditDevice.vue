// src/views/DeviceManagement/EditDevice.vue
<template>
  <div>
    <h2>编辑设备</h2>
    <DeviceForm :deviceData="deviceStore.currentDevice" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceForm from '@/components/DeviceForm.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const deviceStore = useDeviceStore();
const route = useRoute();

onMounted(async () => {
  const deviceId = route.params.id as string;
  await deviceStore.fetchDeviceById(deviceId);
});

const handleSubmit = async (deviceData: Partial<Device>) => {
  try {
    await deviceStore.updateDevice(route.params.id as string, deviceData);
    ElMessage.success('设备更新成功');
    // 可以在这里进行页面跳转或其他操作
  } catch (error) {
    ElMessage.error('设备更新失败');
  }
};
</script>
