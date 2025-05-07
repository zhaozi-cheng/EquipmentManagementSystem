<template>
  <el-form :model="queryParams" label-width="80px" inline>
    <el-form-item label="设备名称">
      <el-input v-model="queryParams.name" placeholder="请输入设备名称" clearable />
    </el-form-item>

    <el-form-item label="设备类别">
      <el-select v-model="queryParams.category" placeholder="请选择设备类别" clearable>
        <el-option
            v-for="category in deviceCategories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="状态">
      <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
        <el-option label="正常" value="normal" />
        <el-option label="维修中" value="repairing" />
        <el-option label="已报废" value="scrapped" />
      </el-select>
    </el-form-item>

    <el-form-item label="购置日期">
      <el-date-picker
          v-model="queryParams.purchaseDateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
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