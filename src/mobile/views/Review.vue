<script setup>
// 复习页面组件
import { ref, computed } from 'vue';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';

// 获取单词管理状态
const wordStore = useWordManagementStore();

// 计算属性：当前正在复习的单词
const currentWord = computed(() => {
  return wordStore.reviewWords[0] || null;
});

// 处理单词学习完成事件
const handleComplete = (status) => {
  if (currentWord.value) {
    wordStore.completeReview(currentWord.value.id, status);
  }
};
</script>

<template>
  <!-- 复习页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <router-link to="/vocabulary/mobile" class="text-white hover:text-vocab transition-colors w-10">
        <i class="fa-solid fa-arrow-left text-xl"></i>
      </router-link>
      <div class="flex-1 text-center">
        <h2 class="text-xl font-bold text-white">复习模式</h2>
      </div>
      <div class="w-10"></div>
    </div>

    <!-- 复习进度 -->
    <div class="p-4">
      <div class="flex gap-4">
        <!-- 复习进度 -->
        <div class="flex-1">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>复习进度</span>
            <span>{{ wordStore.reviewProgress }}/{{ wordStore.totalReviewWords }}</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div class="bg-accent h-2 rounded-full" :style="{ width: (wordStore.reviewProgress / wordStore.totalReviewWords * 100) + '%' }"></div>
          </div>
        </div>
        <!-- 轮次进度条 -->
        <div class="flex-1">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>轮次进度</span>
            <span>{{ Math.min(wordStore.currentRound, wordStore.maxRounds) }}/{{ wordStore.maxRounds }}</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div class="bg-blue-500 h-2 rounded-full" :style="{ width: (wordStore.roundProgress * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 单词卡片 -->
        <div v-if="currentWord" class="p-6">
          <div class="flex flex-col items-center justify-center">
            <!-- 单词和音标 -->
            <div class="flex flex-col items-center gap-2 mb-4">
              <h3 class="text-3xl font-bold text-white">{{ currentWord.word }}</h3>
              <p class="text-slate-500 text-sm">{{ currentWord.phonetic }}</p>
            </div>
            
            <!-- 释义 -->
            <div class="mb-6 w-full text-center">
              <p class="text-slate-300 text-lg">
                {{ currentWord.meaning }}
              </p>
            </div>
          </div>
        </div>
    
    <!-- 操作按钮 - 固定在底部 -->
    <div v-if="currentWord" class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md p-4">
      <div class="flex gap-3 w-full">
        <button 
          @click="handleComplete('known')"
          class="flex-1 text-green-400 py-2 rounded-lg border-b-4 border-green-500"
        >
          认识
        </button>
        <button 
          @click="handleComplete('fuzzy')"
          class="flex-1 text-yellow-400 py-2 rounded-lg border-b-4 border-yellow-500"
        >
          模糊
        </button>
        <button 
          @click="handleComplete('forgot')"
          class="flex-1 text-red-400 py-2 rounded-lg border-b-4 border-red-500"
        >
          忘记
        </button>
      </div>
    </div>
    
    <!-- 复习完成 -->
        <div v-else class="p-6 flex flex-col items-center justify-center">
          <div class="text-green-400 text-4xl mb-3">
            <i class="fa-solid fa-check-circle"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">复习完成！</h3>
          <p class="text-slate-400 text-center mb-4">您已经完成了所有单词的复习</p>
          <button 
            @click="wordStore.resetReviewState"
            class="bg-accent text-white py-2 px-4 rounded-lg"
          >
            重新开始
          </button>
        </div>
  </div>
</template>