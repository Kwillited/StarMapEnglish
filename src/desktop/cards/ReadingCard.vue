<script setup>
// 阅读练习卡片组件
import DashboardCard from './DashboardCard.vue';
</script>

<template>
  <!-- 阅读练习卡片 -->
  <DashboardCard
    title="文献解码 (Reading)"
    subtitle="2024考研英语阅读A"
    icon="fa-solid fa-book-open"
    color-class="text-read"
    bg-color-class="bg-read/20"
    hover-color-class="hover:bg-read/5"
  >
    <template #content>
      <!-- 阅读练习进度模拟 -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-400">2024年考研阅读A</span>
          <span class="text-read font-bold">60%</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-1.5">
          <div class="bg-read h-1.5 rounded-full" style="width: 60%"></div>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>