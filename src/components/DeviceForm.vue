<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item label="内部编号" prop="id" required>
      <el-input v-model="form.id" />
    </el-form-item>

    <el-form-item label="设备类别" prop="category" required>
      <el-select v-model="form.category" placeholder="请选择设备类别">
        <el-option
            v-for="category in deviceCategories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="设备名称" prop="name" required>
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="型号" prop="model" required>
      <el-input v-model="form.model" />
    </el-form-item>

    <el-form-item label="规格" prop="specification">
      <el-input v-model="form.specification" />
    </el-form-item>

    <el-form-item label="单价" prop="price" required>
      <el-input-number v-model="form.price" :min="0" :precision="2" />
    </el-form-item>

    <el-form-item label="购置日期" prop="purchaseDate" required>
      <el-date-picker
          v-model="form.purchaseDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="生产厂家" prop="manufacturer" required>
      <el-input v-model="form.manufacturer" />
    </el-form-item>

    <el-form-item label="购买人" prop="purchaser" required>
      <el-input v-model="form.purchaser" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { Device } from '@/types/device';

const props = defineProps({
  deviceData: {
    type: Object as () => Partial<Device>,
    default: () => ({})
  }
});

const emit = defineEmits(['submit']);

const formRef = ref();
const form = ref<Partial<Device>>({
  ...props.deviceData
});

const deviceCategories = [
  { value: 'computer', label: '计算机类' },
  { value: 'network', label: '网络设备' },
  { value: 'experiment', label: '实验仪器' },
  { value: 'office', label: '办公设备' },
  { value: 'other', label: '其他' }
];

const submitForm = async () => {
  try {
    await formRef.value.validate();
    emit('submit', form.value);
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>