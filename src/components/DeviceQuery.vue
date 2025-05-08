<template>
  <a-form :model="queryParams" label-width="80px" inline>
    <a-form-item label="设备名称">
      <a-input v-model:value="queryParams.name" placeholder="请输入设备名称" />
    </a-form-item>

    <a-form-item label="设备类别">
      <a-select v-model:value="queryParams.category" placeholder="请选择设备类别">
        <a-select-option
            v-for="category in deviceCategories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
        />
      </a-select>
    </a-form-item>

    <a-form-item label="状态">
      <a-select v-model:value="queryParams.status" placeholder="请选择状态">
        <a-select-option label="正常" value="normal" />
        <a-select-option label="维修中" value="repairing" />
        <a-select-option label="已报废" value="scrapped" />
      </a-select>
    </a-form-item>

    <a-form-item label="购置日期">
      <a-range-picker
          v-model:value="queryParams.purchaseDateRange"
          placeholder="选择日期范围"
          value-format="YYYY-MM-DD"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="handleQuery">查询</a-button>
      <a-button @click="resetQuery">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['query']);

const queryParams = ref({
  name: '',
  category: '',
  status: '',
  purchaseDateRange: []
});

const deviceCategories = [
  { value: 'computer', label: '计算机类' },
  { value: 'network', label: '网络设备' },
  { value: 'experiment', label: '实验仪器' },
  { value: 'office', label: '办公设备' },
  { value: 'other', label: '其他' }
];

const handleQuery = () => {
  emit('query', queryParams.value);
};

const resetQuery = () => {
  queryParams.value = {
    name: '',
    category: '',
    status: '',
    purchaseDateRange: []
  };
  emit('query', queryParams.value);
};
</script>