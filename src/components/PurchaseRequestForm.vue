<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item label="设备名称" prop="deviceName" required>
      <el-input v-model="form.deviceName" />
    </el-form-item>

    <el-form-item label="型号" prop="model" required>
      <el-input v-model="form.model" />
    </el-form-item>

    <el-form-item label="规格" prop="specification">
      <el-input v-model="form.specification" />
    </el-form-item>

    <el-form-item label="数量" prop="quantity" required>
      <el-input-number v-model="form.quantity" :min="1" />
    </el-form-item>

    <el-form-item label="预估单价" prop="estimatedPrice" required>
      <el-input-number v-model="form.estimatedPrice" :min="0" :precision="2" />
    </el-form-item>

    <el-form-item label="申请原因" prop="reason" required>
      <el-input
          v-model="form.reason"
          type="textarea"
          :rows="3"
          placeholder="详细说明申请购买的原因和用途"
      />
    </el-form-item>

    <el-form-item label="申请人" prop="requester" required>
      <el-input v-model="form.requester" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交申请</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
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