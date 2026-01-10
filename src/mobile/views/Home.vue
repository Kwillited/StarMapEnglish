<script setup>
import { computed } from 'vue';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';
import { useUserStore } from '../../shared/stores/userStore.js';

const wordStore = useWordManagementStore();
const userStore = useUserStore();

// --- 数据计算逻辑 ---
// 模拟四个维度的详细数据，实际项目中替换为真实 Store 数据

const stats = computed(() => {
  const vocabTotal = wordStore.totalWords || 1;
  const vocabLearned = wordStore.learningStats.total || 0;
  
  return {
    vocabulary: {
      label: '词汇量',
      value: vocabLearned,
      max: vocabTotal,
      unit: '词',
      percent: Math.min(Math.round((vocabLearned / vocabTotal) * 100), 100),
      color: 'text-blue-400',
      bg: 'bg-blue-500',
      icon: 'fa-shapes'
    },
    listening: {
      label: '听力时长',
      value: 12.5,
      max: 50,
      unit: '小时',
      percent: 25,
      color: 'text-purple-400',
      bg: 'bg-purple-500',
      icon: 'fa-headphones'
    },
    reading: {
      label: '阅读篇数',
      value: 42,
      max: 100,
      unit: '篇',
      percent: 42,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500',
      icon: 'fa-book-open'
    },
    writing: {
      label: '写作字数',
      value: 3.2,
      max: 10,
      unit: 'k字',
      percent: 32,
      color: 'text-rose-400',
      bg: 'bg-rose-500',
      icon: 'fa-pen-nib'
    }
  };
});

// 计算综合评分 (0-100)
const overallScore = computed(() => {
  const s = stats.value;
  return Math.round((s.vocabulary.percent + s.listening.percent + s.reading.percent + s.writing.percent) / 4);
});

// SVG 圆环计算
const radius = 80;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = computed(() => {
  return circumference - (overallScore.value / 100) * circumference;
});
</script>

<template>
  <!-- 根容器：响应式设计，适配各种屏幕尺寸 -->
  <div class="h-full w-full flex flex-col p-4 sm:p-6 md:p-8 relative font-sans pt-safe">
    
    <!-- 背景光效装饰 - 增强视觉层次感 -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-900/20 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>

    <!-- 1. 头部用户信息 (约 10% 高度) -->
    <header class="shrink-0 flex justify-between items-center mb-6 sm:mb-8 z-10">
      <div>
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">学习数据看板</h1>
        <p class="text-slate-400 text-xs sm:text-sm mt-1">
          <i class="fa-solid fa-user-tag mr-1 text-slate-500"></i>
          {{ userStore.userInfo?.username || '用户' }}
        </p>
      </div>
      <div class="text-right">
        <p class="text-slate-500 text-xs">Today</p>
        <p class="text-slate-300 font-mono text-sm">{{ new Date().toLocaleDateString() }}</p>
      </div>
    </header>

    <!-- 2. 核心大仪表盘 (约 40% 高度) -->
    <!-- 展示综合评分 -->
    <div class="shrink-0 relative flex flex-col items-center justify-center py-6 sm:py-8 z-10 min-h-[30vh]">
      
        <!-- 纯 SVG 仪表盘 -->
        <div class="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
        <!-- 外圈刻度装饰 -->
        <div class="absolute inset-0 border-2 border-slate-800 rounded-full border-dashed opacity-50"></div>
        
        <svg class="w-full h-full transform -rotate-90 drop-shadow-2xl">
          <!-- 轨道 -->
          <circle cx="50%" cy="50%" :r="radius" stroke="rgba(71, 85, 105, 0.8)" stroke-width="12" fill="transparent" />
          <!-- 进度条 -->
          <circle cx="50%" cy="50%" :r="radius" stroke="url(#gradient)" stroke-width="12" fill="transparent" 
            stroke-linecap="round"
            class="transition-all duration-1500 ease-out"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
          />
          <!-- 渐变定义 - 调整为垂直渐变以适应旋转后的圆环 -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="50%" stop-color="#6366f1" />
              <stop offset="100%" stop-color="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <!-- 中间文字 -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-slate-400 text-sm uppercase tracking-widest mb-1">综合能力</span>
          <span class="text-6xl font-bold text-white tracking-tighter">{{ overallScore }}</span>
          <span class="text-slate-500 text-xs mt-2 bg-slate-800/80 px-2 py-1 rounded-full">Level {{ Math.floor(overallScore / 10) + 1 }}</span>
        </div>
      </div>
    </div>

    <!-- 3. 详细数据矩阵 (剩余空间自动填充) -->
    <!-- 使用 flex-1 占据剩余所有高度，grid 布局 -->
    <div class="flex-1 min-h-0 z-10 pt-4 pb-safe">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 h-full">
        
        <!-- 遍历四个数据卡片 -->
        <div v-for="(item, key) in stats" :key="key" 
             class="glass-card p-4 flex flex-col justify-between relative overflow-hidden">
          
          <!-- 卡片背景微光 -->
          <div class="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br opacity-10 rounded-full blur-xl" :class="item.bg.replace('bg-', 'from-')"></div>

          <!-- 上部：图标与标题 -->
          <div class="flex items-start justify-between">
            <div class="flex flex-col">
              <span class="text-slate-400 text-xs font-medium uppercase tracking-wider">{{ item.label }}</span>
              <div class="mt-1 flex items-baseline">
                <span class="text-2xl font-bold text-white">{{ item.value }}</span>
                <span class="text-xs text-slate-500 ml-1">{{ item.unit }}</span>
              </div>
            </div>
            <div class="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center" :class="item.color">
              <i class="fa-solid" :class="item.icon"></i>
            </div>
          </div>

          <!-- 下部：进度条与百分比 -->
          <div class="mt-2">
             <div class="flex justify-between text-xs mb-1">
               <span class="text-slate-500">进度</span>
               <span :class="item.color">{{ item.percent }}%</span>
             </div>
             <div class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
               <div class="h-full rounded-full transition-all duration-1000" 
                    :class="item.bg" 
                    :style="{ width: `${item.percent}%` }">
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* 安全区域适配 */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 1.5rem);
}
.pt-safe {
  padding-top: env(safe-area-inset-top, 1rem);
}

/* 字体微调 */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 自定义动画效果 */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
</style>