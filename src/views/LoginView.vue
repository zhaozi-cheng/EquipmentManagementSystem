<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">实验室设备管理系统</h2>
      <a-form
          :model="form"
          :rules="rules"
          ref="loginForm"
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
        <a-form-item>
          <a-button
              type="primary"
              @click="handleLogin"
              class="login-btn"
              :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <div class="footer">
        <span>还没有账号？</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { FormInstance, Rule } from 'ant-design-vue/es/form';

const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

const loading = ref(false);
const loginForm = ref<FormInstance>();
const form = ref({
  username: '',
  password: ''
});

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const handleLogin = async () => {
  try {
    await loginForm.value?.validate();
    loading.value = true;
    // 调用登录并等待返回数据
    const loginResponse = await userStore.login({
      username: form.value.username,
      password: form.value.password
    });
    // 确保返回了有效数据
    if (!loginResponse?.token) {
      throw new Error('登录成功但返回数据不完整');
    }
    // 获取用户信息和权限
    await Promise.all([
      userStore.getUserInfo(),
      permissionStore.fetchUserPermissions()
    ]);
    message.success('登录成功');

    // 根据角色跳转
    switch (userStore.user?.role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'device_manager':
        router.push('/device/manage');
        break;
      default:
        router.push('/');
    }

  } catch (error: any) {
    // 显示友好的错误信息
    const errorMsg = error.message || '登录失败，请检查用户名和密码';
    message.error(errorMsg);

    // 开发环境下打印完整错误
    if (import.meta.env.DEV) {
      console.error('登录错误详情:', error);
    }
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e5799 0%, #207cca 100%);
}

.login-box {
  width: 400px;
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

.login-btn {
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