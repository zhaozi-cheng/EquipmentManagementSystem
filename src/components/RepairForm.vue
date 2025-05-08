<template>
  <a-form :model="form" :label-col="{ span: 6 }" ref="formRef">
    <a-form-item label="维修日期" name="repairDate" required>
      <a-date-picker
          v-model:value="form.repairDate"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </a-form-item>

    <a-form-item label="维修厂家" name="repairCompany" required>
      <a-input v-model:value="form.repairCompany" />
    </a-form-item>

    <a-form-item label="维修费用" name="cost" required>
      <a-input-number v-model:value="form.cost" :min="0" :precision="2" />
    </a-form-item>

    <a-form-item label="责任人" name="responsiblePerson" required>
      <a-input v-model:value="form.responsiblePerson" />
    </a-form-item>

    <a-form-item label="问题描述" name="description" required>
      <a-textarea
          v-model:value="form.description"
          :rows="3"
          placeholder="详细描述设备问题和维修情况"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
      <a-button type="primary" @click="submitForm">提交</a-button>
      <a-button @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { DeviceRepair } from '@/types/device';

const props = defineProps({
  repairData: {
    type: Object as () => Partial<DeviceRepair>,
    default: () => ({})
  }
});

const emit = defineEmits(['submit']);

const formRef = ref();
const form = ref<Partial<DeviceRepair>>({
  ...props.repairData
});

const submitForm = async () => {
  try {
    await formRef.value.validateFields();
    emit('submit', form.value);
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>