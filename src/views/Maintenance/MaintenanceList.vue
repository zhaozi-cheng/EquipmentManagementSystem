// src/views/Maintenance/MaintenanceList.vue
<template>
  <div>
    <h2>维护管理</h2>
    <el-table :data="deviceStore.deviceRepairs" style="width: 100%">
      <el-table-column prop="id" label="维修记录ID" />
      <el-table-column prop="deviceId" label="设备ID" />
      <el-table-column prop="repairDate" label="维修日期" />
      <el-table-column prop="repairCompany" label="维修厂家" />
      <el-table-column prop="cost" label="维修费用" />
      <el-table-column prop="responsiblePerson" label="责任人" />
      <el-table-column prop="description" label="问题描述" />
      <el-table-column prop="createdAt" label="创建时间" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import { onMounted } from 'vue';

const deviceStore = useDeviceStore();

onMounted(async () => {
  await deviceStore.fetchDeviceRepairs('1'); // 假设设备ID为1
});
</script>
