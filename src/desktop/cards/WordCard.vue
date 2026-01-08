<script setup>
// 单词卡片组件
import { ref, defineProps } from 'vue';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';

const props = defineProps({
  word: {
    type: Object,
    required: true
  },
  studyMode: {
    type: String,
    default: 'browse'
  },
  showMeaning: {
    type: Object,
    default: () => ({})
  },
  showAllMeanings: {
    type: Boolean,
    default: false
  }
});

// 获取单词管理store
const wordStore = useWordManagementStore();

// 切换显示释义
const toggleMeaning = (wordId) => {
  wordStore.toggleMeaning(wordId);
};

// 处理单词学习完成事件
const handleComplete = (wordId, status) => {
  wordStore.completeReview(wordId, status);
};
</script>

<template>
  <!-- 单词卡片 -->
  <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl transition hover:scale-[1.01] cursor-pointer">
    <div class="flex flex-col">
      <!-- 单词和音标 -->
      <div class="flex flex-col gap-1 mb-3">
        <h3 class="text-xl font-bold text-white">{{ word.word }}</h3>
        <p class="text-slate-500 text-sm">{{ word.phonetic }}</p>
      </div>
      
      <!-- 释义 -->
      <div class="mb-4">
        <p :class="['text-slate-300', (showMeaning[word.id] || showAllMeanings) ? 'block' : 'hidden']">
          {{ word.meaning }}
        </p>
        <button 
          @click="toggleMeaning(word.id)"
          class="text-xs text-vocab hover:text-vocab/80 transition-colors"
        >
          {{ (showMeaning[word.id] || showAllMeanings) ? '隐藏释义' : '显示释义' }}
        </button>
      </div>
      
      <!-- 操作按钮 - 仅在学习或复习模式下显示 -->
      <div v-if="studyMode === 'study' || studyMode === 'review'" class="flex gap-2">
        <button 
          @click="handleComplete(word.id, 'known')"
          class="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 py-1.5 rounded-lg transition-colors text-xs"
        >
          认识
        </button>
        <button 
          @click="handleComplete(word.id, 'fuzzy')"
          class="flex-1 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 py-1.5 rounded-lg transition-colors text-xs"
        >
          模糊
        </button>
        <button 
          @click="handleComplete(word.id, 'forgot')"
          class="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 py-1.5 rounded-lg transition-colors text-xs"
        >
          忘记
        </button>
      </div>
    </div>
  </div>
</template>