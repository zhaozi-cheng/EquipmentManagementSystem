// src/views/Purchase/PurchaseRequestList.vue
<template>
  <div>
    <h2>采购申请列表</h2>
    <el-table :data="deviceStore.purchaseRequests" style="width: 100%">
      <el-table-column prop="id" label="申请ID" />
      <el-table-column prop="deviceName" label="设备名称" />
      <el-table-column prop="model" label="型号" />
      <el-table-column prop="specification" label="规格" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="estimatedPrice" label="预估单价" />
      <el-table-column prop="reason" label="申请原因" />
      <el-table-column prop="requester" label="申请人" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import { onMounted } from 'vue';

const deviceStore = useDeviceStore();

onMounted(async () => {
  await deviceStore.fetchPurchaseRequests();
});
</script>
