// src/views/DeviceManagement/DeviceDetail.vue
<template>
  <div>
    <h2>设备详情</h2>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="内部编号">{{ deviceStore.currentDevice?.id }}</el-descriptions-item>
      <el-descriptions-item label="设备类别">{{ deviceStore.currentDevice?.category }}</el-descriptions-item>
      <el-descriptions-item label="设备名称">{{ deviceStore.currentDevice?.name }}</el-descriptions-item>
      <el-descriptions-item label="型号">{{ deviceStore.currentDevice?.model }}</el-descriptions-item>
      <el-descriptions-item label="规格">{{ deviceStore.currentDevice?.specification }}</el-descriptions-item>
      <el-descriptions-item label="单价">{{ deviceStore.currentDevice?.price }}</el-descriptions-item>
      <el-descriptions-item label="购置日期">{{ deviceStore.currentDevice?.purchaseDate }}</el-descriptions-item>
      <el-descriptions-item label="生产厂家">{{ deviceStore.currentDevice?.manufacturer }}</el-descriptions-item>
      <el-descriptions-item label="购买人">{{ deviceStore.currentDevice?.purchaser }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ deviceStore.currentDevice?.status }}</el-descriptions-item>
    </el-descriptions>
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
