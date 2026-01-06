<script setup>
// MemoryRetention组件，显示记忆留存率
const props = defineProps({
  memoryRetention: {
    type: Object,
    required: true
  }
});

// 计算圆形进度条的dashoffset
const circumference = 2 * Math.PI * 40;
const offset = circumference - (props.memoryRetention.percentage / 100) * circumference;
</script>

<template>
  <!-- 记忆留存率 -->
  <div class="glass-card p-6 rounded-3xl lg:col-span-4 flex flex-col justify-center items-center text-center relative">
    <h3 class="text-slate-400 text-sm uppercase mb-4">记忆留存率</h3>
    <div class="relative w-32 h-32">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#1e293b" stroke-width="8" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#38bdf8" stroke-width="8" fill="none" :stroke-dasharray="circumference" :stroke-dashoffset="offset" stroke-linecap="round"></circle>
      </svg>
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
        <span class="text-2xl font-bold text-white">{{ memoryRetention.percentage }}%</span>
        <span class="text-[10px] text-slate-400">{{ memoryRetention.rating }}</span>
      </div>
    </div>
  </div>
</template>