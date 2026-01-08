<script setup>
// 记忆保持卡片组件
import DashboardCard from './DashboardCard.vue';
</script>

<template>
  <!-- 记忆保持 (Memory Retention) -->
  <DashboardCard
    title="记忆保持 (Retention)"
    subtitle="近30天记忆曲线"
    icon="fa-solid fa-chart-line"
    color-class="text-green-400"
    bg-color-class="bg-green-400/20"
    hover-color-class="hover:bg-green-400/5"
    col-span="md:col-span-2 lg:col-span-8"
  >
    <template #content>
      <!-- 记忆保持率图表占位 -->
      <div class="h-24 flex items-center justify-center">
        <div class="w-full flex justify-between items-end h-20 px-2">
          <!-- 记忆曲线柱状图模拟 -->
          <div class="w-1 bg-green-400 h-14 rounded-t animate-[pulse_2s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-16 rounded-t animate-[pulse_2.5s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-12 rounded-t animate-[pulse_1.8s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-18 rounded-t animate-[pulse_2.2s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-13 rounded-t animate-[pulse_2.3s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-15 rounded-t animate-[pulse_2.1s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-11 rounded-t animate-[pulse_2.4s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-17 rounded-t animate-[pulse_1.9s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-12 rounded-t animate-[pulse_2.6s_ease-in-out_infinite]"></div>
          <div class="w-1 bg-green-400 h-14 rounded-t animate-[pulse_2.0s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>