<script setup>
// PageHeader组件，显示用户信息和考试倒计时
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- 页面头部 -->
  <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-white tracking-tight">下午好, 指挥官 <span class="text-accent">{{ user.name }}</span></h1>
      <p class="text-slate-400 text-sm mt-1">当前任务: <span class="text-white bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs border border-red-500/30">{{ user.exam }}</span></p>
    </div>
    
    <div class="glass-card px-5 py-3 rounded-full flex items-center gap-4 w-full md:w-auto">
      <div class="flex flex-col">
        <span class="text-xs text-slate-400 uppercase tracking-wider">距离发射 (考试)</span>
        <span class="font-mono text-xl text-accent font-bold">{{ user.daysLeft }} <span class="text-xs font-normal text-slate-400">天</span></span>
      </div>
      <div class="h-8 w-[1px] bg-slate-600"></div>
      <div class="flex flex-col">
        <span class="text-xs text-slate-400 uppercase tracking-wider">今日能量</span>
        <span class="font-mono text-xl text-green-400 font-bold">{{ user.energy }}%</span>
      </div>
    </div>
  </header>
</template>