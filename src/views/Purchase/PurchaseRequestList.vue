<template>
  <div>
    <h2>采购申请列表</h2>
    <a-table
        :dataSource="deviceStore.purchaseRequests"
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
    title: '申请ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    key: 'deviceName',
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
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '预估单价',
    dataIndex: 'estimatedPrice',
    key: 'estimatedPrice',
  },
  {
    title: '申请原因',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: '申请人',
    dataIndex: 'requester',
    key: 'requester',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
];

onMounted(async () => {
  await deviceStore.fetchPurchaseRequests();
});
</script>