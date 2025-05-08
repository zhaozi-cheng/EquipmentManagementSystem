<template>
  <a-form :model="form" label-width="120px" ref="formRef">
    <a-form-item label="内部编号" name="id" required>
      <a-input v-model:value="form.id" />
    </a-form-item>

    <a-form-item label="设备类别" name="category" required>
      <a-select v-model:value="form.category" placeholder="请选择设备类别">
        <a-select-option
            v-for="category in deviceCategories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
        />
      </a-select>
    </a-form-item>

    <a-form-item label="设备名称" name="name" required>
      <a-input v-model:value="form.name" />
    </a-form-item>

    <a-form-item label="型号" name="model" required>
      <a-input v-model:value="form.model" />
    </a-form-item>

    <a-form-item label="规格" name="specification">
      <a-input v-model:value="form.specification" />
    </a-form-item>

    <a-form-item label="单价" name="price" required>
      <a-input-number v-model:value="form.price" :min="0" :precision="2" />
    </a-form-item>

    <a-form-item label="购置日期" name="purchaseDate" required>
      <a-date-picker
          v-model:value="form.purchaseDate"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </a-form-item>

    <a-form-item label="生产厂家" name="manufacturer" required>
      <a-input v-model:value="form.manufacturer" />
    </a-form-item>

    <a-form-item label="购买人" name="purchaser" required>
      <a-input v-model:value="form.purchaser" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="submitForm">提交</a-button>
      <a-button @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { Device } from '@/types/device';

const props = defineProps({
  deviceData: {
    type: Object as () => Partial<Device> | null | undefined,
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