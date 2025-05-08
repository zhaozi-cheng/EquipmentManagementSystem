// src/views/DeviceManagement/DeviceList.vue
<template>
  <div>
    <h2>设备列表</h2>
    <DeviceQuery @query="handleQuery" />
    <el-table :data="deviceStore.devices" style="width: 100%">
      <el-table-column prop="id" label="内部编号" />
      <el-table-column prop="category" label="设备类别" />
      <el-table-column prop="name" label="设备名称" />
      <el-table-column prop="model" label="型号" />
      <el-table-column prop="specification" label="规格" />
      <el-table-column prop="price" label="单价" />
      <el-table-column prop="purchaseDate" label="购置日期" />
      <el-table-column prop="manufacturer" label="生产厂家" />
      <el-table-column prop="purchaser" label="购买人" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceQuery from '@/components/DeviceQuery.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'; // 局部导入 ElMessage   npm install ant-design-vue


const deviceStore = useDeviceStore();
const router = useRouter();

onMounted(async () => {
  await deviceStore.fetchDevices();
});

const handleQuery = (queryParams: any) => {
  deviceStore.fetchDevices(queryParams);
};

const handleEdit = (id: number) => {
  router.push({ name: 'edit-device', params: { id } });
};

const handleDelete = async (id: number) => {
  try {
    await deviceStore.deleteDevice(id.toString());
    ElMessage.success('设备删除成功');
  } catch (error) {
    ElMessage.error('设备删除失败');
  }
};
</script>
