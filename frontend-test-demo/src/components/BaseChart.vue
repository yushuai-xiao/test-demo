<script setup lang="ts">
import { ref, watch } from 'vue'
import { useECharts } from '../hooks/useECharts'
import type { EChartsOption } from 'echarts'

interface Props {
  option: EChartsOption
  theme?: string
  loading?: boolean
  loadingOptions?: {
    text?: string
    color?: string
    textColor?: string
    maskColor?: string
    zlevel?: number
  }
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  theme: undefined,
  loading: false,
  width: '100%',
  height: '400px'
})

const chartRef = ref<HTMLDivElement | null>(null)
const { setOption, showLoading, hideLoading, resize } = useECharts(
  chartRef,
  props.option,
  props.theme
)

// 监听配置变化
watch(
  () => props.option,
  (newOption) => {
    setOption(newOption)
  },
  { deep: true }
)

// 监听加载状态
watch(
  () => props.loading,
  (loading) => {
    if (loading) {
      showLoading(props.loadingOptions)
    } else {
      hideLoading()
    }
  }
)

// 暴露 resize 方法供外部调用
defineExpose({
  resize
})
</script>

<template>
  <div
    ref="chartRef"
    class="base-chart"
    :style="{ width: props.width, height: props.height }"
  ></div>
</template>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
