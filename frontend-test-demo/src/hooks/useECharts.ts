import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

/**
 * ECharts Hook
 * @param chartRef 图表容器的 ref
 * @param option 图表配置项
 * @param theme 主题名称（可选）
 */
export function useECharts(
  chartRef: Ref<HTMLDivElement | null>,
  option?: EChartsOption,
  theme?: string
) {
  const chartInstance = ref<ECharts | null>(null)
  const isLoading = ref(false)

  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return

    // 如果已存在实例，先销毁
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }

    // 创建新实例
    chartInstance.value = echarts.init(chartRef.value, theme)

    // 设置初始配置
    if (option) {
      chartInstance.value.setOption(option)
    }

    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', handleResize)
  }

  // 设置图表配置
  const setOption = (newOption: EChartsOption, notMerge?: boolean) => {
    if (chartInstance.value) {
      chartInstance.value.setOption(newOption, notMerge)
    }
  }

  // 更新图表配置（合并模式）
  const updateOption = (newOption: EChartsOption) => {
    setOption(newOption, false)
  }

  // 显示加载状态
  const showLoading = (options?: {
    text?: string
    color?: string
    textColor?: string
    maskColor?: string
    zlevel?: number
  }) => {
    if (chartInstance.value) {
      isLoading.value = true
      chartInstance.value.showLoading(options)
    }
  }

  // 隐藏加载状态
  const hideLoading = () => {
    if (chartInstance.value) {
      isLoading.value = false
      chartInstance.value.hideLoading()
    }
  }

  // 获取图表实例
  const getInstance = () => {
    return chartInstance.value
  }

  // 调整图表大小
  const resize = () => {
    if (chartInstance.value) {
      chartInstance.value.resize()
    }
  }

  // 处理窗口大小变化
  const handleResize = () => {
    resize()
  }

  // 销毁图表
  const dispose = () => {
    if (chartInstance.value) {
      window.removeEventListener('resize', handleResize)
      chartInstance.value.dispose()
      chartInstance.value = null
    }
  }

  // 组件挂载时初始化
  onMounted(() => {
    initChart()
  })

  // 组件卸载前销毁
  onBeforeUnmount(() => {
    dispose()
  })

  return {
    chartInstance,
    isLoading,
    setOption,
    updateOption,
    showLoading,
    hideLoading,
    getInstance,
    resize,
    dispose,
    initChart
  }
}
