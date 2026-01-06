<script setup>
// 单词卡片组件
import { computed } from 'vue';

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
      <div class="flex gap-1">
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
    
    <!-- 复习模式操作按钮 -->
    <div v-if="studyMode === 'review'" class="mt-4 flex justify-between items-center">
      <span class="text-xs text-vocab bg-vocab/20 px-2 py-1 rounded-full">{{ word.category }}</span>
      <div class="flex gap-2">
        <button 
          @click="handleCompleteReview('mastered')"
          class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-full text-sm transition-colors"
        >
          <i class="fa-solid fa-check mr-1"></i>
          已掌握
        </button>
        <button 
          @click="handleCompleteReview('forgot')"
          class="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-full text-sm transition-colors"
        >
          <i class="fa-solid fa-times mr-1"></i>
          忘记
        </button>
      </div>
    </div>
    
    <!-- 浏览和学习模式操作按钮 -->
    <div v-else class="mt-3 flex justify-between items-center">
      <span class="text-xs text-vocab bg-vocab/20 px-2 py-1 rounded-full">{{ word.category }}</span>
      <div class="flex gap-1">
        <button class="text-slate-400 hover:text-green-400 transition-colors" title="标记为已掌握">
          <i class="fa-solid fa-check-circle"></i>
        </button>
        <button class="text-slate-400 hover:text-yellow-400 transition-colors" title="添加到复习列表">
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button class="text-slate-400 hover:text-red-400 transition-colors" title="不认识">
          <i class="fa-solid fa-times-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>