<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">实验室设备管理系统</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" class="sider">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :items="menuItems"
            @click="handleMenuClick"
        />
      </a-layout-sider>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import {
  HomeOutlined,
  DatabaseOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();

const selectedKeys = ref<string[]>([route.path]);

const menuItems = ref([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '首页',
  },
  {
    key: '/devices',
    icon: () => h(DatabaseOutlined),
    label: '设备管理',
  },
  {
    key: '/maintenance',
    icon: () => h(ToolOutlined),
    label: '维护管理',
  },
  {
    key: '/purchase-requests',
    icon: () => h(ShoppingCartOutlined),
    label: '采购申请',
  },
  {
    key: '/statistics',
    icon: () => h(BarChartOutlined),
    label: '统计查询',
  },
]);

const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (typeof e.key === 'string') {
    router.push(e.key);
  }
};

watch(
    () => route.path,
    (newPath: string) => {
      selectedKeys.value = [newPath];
    }
);
</script>

<style scoped>
.header {
  height: 90px;
  padding: 0;
  background: #001529;
  color: white;
  line-height: 90px;
}

.logo {
  height: 100%;
  color: #fff;
  font-size: 24px;
  text-align: center;
}

.sider {
  background: #fff;
  height: calc(100vh - 90px);
}

.content {
  padding: 24px;
  min-height: calc(100vh - 90px);
  background: #fff;
}
</style>
