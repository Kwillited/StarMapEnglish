<script setup>
// 移动端词汇学习页面
import WordCard from '../../components/cards/WordCard.vue';
import { useWordManagementStore } from '../../stores/wordManagement.js';
import { ref, onMounted, computed, watch } from 'vue';

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore();

// 初始化总复习单词数
wordStore.initializeTotalReviewWords();

// 当前显示的单词索引
const currentWordIndex = ref(0);

// 获取当前模式下的单词列表
const currentWords = computed(() => {
  return wordStore.studyMode === 'review' ? wordStore.filteredReviewWords : wordStore.filteredWords;
});

// 监听单词列表变化，重置索引
watch(currentWords, () => {
  currentWordIndex.value = 0;
});

// 切换到下一个单词
const nextWord = () => {
  if (currentWords.value.length > 0) {
    currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length;
  }
};

// 切换到上一个单词
const prevWord = () => {
  if (currentWords.value.length > 0) {
    currentWordIndex.value = (currentWordIndex.value - 1 + currentWords.value.length) % currentWords.value.length;
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- 页面标题 -->
    <h2 class="text-xl font-bold text-white mb-2 flex items-center justify-center p-4">
      <i class="fa-solid fa-shapes text-vocab mr-2"></i>
      词汇学习中心
    </h2>
    

    
    <!-- 学习模式切换 - 独立卡片样式 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="flex justify-center flex-wrap gap-2">

        <router-link 
          to="/review"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block',
            wordStore.studyMode === 'review' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          <span class="relative">
            复习
            <span v-if="wordStore.dueForReview > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wordStore.dueForReview }}
            </span>
          </span>
        </router-link>
        <router-link 
          to="/study"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block',
            wordStore.studyMode === 'study' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          学习
        </router-link>
        <router-link 
          to="/test"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block',
            wordStore.studyMode === 'test' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          测试
        </router-link>
      </div>
    </div>
    
    <!-- 复习提醒卡片 - 独立卡片样式 -->
    <div class="glass-card bg-vocab/10 border border-vocab/30 p-4 rounded-xl">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-bell text-vocab text-xl"></i>
          <h4 class="text-white font-semibold">复习提醒</h4>
        </div>
        <p class="text-slate-400 text-sm">您有 <span class="text-vocab font-bold">{{ wordStore.dueForReview }}</span> 个单词需要复习，建议先完成复习再学习新单词，以提高记忆效果。</p>
        <router-link 
          to="/review"
          class="bg-vocab hover:bg-vocab/90 text-white text-sm px-4 py-2 rounded-full transition-colors w-full inline-block text-center"
        >
          开始复习
        </router-link>
      </div>
    </div>
    
    <!-- 学习记录 - 独立卡片样式 -->
    <div class="glass-card p-4 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-3">学习记录</h3>
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">今日学习</span>
          <span class="block text-lg font-bold text-white">{{ wordStore.dailyWords }}</span>
          <span class="block text-xs text-slate-400">单词</span>
        </div>
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">累计学习</span>
          <span class="block text-lg font-bold text-white">{{ wordStore.learningStats.total }}</span>
          <span class="block text-xs text-slate-400">单词</span>
        </div>
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">单词总数</span>
          <span class="block text-lg font-bold text-green-400">{{ wordStore.totalWords }}</span>
          <span class="block text-xs text-slate-400">个单词</span>
        </div>
      </div>
    </div>
  </div>
</template>