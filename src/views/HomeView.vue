<template>
  <div class="home-container">
    <h2>首页</h2>
    <p>欢迎使用实验室设备管理系统</p>

    <!-- 未登录状态显示登录/注册按钮 -->
    <div v-if="!userStore.token" class="auth-buttons">
      <a-button type="primary" @click="showLoginModal = true">登录</a-button>
      <a-button @click="showRegisterModal = true">注册</a-button>
    </div>

    <!-- 已登录状态显示用户信息 -->
    <div v-else class="user-info">
      <p>欢迎, {{ userStore.user?.username }} ({{ roleName }})</p>
      <a-button @click="handleLogout">退出登录</a-button>
    </div>

    <!-- 登录弹窗 -->
    <a-modal v-model:visible="showLoginModal" title="登录" :width="500">
      <a-form :model="loginForm" :label-col="{ span: 6 }">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="loginForm.username" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="loginForm.password" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="showLoginModal = false">取消</a-button>
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </template>
    </a-modal>

    <!-- 注册弹窗 -->
    <a-modal v-model:visible="showRegisterModal" title="注册" :width="500">
      <a-form :model="registerForm" :label-col="{ span: 8 }">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="registerForm.username" />
        </a-form-item>
        <a-form-item label="邮箱" name="email" :rules="[{ required: true, type: 'email', message: '请输入有效的邮箱' }]">
          <a-input v-model:value="registerForm.email" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="registerForm.password" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPassword" :rules="[{ required: true, message: '请确认密码' }]">
          <a-input-password v-model:value="registerForm.confirmPassword" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="showRegisterModal = false">取消</a-button>
        <a-button type="primary" @click="handleRegister">注册</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';
import { message } from 'ant-design-vue';

const router = useRouter();
const userStore = useUserStore();
const permissionStore = usePermissionStore();

// 角色名称映射
const roleName = computed(() => {
  const roles: Record<string, string> = {
    admin: '管理员',
    device_manager: '设备管理员',
    maintainer: '维护人员',
    user: '普通用户'
  };
  return roles[userStore.user?.role || 'user'];
});

// 登录/注册弹窗状态
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

// 登录表单
const loginForm = ref({
  username: '',
  password: ''
});

// 注册表单
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 处理登录
const handleLogin = async () => {
  try {
    await userStore.login(loginForm.value);
    await userStore.getUserInfo();
    await permissionStore.fetchUserPermissions();
    showLoginModal.value = false;
    message.success('登录成功');

    // 根据角色跳转不同页面
    if (userStore.user?.role === 'admin') {
      router.push('/admin');
    }
  } catch (error) {
    message.error('登录失败: ' + (error as Error).message);
  }
};

// 处理退出
const handleLogout = async () => {
  try {
    await userStore.logout();
    message.success('已退出登录');
    router.push('/');
  } catch (error) {
    message.error('退出失败: ' + (error as Error).message);
  }
};

// 处理注册
const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    message.error('两次输入的密码不一致');
    return;
  }

  try {
    // 调用注册API
    // await registerUser(registerForm.value);
    message.success('注册成功！请登录');
    showRegisterModal.value = false;
    showLoginModal.value = true;
  } catch (error) {
    message.error('注册失败: ' + (error as Error).message);
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.auth-buttons {
  margin-top: 20px;
}

.user-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>