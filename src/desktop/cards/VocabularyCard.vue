<script setup>
// 词汇学习卡片组件
import DashboardCard from './DashboardCard.vue';
</script>

<template>
  <!-- 词汇学习卡片 -->
  <DashboardCard
    title="词汇扩展 (Vocabulary)"
    subtitle="CET4高频词汇"
    icon="fa-solid fa-graduation-cap"
    color-class="text-vocab"
    bg-color-class="bg-vocab/20"
    hover-color-class="hover:bg-vocab/5"
  >
    <template #content>
      <!-- 词汇学习进度模拟 -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-400">CET4高频词汇</span>
          <span class="text-vocab font-bold">45%</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-1.5">
          <div class="bg-vocab h-1.5 rounded-full" style="width: 45%"></div>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>