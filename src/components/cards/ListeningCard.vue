<script setup>
// 听力练习卡片组件
import DashboardCard from './DashboardCard.vue';

const emit = defineEmits(['continue-playing']);

const handleContinuePlaying = () => {
  emit('continue-playing');
};
</script>

<template>
  <!-- 信号截获 (听力) -->
  <DashboardCard
    title="信号截获 (Listening)"
    subtitle="BBC News / 2023真题"
    icon="fa-solid fa-tower-broadcast"
    color-class="text-listen"
    bg-color-class="bg-listen/20"
    hover-color-class="hover:bg-listen/5"
  >
    <template #content>
      <div class="flex items-end gap-1 h-10 justify-center opacity-70">
        <div class="w-1 bg-listen h-3 animate-[pulse_1s_ease-in-out_infinite]"></div>
        <div class="w-1 bg-listen h-6 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
        <div class="w-1 bg-listen h-8 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
        <div class="w-1 bg-listen h-5 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        <div class="w-1 bg-listen h-7 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
      </div>
    </template>
    
    <template #actions>
      <button 
        @click="handleContinuePlaying"
        class="w-full mt-3 py-1.5 sm:py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
      >
        继续播放
      </button>
    </template>
  </DashboardCard>
</template>
