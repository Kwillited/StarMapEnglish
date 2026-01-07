<script setup>
// 阅读进度卡片组件
import DashboardCard from './DashboardCard.vue';

const props = defineProps({
  readingProgress: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- 档案解密 (阅读) -->
  <DashboardCard
    title="档案解密 (Reading)"
    subtitle="经济学人精读"
    icon="fa-solid fa-glasses"
    color-class="text-read"
    bg-color-class="bg-read/20"
    hover-color-class="hover:bg-read/5"
  >
    <template #content>
      <div class="space-y-2">
        <div class="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
          <div class="h-full bg-read" :style="{ width: `${readingProgress.percentage}%` }"></div>
        </div>
        <p class="text-xs text-slate-400 flex justify-between">
          <span class="truncate">{{ readingProgress.title }}</span>
          <span>{{ readingProgress.percentage }}%</span>
        </p>
      </div>
    </template>
    
    <template #actions>
      <div class="mt-3 flex gap-1.5">
        <span class="px-1.5 py-1 rounded text-[10px] border border-slate-600 text-slate-400">长难句分析</span>
        <span class="px-1.5 py-1 rounded text-[10px] border border-slate-600 text-slate-400">逻辑链</span>
      </div>
    </template>
  </DashboardCard>
</template>
