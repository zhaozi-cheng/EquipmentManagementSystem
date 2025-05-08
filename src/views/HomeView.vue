<template>
  <div class="home-container">
    <h2>首页</h2>
    <p>欢迎使用实验室设备管理系统</p>

    <!-- 未登录状态显示登录/注册按钮 -->
    <div v-if="!userStore.token" class="auth-buttons">
      <a-button type="primary" @click="navigateToLogin">登录</a-button>
      <a-button @click="navigateToRegister">注册</a-button>
    </div>

    <!-- 已登录状态显示用户信息 -->
    <div v-else class="user-info">
      <p>欢迎, {{ userStore.user?.username }} ({{ roleName }})</p>
      <a-button @click="handleLogout" :loading="logoutLoading">退出登录</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';

const router = useRouter();
const userStore = useUserStore();

const logoutLoading = ref(false);

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

// 导航到登录页
const navigateToLogin = () => {
  router.push('/login');
};

// 导航到注册页
const navigateToRegister = () => {
  router.push('/register');
};

// 处理退出
const handleLogout = async () => {
  try {
    logoutLoading.value = true;
    await userStore.logout();
    message.success('已退出登录');
    router.push('/');
  } catch (error) {
    message.error('退出失败: ' + (error as Error).message);
  } finally {
    logoutLoading.value = false;
  }
};
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.auth-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.user-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  max-width: 400px;
  margin: 20px auto;
}
</style>
