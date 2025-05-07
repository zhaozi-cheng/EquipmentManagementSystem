<template>
  <div class="admin-dashboard">
    <h1>管理员仪表盘</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>系统概览</span>
        </div>
      </template>
      <div class="dashboard-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-statistic title="设备总数" :value="128" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="维护任务" :value="12" />
          </el-col>
          <el-col :span="8">
            <el-statistic title="采购申请" :value="5" />
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
// 这里可以添加组件逻辑
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