<template>
  <div>
    <h2>设备详情</h2>
    <a-descriptions :column="2" bordered>
      <a-descriptions-item label="内部编号">{{ deviceStore.currentDevice?.id }}</a-descriptions-item>
      <a-descriptions-item label="设备类别">{{ deviceStore.currentDevice?.category }}</a-descriptions-item>
      <a-descriptions-item label="设备名称">{{ deviceStore.currentDevice?.name }}</a-descriptions-item>
      <a-descriptions-item label="型号">{{ deviceStore.currentDevice?.model }}</a-descriptions-item>
      <a-descriptions-item label="规格">{{ deviceStore.currentDevice?.specification }}</a-descriptions-item>
      <a-descriptions-item label="单价">{{ deviceStore.currentDevice?.price }}</a-descriptions-item>
      <a-descriptions-item label="购置日期">{{ deviceStore.currentDevice?.purchaseDate }}</a-descriptions-item>
      <a-descriptions-item label="生产厂家">{{ deviceStore.currentDevice?.manufacturer }}</a-descriptions-item>
      <a-descriptions-item label="购买人">{{ deviceStore.currentDevice?.purchaser }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ deviceStore.currentDevice?.status }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const deviceStore = useDeviceStore();
const route = useRoute();

onMounted(async () => {
  const deviceId = route.params.id as string;
  await deviceStore.fetchDeviceById(deviceId);
});
</script>

