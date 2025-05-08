<template>
  <div class="admin-dashboard">
    <h1>管理员仪表盘</h1>
    <a-card class="box-card">
      <template #title>
        <div class="card-header">
          <span>系统概览</span>
        </div>
      </template>
      <div class="dashboard-content">
        <a-row :gutter="20">
          <a-col :span="8">
            <a-statistic title="设备总数" :value="128" />
          </a-col>
          <a-col :span="8">
            <a-statistic title="维护任务" :value="12" />
          </a-col>
          <a-col :span="8">
            <a-statistic title="采购申请" :value="5" />
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
// 逻辑保持不变
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.box-card {
  margin-top: 20px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.dashboard-content {
  margin-top: 20px;
}
</style>
