<template>
  <div class="statistics-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-container">
          <h3>设备类别分布</h3>
          <div ref="categoryChart" style="height: 400px;"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-container">
          <h3>设备状态统计</h3>
          <div ref="statusChart" style="height: 400px;"></div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <div class="chart-container">
          <h3>年度设备购置趋势</h3>
          <div ref="purchaseTrendChart" style="height: 400px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { useDeviceStore } from '@/stores/device';

const deviceStore = useDeviceStore();

const categoryChart = ref<HTMLElement>();
const statusChart = ref<HTMLElement>();
const purchaseTrendChart = ref<HTMLElement>();

let categoryChartInstance: echarts.ECharts | null = null;
let statusChartInstance: echarts.ECharts | null = null;
let purchaseTrendChartInstance: echarts.ECharts | null = null;

onMounted(async () => {
  await deviceStore.fetchDevices();
  initCharts();
  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  categoryChartInstance?.dispose();
  statusChartInstance?.dispose();
  purchaseTrendChartInstance?.dispose();
});

const initCharts = () => {
  // 设备类别分布图
  if (categoryChart.value) {
    categoryChartInstance = echarts.init(categoryChart.value);
    const categoryData = calculateCategoryDistribution();
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备类别',
          type: 'pie',
          radius: '50%',
          data: categoryData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    categoryChartInstance.setOption(option);
  }

  // 设备状态统计图
  if (statusChart.value) {
    statusChartInstance = echarts.init(statusChart.value);
    const statusData = calculateStatusDistribution();
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备状态',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: statusData
        }
      ]
    };
    statusChartInstance.setOption(option);
  }

  // 年度设备购置趋势图
  if (purchaseTrendChart.value) {
    purchaseTrendChartInstance = echarts.init(purchaseTrendChart.value);
    const trendData = calculatePurchaseTrend();
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: trendData.years
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '购置数量',
          type: 'bar',
          data: trendData.counts,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    purchaseTrendChartInstance.setOption(option);
  }
};

const resizeCharts = () => {
  categoryChartInstance?.resize();
  statusChartInstance?.resize();
  purchaseTrendChartInstance?.resize();
};

const calculateCategoryDistribution = () => {
  const categories = [
    { name: '计算机类', value: 0 },
    { name: '网络设备', value: 0 },
    { name: '实验仪器', value: 0 },
    { name: '办公设备', value: 0 },
    { name: '其他', value: 0 }
  ];

  deviceStore.devices.forEach(device => {
    switch (device.category) {
      case 'computer':
        categories[0].value++;
        break;
      case 'network':
        categories[1].value++;
        break;
      case 'experiment':
        categories[2].value++;
        break;
      case 'office':
        categories[3].value++;
        break;
      default:
        categories[4].value++;
    }
  });

  return categories;
};

const calculateStatusDistribution = () => {
  const statuses = [
    { name: '正常', value: 0 },
    { name: '维修中', value: 0 },
    { name: '已报废', value: 0 }
  ];

  deviceStore.devices.forEach(device => {
    switch (device.status) {
      case 'normal':
        statuses[0].value++;
        break;
      case 'repairing':
        statuses[1].value++;
        break;
      case 'scrapped':
        statuses[2].value++;
        break;
    }
  });

  return statuses;
};

const calculatePurchaseTrend = () => {
  // 假设我们统计最近5年的数据
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i).map(String);
  const counts = Array(5).fill(0);

  deviceStore.devices.forEach(device => {
    const year = device.purchaseDate.split('-')[0];
    const index = years.indexOf(year);
    if (index !== -1) {
      counts[index]++;
    }
  });

  return { years, counts };
};
</script>

<style scoped>
.chart-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}
</style>