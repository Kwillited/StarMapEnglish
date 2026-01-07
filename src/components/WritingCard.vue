<script setup>
// 写作练习卡片组件
import DashboardCard from './DashboardCard.vue';
</script>

<template>
  <!-- 结构实验室 (写作) -->
  <DashboardCard
    title="结构实验室 (Writing)"
    subtitle="大作文模版 / 语法纠错"
    icon="fa-solid fa-pen-fancy"
    color-class="text-write"
    bg-color-class="bg-write/20"
    hover-color-class="hover:bg-write/5"
    col-span="md:col-span-2 lg:col-span-4"
  >
    <template #content>
      <div class="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
        <p class="text-xs text-slate-300 font-mono leading-relaxed">
          <span class="text-red-400 line-through">As far as I am concerned</span> 
          <span class="text-green-400">From my perspective</span>, 
          technology acts as a double-edged sword...
        </p>
      </div>
    </template>
  </DashboardCard>
</template>
