<script setup>
// 单词卡片组件
import { computed, ref } from 'vue';

const props = defineProps({
  word: {
    type: Object,
    required: true
  },
  studyMode: {
    type: String,
    required: true
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

const emit = defineEmits(['toggle-meaning', 'complete-review']);

// 收藏状态
const isFavorited = ref(false);

// 切换收藏状态
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
};

// 计算是否显示释义
const isMeaningVisible = computed(() => {
  return props.showMeaning[props.word.id] || props.showAllMeanings || props.studyMode === 'browse';
});

// 切换释义显示
const handleToggleMeaning = () => {
  emit('toggle-meaning', props.word.id);
};

// 完成复习
const handleCompleteReview = (status) => {
  emit('complete-review', props.word.id, status);
};

// 获取难度标签
const difficultyLabel = computed(() => {
  return {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  }[props.word.difficulty];
});

// 获取难度样式
const difficultyClass = computed(() => {
  return {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400'
  }[props.word.difficulty];
});

// 获取优先级标签
const priorityLabel = computed(() => {
  return {
    high: '高',
    medium: '中',
    low: '低'
  }[props.word.reviewPriority || 'medium'];
});

// 获取优先级样式
const priorityClass = computed(() => {
  return {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-blue-500/20 text-blue-400'
  }[props.word.reviewPriority || 'medium'];
});
</script>

<template>
  <div class="bg-slate-800/50 p-4 rounded-lg hover:border-vocab/50 border border-slate-700 transition-all">
    <div class="flex justify-between items-start">
      <h4 class="text-xl font-bold text-white">{{ word.word }}</h4>
      <div class="flex gap-1 items-center">
        <span 
          :class="['text-xs px-2 py-1 rounded-full', difficultyClass]"
        >
          {{ difficultyLabel }}
        </span>
        <span 
          v-if="studyMode === 'review'"
          :class="['text-xs px-2 py-1 rounded-full', priorityClass]"
        >
          {{ priorityLabel }}
        </span>
        <button 
          class="ml-1 text-slate-400 hover:text-yellow-400 transition-colors"
          :class="{ 'text-yellow-400': isFavorited }"
          title="收藏单词"
          @click="toggleFavorite"
        >
          <i :class="isFavorited ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"></i>
        </button>

      </div>
    </div>
    
    <!-- 释义显示 -->
    <div v-if="isMeaningVisible" class="mt-2">
      <p class="text-slate-300">{{ word.meaning }}</p>
      <p v-if="studyMode === 'review'" class="text-xs text-slate-500 mt-1">上次复习: {{ word.lastReviewed }}</p>
    </div>
    
    <!-- 隐藏释义 -->
    <div v-else class="mt-2">
      <div 
        class="bg-slate-700/50 h-8 rounded flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"
        @click="handleToggleMeaning"
      >
        <span class="text-slate-400 text-sm">点击显示释义</span>
      </div>
    </div>
    
    <!-- 统一的操作按钮 -->
    <div class="mt-3 flex justify-end">
      <div class="flex gap-3">
        <button 
          @click="handleCompleteReview('mastered')"
          class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          :title="studyMode !== 'review' ? '记住' : ''"
        >
          <i class="fa-solid fa-check mr-1"></i>
          记住
        </button>
        <button 
          @click="handleCompleteReview('forgot')"
          class="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          :title="studyMode !== 'review' ? '不认识' : ''"
        >
          <i class="fa-solid fa-times mr-1"></i>
          {{ studyMode === 'review' ? '忘记' : '不认识' }}
        </button>
        <button 
          @click="handleCompleteReview('fuzzy')"
          class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          :title="studyMode !== 'review' ? '模糊' : ''"
        >
          <i class="fa-solid fa-question mr-1"></i>
          模糊
        </button>
      </div>
    </div>
  </div>
</template>