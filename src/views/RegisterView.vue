<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">用户注册</h2>
      <a-form
          :model="form"
          :rules="rules"
          ref="registerForm"
          layout="vertical"
      >
        <a-form-item name="username" label="用户名">
          <a-input
              v-model:value="form.username"
              placeholder="请输入用户名"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="email" label="邮箱">
          <a-input
              v-model:value="form.email"
              placeholder="请输入邮箱"
          >
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" label="密码">
          <a-input-password
              v-model:value="form.password"
              placeholder="请输入密码"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="confirmPassword" label="确认密码">
          <a-input-password
              v-model:value="form.confirmPassword"
              placeholder="请再次输入密码"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              @click="handleRegister"
              class="register-btn"
              :loading="loading"
          >
            注册
          </a-button>
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
import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { FormInstance, Rule } from 'ant-design-vue/es/form';

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);
const registerForm = ref<FormInstance>();

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const validatePassword = async (_rule: Rule, value: string) => {
  if (value !== form.value.password) {
    return Promise.reject('两次输入的密码不一致');
  }
  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
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
};

const handleRegister = async () => {
  try {
    // 验证表单
    await registerForm.value?.validate();

    // 检查密码是否一致
    if (form.value.password !== form.value.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    loading.value = true;

    // 调用userStore的register方法
    await userStore.register({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });

    message.success('注册成功！');
    router.push('/login');
  } catch (error: any) {
    // 更友好的错误提示
    const errorMessage = error.message || '注册失败，请稍后再试';
    message.error(errorMessage);
    console.error('注册错误:', error);
  } finally {
    loading.value = false;
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
  color: #1677ff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
