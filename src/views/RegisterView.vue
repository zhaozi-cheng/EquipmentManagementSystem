// src/views/RegisterView.vue
<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">用户注册</h2>
      <a-form :model="form" :rules="rules" ref="registerForm">
        <a-form-item name="username">
          <a-input v-model:value="form.username" placeholder="用户名" prefix-icon="User" />
        </a-form-item>
        <a-form-item name="email">
          <a-input v-model:value="form.email" placeholder="邮箱" prefix-icon="Message" />
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="form.password" type="password" placeholder="密码" prefix-icon="Lock" />
        </a-form-item>
        <a-form-item name="confirmPassword">
          <a-input v-model:value="form.confirmPassword" type="password" placeholder="确认密码" prefix-icon="Lock" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleRegister" class="register-btn">注册</a-button>
        </a-form-item>
      </a-form>
      <div class="footer">
        <span>已有账号？</span>
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();
const registerForm = ref<FormInstance>();

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const validatePassword = (rule: any, value: string, callback: any) => {
  if (value !== form.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = ref<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
});

const handleRegister = async () => {
  try {
    await registerForm.value?.validate();
    // 调用注册API
    // await registerUser(form.value);
    ElMessage.success('注册成功！请登录');
    router.push('/login');
  } catch (error) {
    ElMessage.error('注册失败: ' + (error as Error).message);
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e5799 0%, #207cca 100%);
}

.register-box {
  width: 450px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.register-btn {
  width: 100%;
  height: 45px;
}

.footer {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.footer a {
  color: #409eff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>