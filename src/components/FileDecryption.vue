<script setup>
// FileDecryption组件，显示阅读进度
const props = defineProps({
  readingProgress: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- 档案解密 (阅读) -->
  <div class="glass-card p-6 rounded-3xl md:col-span-1 lg:col-span-4 hover:bg-read/5 transition cursor-pointer group">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-3 rounded-lg bg-read/20 text-read group-hover:scale-110 transition">
        <i class="fa-solid fa-glasses"></i>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold text-white">档案解密 (Reading)</h3>
        <p class="text-xs text-slate-400">经济学人精读</p>
      </div>
    </div>
    <div class="space-y-2">
      <div class="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <div class="h-full bg-read" :style="{ width: `${readingProgress.percentage}%` }"></div>
      </div>
      <p class="text-xs text-slate-400 flex justify-between">
        <span>{{ readingProgress.title }}</span>
        <span>{{ readingProgress.percentage }}%</span>
      </p>
    </div>
    <div class="mt-4 flex gap-2">
      <span class="px-2 py-1 rounded text-[10px] border border-slate-600 text-slate-400">长难句分析</span>
      <span class="px-2 py-1 rounded text-[10px] border border-slate-600 text-slate-400">逻辑链</span>
    </div>
  </div>
</template>