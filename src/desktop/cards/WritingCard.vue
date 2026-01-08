<script setup>
// 写作练习卡片组件
import DashboardCard from './DashboardCard.vue';
</script>

<template>
  <!-- 写作练习卡片 -->
  <DashboardCard
    title="信息合成 (Writing)"
    subtitle="图表作文/议论文"
    icon="fa-solid fa-pen-ruler"
    color-class="text-write"
    bg-color-class="bg-write/20"
    hover-color-class="hover:bg-write/5"
  >
    <template #content>
      <!-- 写作练习进度模拟 -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-400">2023年考研写作B</span>
          <span class="text-write font-bold">35%</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-1.5">
          <div class="bg-write h-1.5 rounded-full" style="width: 35%"></div>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>