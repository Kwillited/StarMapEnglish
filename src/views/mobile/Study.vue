<script setup>
// 移动端词汇学习页面
import WordCard from '../../desktop/cards/WordCard.vue';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';
import { ref, onMounted, computed, watch } from 'vue';

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore();

// 当前显示的单词索引
const currentWordIndex = ref(0);

// 获取当前模式下的单词列表
const currentWords = computed(() => {
  return wordStore.studyMode === 'study' ? wordStore.filteredWords : wordStore.filteredWords;
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

// 进入页面时设置学习模式
onMounted(() => {
  wordStore.studyMode = 'study';
});
</script>

<template>
  <div class="space-y-4">
    <!-- 学习模式进度 - 非卡片样式 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/vocabulary" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <h3 class="text-lg font-semibold text-white">词汇学习</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>
    
    <!-- 单词卡片显示 - 独立卡片样式 -->
    <div v-if="currentWords.length > 0" class="mb-4">
      <!-- 单词卡片 -->
      <div class="mb-3">
        <WordCard
          :word="currentWords[currentWordIndex]"
          :study-mode="wordStore.studyMode"
          :show-meaning="wordStore.showMeaning"
          :show-all-meanings="wordStore.showAllMeanings"
          @toggle-meaning="wordStore.toggleMeaning"
          @complete-review="wordStore.completeReview"
        />
      </div>
      

    </div>
    
    <!-- 空状态 - 独立卡片样式 -->
    <div v-else class="text-center py-12">
      <i class="fa-solid fa-search text-4xl mb-2 opacity-50 text-slate-400"></i>
      <p class="text-slate-400">没有找到匹配的单词</p>
    </div>
  </div>
</template>