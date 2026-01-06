<script setup>
// VocabularyReactor组件，显示词汇学习进度
const props = defineProps({
  vocabularyProgress: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- 单词反应堆 -->
  <div class="glass-card p-6 rounded-3xl lg:col-span-8 relative overflow-hidden group cursor-pointer">
    <div class="absolute top-0 right-0 p-32 bg-vocab/10 rounded-full blur-3xl -mr-16 -mt-16 transition group-hover:bg-vocab/20"></div>
    
    <div class="flex justify-between items-start relative z-10">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2 h-2 rounded-full bg-vocab"></span>
          <h2 class="text-xl font-bold text-white">单词反应堆</h2>
        </div>
        <p class="text-slate-400 text-sm mb-6">今日核心词汇: {{ vocabularyProgress.categories }}</p>
      </div>
      <span class="text-3xl font-bold text-vocab">{{ vocabularyProgress.current }}/{{ vocabularyProgress.total }}</span>
    </div>

    <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
      <div 
        v-for="(item, index) in vocabularyProgress.words" 
        :key="index"
        class="min-w-[140px] h-32 bg-slate-800/50 rounded-xl p-4 flex flex-col justify-between border border-slate-700 hover:border-vocab transition"
      >
        <span class="text-lg font-bold text-white">{{ item.word }}</span>
        <span class="text-xs text-slate-400">{{ item.meaning }}</span>
      </div>
      <div class="min-w-[140px] h-32 flex items-center justify-center rounded-xl border border-dashed border-slate-600 text-slate-500 hover:text-vocab hover:border-vocab transition">
        <span class="text-sm">继续加载</span>
      </div>
    </div>
  </div>
</template>