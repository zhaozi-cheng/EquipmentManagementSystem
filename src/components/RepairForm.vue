<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item label="维修日期" prop="repairDate" required>
      <el-date-picker
          v-model="form.repairDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="维修厂家" prop="repairCompany" required>
      <el-input v-model="form.repairCompany" />
    </el-form-item>

    <el-form-item label="维修费用" prop="cost" required>
      <el-input-number v-model="form.cost" :min="0" :precision="2" />
    </el-form-item>

    <el-form-item label="责任人" prop="responsiblePerson" required>
      <el-input v-model="form.responsiblePerson" />
    </el-form-item>

    <el-form-item label="问题描述" prop="description" required>
      <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="详细描述设备问题和维修情况"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
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