<script setup>
// 移动端词汇复习页面
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
    <!-- 复习模式进度 - 非卡片样式 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/vocabulary" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <h3 class="text-lg font-semibold text-white">复习进度</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
      <div class="flex gap-4">
        <!-- 轮次显示 -->
        <div class="flex-1 space-y-3">
          <div class="flex justify-between items-center">
            <h4 class="text-sm text-slate-400">复习轮次</h4>
            <span class="text-sm text-white">{{ Math.min(wordStore.currentRound, wordStore.maxRounds) }} / {{ wordStore.maxRounds }}</span>
          </div>
          <!-- 轮次进度条 -->
          <div class="w-full bg-slate-700/50 rounded-full h-2">
            <div 
              class="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${wordStore.roundProgress * 100}%` }"
            ></div>
          </div>
        </div>
        
        <!-- 本轮复习进度 -->
        <div class="flex-1 space-y-3">
          <div class="flex justify-between items-center">
            <h4 class="text-sm text-slate-400">本轮进度</h4>
            <span class="text-sm text-white">{{ wordStore.reviewProgress }} / {{ wordStore.totalReviewWords }}</span>
          </div>
          <!-- 本轮进度条 -->
          <div class="w-full bg-slate-700/50 rounded-full h-2">
            <div 
              class="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${(wordStore.reviewProgress / wordStore.totalReviewWords) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 单词卡片显示 - 保留卡片样式 -->
    <div v-if="currentWords.length > 0">
      <!-- 单词卡片 - 交互卡片样式 -->
      <WordCard
        class="mb-4"
        :word="currentWords[currentWordIndex]"
        :study-mode="wordStore.studyMode"
        :show-meaning="wordStore.showMeaning"
        :show-all-meanings="wordStore.showAllMeanings"
        @toggle-meaning="wordStore.toggleMeaning"
        @complete-review="wordStore.completeReview"
      />
      

    </div>
    
    <!-- 空状态 - 简化样式 -->
    <div v-else-if="wordStore.studyMode === 'review' && wordStore.filteredReviewWords.length === 0" class="text-center py-12">
      <i class="fa-solid fa-check-circle text-4xl mb-2 opacity-50 text-green-400"></i>
      <p class="text-slate-400">没有需要复习的单词</p>
    </div>
    
    <div v-else-if="wordStore.studyMode !== 'review' && wordStore.filteredWords.length === 0" class="text-center py-12">
      <i class="fa-solid fa-search text-4xl mb-2 opacity-50 text-slate-400"></i>
      <p class="text-slate-400">没有找到匹配的单词</p>
    </div>
  </div>
</template>