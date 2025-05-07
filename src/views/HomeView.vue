/// src/views/HomeView.vue
<template>
  <div class="home-container">
    <h2>首页</h2>
    <p>欢迎使用实验室设备管理系统</p>

    <!-- 未登录状态显示登录/注册按钮 -->
    <div v-if="!userStore.token" class="auth-buttons">
      <el-button type="primary" @click="showLoginModal = true">登录</el-button>
      <el-button @click="showRegisterModal = true">注册</el-button>
    </div>

    <!-- 已登录状态显示用户信息 -->
    <div v-else class="user-info">
      <p>欢迎, {{ userStore.user?.username }} ({{ roleName }})</p>
      <el-button @click="handleLogout">退出登录</el-button>
    </div>

    <!-- 登录弹窗 -->
    <el-dialog v-model="showLoginModal" title="登录" width="30%">
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="用户名" required>
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showLoginModal = false">取消</el-button>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </template>
    </el-dialog>

    <!-- 注册弹窗 -->
    <el-dialog v-model="showRegisterModal" title="注册" width="30%">
      <el-form :model="registerForm" label-width="100px">
        <el-form-item label="用户名" required>
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input v-model="registerForm.email" type="email" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" required>
          <el-input v-model="registerForm.confirmPassword" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showRegisterModal = false">取消</el-button>
        <el-button type="primary" @click="handleRegister">注册</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';
import { ElMessage } from 'element-plus';

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
    ElMessage.success('登录成功');

    // 根据角色跳转不同页面
    if (userStore.user?.role === 'admin') {
      router.push('/admin');
    }
  } catch (error) {
    ElMessage.error('登录失败: ' + (error as Error).message);
  }
};

// 处理退出
const handleLogout = async () => {
  try {
    await userStore.logout();
    ElMessage.success('已退出登录');
    router.push('/');
  } catch (error) {
    ElMessage.error('退出失败: ' + (error as Error).message);
  }
};

// 处理注册
const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  try {
    // 调用注册API
    // await registerUser(registerForm.value);
    ElMessage.success('注册成功！请登录');
    showRegisterModal.value = false;
    showLoginModal.value = true;
  } catch (error) {
    ElMessage.error('注册失败: ' + (error as Error).message);
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