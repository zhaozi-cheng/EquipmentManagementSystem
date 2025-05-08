<template>
  <div>
    <h2>设备列表</h2>
    <DeviceQuery @query="handleQuery" />
    <a-table
        :dataSource="deviceStore.devices"
        :columns="columns"
        style="width: 100%"
        rowKey="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="handleEdit(record.id)" style="margin-right: 8px">编辑</a-button>
          <a-button type="primary" danger @click="handleDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import DeviceQuery from '@/components/DeviceQuery.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const deviceStore = useDeviceStore();
const router = useRouter();

const columns = [
  {
    title: '内部编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '设备类别',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: '规格',
    dataIndex: 'specification',
    key: 'specification',
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '购置日期',
    dataIndex: 'purchaseDate',
    key: 'purchaseDate',
  },
  {
    title: '生产厂家',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  {
    title: '购买人',
    dataIndex: 'purchaser',
    key: 'purchaser',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
];

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
    message.success('设备删除成功');
  } catch (error) {
    message.error('设备删除失败');
  }
};
</script>