<template>
  <div>
    <h2>添加采购申请</h2>
    <PurchaseRequestForm :requestData="{}" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import PurchaseRequestForm from '@/components/PurchaseRequestForm.vue';
import { message } from 'ant-design-vue';
import type { PurchaseRequest } from '@/types/device';

const deviceStore = useDeviceStore();

const handleSubmit = async (requestData: Partial<PurchaseRequest>) => {
  try {
    await deviceStore.addPurchaseRequest(requestData);
    message.success('采购申请添加成功');
    // 可以在这里进行页面跳转或其他操作
  } catch (error) {
    message.error('采购申请添加失败');
  }
};
</script>
