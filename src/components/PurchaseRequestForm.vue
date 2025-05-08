<template>
  <a-form :model="form" :label-col="{ span: 6 }" ref="formRef">
    <a-form-item label="设备名称" name="deviceName" required>
      <a-input v-model:value="form.deviceName" />
    </a-form-item>

    <a-form-item label="型号" name="model" required>
      <a-input v-model:value="form.model" />
    </a-form-item>

    <a-form-item label="规格" name="specification">
      <a-input v-model:value="form.specification" />
    </a-form-item>

    <a-form-item label="数量" name="quantity" required>
      <a-input-number v-model:value="form.quantity" :min="1" />
    </a-form-item>

    <a-form-item label="预估单价" name="estimatedPrice" required>
      <a-input-number v-model:value="form.estimatedPrice" :min="0" :precision="2" />
    </a-form-item>

    <a-form-item label="申请原因" name="reason" required>
      <a-textarea
          v-model:value="form.reason"
          :rows="3"
          placeholder="详细说明申请购买的原因和用途"
      />
    </a-form-item>

    <a-form-item label="申请人" name="requester" required>
      <a-input v-model:value="form.requester" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
      <a-button type="primary" @click="submitForm">提交申请</a-button>
      <a-button @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { PurchaseRequest } from '@/types/device';

const props = defineProps({
  requestData: {
    type: Object as () => Partial<PurchaseRequest>,
    default: () => ({})
  }
});

const emit = defineEmits(['submit']);

const formRef = ref();
const form = ref<Partial<PurchaseRequest>>({
  ...props.requestData
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