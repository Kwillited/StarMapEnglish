<script setup>
// 词汇学习进度卡片组件
import DashboardCard from './DashboardCard.vue';

const props = defineProps({
  vocabularyProgress: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- 单词反应堆 -->
  <DashboardCard
    title="单词反应堆"
    subtitle="今日核心词汇: {{ vocabularyProgress.categories }}"
    icon="fa-solid fa-atom"
    color-class="text-vocab"
    bg-color-class="bg-vocab/20"
    hover-color-class="hover:bg-vocab/5"
    col-span="lg:col-span-8"
  >
    <template #content>
      <div class="flex justify-between items-start relative z-10 mb-3">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-vocab"></span>
          </div>
        </div>
        <span class="text-2xl sm:text-3xl font-bold text-vocab">{{ vocabularyProgress.current }}/{{ vocabularyProgress.total }}</span>
      </div>

      <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        <div 
          v-for="(item, index) in vocabularyProgress.words" 
          :key="index"
          class="min-w-[120px] sm:min-w-[140px] h-28 sm:h-32 bg-slate-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col justify-between border border-slate-700 hover:border-vocab transition"
        >
          <span class="text-base sm:text-lg font-bold text-white">{{ item.word }}</span>
          <span class="text-xs text-slate-400">{{ item.meaning }}</span>
        </div>
        <div class="min-w-[120px] sm:min-w-[140px] h-28 sm:h-32 flex items-center justify-center rounded-lg sm:rounded-xl border border-dashed border-slate-600 text-slate-500 hover:text-vocab hover:border-vocab transition">
          <span class="text-xs sm:text-sm">继续加载</span>
        </div>
      </div>
    </template>
  </DashboardCard>
</template>
