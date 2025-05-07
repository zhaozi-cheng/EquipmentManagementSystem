<template>
  <div class="error-container">
    <div class="error-content">
      <h1>403</h1>
      <h2>无权限访问</h2>
      <p>抱歉，您没有权限访问此页面</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.error-content {
  text-align: center;
  padding: 40px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 72px;
  margin: 0;
  color: #f56c6c;
}

h2 {
  font-size: 24px;
  margin: 20px 0;
  color: #606266;
}

p {
  margin-bottom: 20px;
  color: #909399;
}
</style>