<template>
  <a-form :model="form" :label-col="{ span: 6 }" ref="formRef">
    <a-form-item label="报废日期" name="scrapDate" required>
      <a-date-picker
          v-model:value="form.scrapDate"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
      />
    </a-form-item>

    <a-form-item label="报废原因" name="reason" required>
      <a-textarea
          v-model:value="form.reason"
          :rows="3"
          placeholder="详细描述报废原因"
      />
    </a-form-item>

    <a-form-item label="责任人" name="responsiblePerson" required>
      <a-input v-model:value="form.responsiblePerson" />
    </a-form-item>

    <a-form-item label="审批人" name="approvalPerson" required>
      <a-input v-model:value="form.approvalPerson" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
      <a-button type="primary" @click="submitForm">提交</a-button>
      <a-button @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router'; // 引入 useRoute 钩子
import type { DeviceScrap } from '@/types/device';

const route = useRoute(); // 获取当前路由信息

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