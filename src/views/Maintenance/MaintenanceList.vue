<template>
  <div>
    <h2>维护管理</h2>
    <a-table
        :dataSource="deviceStore.deviceRepairs"
        :columns="columns"
        style="width: 100%"
        rowKey="id"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDeviceStore } from '@/stores/device';
import { onMounted } from 'vue';
import { Table as ATable } from 'ant-design-vue';

const deviceStore = useDeviceStore();

const columns = [
  {
    title: '维修记录ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '设备ID',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: '维修日期',
    dataIndex: 'repairDate',
    key: 'repairDate',
  },
  {
    title: '维修厂家',
    dataIndex: 'repairCompany',
    key: 'repairCompany',
  },
  {
    title: '维修费用',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: '责任人',
    dataIndex: 'responsiblePerson',
    key: 'responsiblePerson',
  },
  {
    title: '问题描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

onMounted(async () => {
  await deviceStore.fetchDeviceRepairs('1'); // 假设设备ID为1
});
</script>
