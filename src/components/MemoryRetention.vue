<script setup>
// 记忆留存率卡片组件
import DashboardCard from './DashboardCard.vue';
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  memoryRetention: {
    type: Object,
    required: true
  }
});

// 图表切换状态
const chartType = ref('circle'); // circle, line

// 计算圆形进度条的dashoffset
const circumference = 2 * Math.PI * 40;
const offset = circumference - (props.memoryRetention.percentage / 100) * circumference;

// 折线图数据
const retentionData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  values: [72, 75, 78, 70, 76, 80, 76]
};

// 折线图引用
let lineChart = null;
const chartRef = ref(null);

// 初始化折线图
const initLineChart = () => {
  if (chartRef.value) {
    // 销毁已存在的图表
    if (lineChart) {
      lineChart.destroy();
    }
    
    // 创建新图表
    lineChart = new Chart(chartRef.value, {
      type: 'line',
      data: {
        labels: retentionData.labels,
        datasets: [{
          label: '记忆留存率 (%)',
          data: retentionData.values,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#38bdf8',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              stepSize: 20
            }
          }
        }
      }
    });
  }
};

// 切换图表类型
const toggleChartType = () => {
  chartType.value = chartType.value === 'circle' ? 'line' : 'circle';
};

// 监听图表类型变化，重新初始化折线图
watch(chartType, (newType) => {
  if (newType === 'line') {
    // 延迟初始化，确保DOM已更新
    setTimeout(initLineChart, 0);
  }
});

// 组件挂载时初始化
onMounted(() => {
  if (chartType.value === 'line') {
    initLineChart();
  }
});
</script>

<template>
  <!-- 记忆留存率 -->
  <DashboardCard
    title="记忆留存率"
    icon="fa-solid fa-brain"
    color-class="text-accent"
    bg-color-class="bg-accent/20"
    hover-color-class="hover:bg-accent/5"
  >
    <!-- 图表切换按钮 -->
    <template #actions>
      <div class="flex justify-center mb-3 sm:mb-4">
        <button 
          @click="toggleChartType"
          class="flex items-center gap-1 px-2 py-1 text-xs bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-colors text-center"
        >
          <i :class="chartType === 'circle' ? 'fa-solid fa-chart-line' : 'fa-solid fa-chart-pie'" class="text-accent text-xs"></i>
          <span class="text-[10px]">{{ chartType === 'circle' ? '切换到折线图' : '切换到环形图' }}</span>
        </button>
      </div>
    </template>
    
    <!-- 内容区域 -->
    <template #content>
      <!-- 环形图 -->
      <div v-if="chartType === 'circle'" class="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#1e293b" stroke-width="8" fill="none"></circle>
          <circle cx="50" cy="50" r="40" stroke="#38bdf8" stroke-width="8" fill="none" :stroke-dasharray="circumference" :stroke-dashoffset="offset" stroke-linecap="round"></circle>
        </svg>
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <span class="text-xl sm:text-2xl font-bold text-white">{{ memoryRetention.percentage }}%</span>
          <span class="text-[10px] text-slate-400">{{ memoryRetention.rating }}</span>
        </div>
      </div>
      
      <!-- 折线图 -->
      <div v-else class="w-full h-36 sm:h-40">
        <canvas ref="chartRef"></canvas>
      </div>
    </template>
  </DashboardCard>
</template>
