<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import BaseChart from './BaseChart.vue'
import type { EChartsOption } from 'echarts'

// 模拟数据加载
const salesLoading = ref(false)
const userLoading = ref(false)
const trendLoading = ref(false)
const categoryLoading = ref(false)

// 销售数据配置
const salesOption = ref<EChartsOption>({
  title: {
    text: '月度销售额',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value',
    name: '销售额（万元）'
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    }
  ]
} as EChartsOption)

// 用户增长配置
const userOption = ref<EChartsOption>({
  title: {
    text: '用户增长趋势',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
    name: '用户数'
  },
  series: [
    {
      name: '新增用户',
      type: 'line',
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      areaStyle: {
        color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(128, 255, 165, 0.8)' },
          { offset: 1, color: 'rgba(1, 191, 236, 0.1)' }
        ])
      },
      itemStyle: {
        color: '#00d4ff'
      }
    }
  ]
} as EChartsOption)

// 趋势分析配置
const trendOption = ref<EChartsOption>({
  title: {
    text: '访问趋势',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '访问来源',
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
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '直接访问' },
        { value: 735, name: '邮件营销' },
        { value: 580, name: '联盟广告' },
        { value: 484, name: '视频广告' },
        { value: 300, name: '搜索引擎' }
      ]
    }
  ]
} as EChartsOption)

// 分类统计配置
const categoryOption = ref<EChartsOption>({
  title: {
    text: '产品分类统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['电子产品', '服装', '食品', '家居', '图书']
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [320, 302, 301, 334, 390],
      itemStyle: {
        color: function (params: any): string {
          const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
          return colors[params.dataIndex % colors.length] || '#5470c6'
        }
      }
    }
  ]
} as EChartsOption)

// 统计数据
const stats = ref([
  { label: '总销售额', value: '¥1,234,567', icon: '💰', color: '#409EFF' },
  { label: '总订单数', value: '8,888', icon: '📦', color: '#67C23A' },
  { label: '总用户数', value: '12,345', icon: '👥', color: '#E6A23C' },
  { label: '增长率', value: '+12.5%', icon: '📈', color: '#F56C6C' }
])

// 模拟数据加载
onMounted(() => {
  // 可以在这里调用 API 加载真实数据
  loadData()
})

const loadData = async () => {
  // 模拟异步加载
  salesLoading.value = true
  userLoading.value = true
  trendLoading.value = true
  categoryLoading.value = true

  setTimeout(() => {
    salesLoading.value = false
    userLoading.value = false
    trendLoading.value = false
    categoryLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>数据看板</h1>
      <p class="subtitle">实时监控业务数据</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card"
        :style="{ borderTopColor: stat.color }"
      >
        <div class="stat-icon" :style="{ color: stat.color }">
          {{ stat.icon }}
        </div>
        <div class="stat-content">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-grid">
      <div class="chart-card">
        <BaseChart
          :option="salesOption"
          :loading="salesLoading"
          height="350px"
        />
      </div>

      <div class="chart-card">
        <BaseChart
          :option="userOption"
          :loading="userLoading"
          height="350px"
        />
      </div>

      <div class="chart-card">
        <BaseChart
          :option="trendOption"
          :loading="trendLoading"
          height="350px"
        />
      </div>

      <div class="chart-card">
        <BaseChart
          :option="categoryOption"
          :loading="categoryLoading"
          height="350px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-top: 4px solid;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 48px;
  margin-right: 16px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.chart-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
