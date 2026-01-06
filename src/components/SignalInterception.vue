<script setup>
// SignalInterception组件，处理听力练习
const emit = defineEmits(['continue-playing']);

const handleContinuePlaying = () => {
  emit('continue-playing');
};
</script>

<template>
  <!-- 信号截获 (听力) -->
  <div class="glass-card p-6 rounded-3xl md:col-span-1 lg:col-span-4 hover:bg-listen/5 transition cursor-pointer group">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-3 rounded-lg bg-listen/20 text-listen group-hover:scale-110 transition">
        <i class="fa-solid fa-tower-broadcast"></i>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold text-white">信号截获 (Listening)</h3>
        <p class="text-xs text-slate-400">BBC News / 2023真题</p>
      </div>
    </div>
    <div class="flex items-end gap-1 h-12 justify-center opacity-70">
      <div class="w-1 bg-listen h-4 animate-[pulse_1s_ease-in-out_infinite]"></div>
      <div class="w-1 bg-listen h-8 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
      <div class="w-1 bg-listen h-10 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
      <div class="w-1 bg-listen h-6 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
      <div class="w-1 bg-listen h-9 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
    </div>
    <button 
      @click="handleContinuePlaying"
      class="w-full mt-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
    >
      继续播放
    </button>
  </div>
</template>