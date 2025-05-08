<template>
  <div>
    <h2>编辑设备</h2>
    <DeviceForm
        :deviceData="deviceStore.currentDevice"
        @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceForm from '@/components/DeviceForm.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Device } from '@/types/device';
import { message } from 'ant-design-vue'; // 替换为 Ant Design 的 message

const deviceStore = useDeviceStore();
const route = useRoute();

onMounted(async () => {
  const deviceId = route.params.id as string;
  await deviceStore.fetchDeviceById(deviceId);
});

const handleSubmit = async (deviceData: Partial<Device>) => {
  try {
    await deviceStore.updateDevice(route.params.id as string, deviceData);
    message.success('设备更新成功');
  } catch (error) {
    message.error('设备更新失败');
  }
};
</script>
