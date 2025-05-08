<template>
  <div>
    <!-- 只有有权限的用户才能看到这个按钮 -->
    <a-button v-permission="'device:create'">添加设备</a-button>
    <DeviceForm :deviceData="{}" @submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceForm from '@/components/DeviceForm.vue';
import type { Device } from '@/types/device';
import { message } from 'ant-design-vue'; // 替换为 Ant Design 的 message

const deviceStore = useDeviceStore();

const handleSubmit = async (deviceData: Partial<Device>) => {
  try {
    await deviceStore.addDevice(deviceData);
    message.success('设备添加成功');
    // 可以在这里进行页面跳转或其他操作
  } catch (error) {
    message.error('设备添加失败');
  }
};
</script>

