<script setup>
// MotivationalQuote组件，显示激励语和开始特训按钮
const emit = defineEmits(['start-training']);

const handleStartTraining = () => {
  emit('start-training');
};
</script>

<template>
  <!-- 激励语区域 -->
  <div class="mt-6 glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-800 to-slate-900/50">
    <div class="max-w-2xl">
      <p class="text-lg md:text-xl font-serif italic text-slate-300">"The roots of education are bitter, but the fruit is sweet."</p>
      <p class="text-sm text-slate-500 mt-2">— Aristotle</p>
    </div>
    <button 
      @click="handleStartTraining"
      class="bg-accent text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-white hover:scale-105 transition shadow-[0_0_20px_rgba(56,189,248,0.3)]"
    >
      开始今日特训
    </button>
  </div>
</template>