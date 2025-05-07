<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item label="报废日期" prop="scrapDate" required>
      <el-date-picker
          v-model="form.scrapDate"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="报废原因" prop="reason" required>
      <el-input
          v-model="form.reason"
          type="textarea"
          :rows="3"
          placeholder="详细描述报废原因"
      />
    </el-form-item>

    <el-form-item label="责任人" prop="responsiblePerson" required>
      <el-input v-model="form.responsiblePerson" />
    </el-form-item>

    <el-form-item label="审批人" prop="approvalPerson" required>
      <el-input v-model="form.approvalPerson" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import type { DeviceScrap } from '@/types/device';

const props = defineProps({
  scrapData: {
    type: Object as () => Partial<DeviceScrap>,
    default: () => ({})
  }
});

const emit = defineEmits(['submit']);

const formRef = ref();
const form = ref<Partial<DeviceScrap>>({
  ...props.scrapData
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