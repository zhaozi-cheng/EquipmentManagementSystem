<template>
  <div class="error-container">
    <div class="error-content">
      <h1>404</h1>
      <h2>页面不存在</h2>
      <p>抱歉，您访问的页面不存在</p>
      <a-button type="primary" @click="goHome">返回首页</a-button>
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
/* 复用403页面的样式 */
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