<script setup>
// 移动端 MotivationalQuote组件，显示激励语和开始特训按钮
import { ref } from 'vue';

const emit = defineEmits(['start-training']);

// 励志名言列表
const quotes = [
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "What we learn with pleasure we never forget.",
    author: "Alfred Mercier"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  }
];

// 当前显示的名言 - 初始显示第一条
const currentQuote = ref(quotes[0]);
// 特训按钮状态
const isStarting = ref(false);

// 开始特训处理
const handleStartTraining = () => {
  isStarting.value = true;
  emit('start-training');
  
  // 重置按钮状态
  setTimeout(() => {
    isStarting.value = false;
  }, 1000);
};
</script>

<template>
  <!-- 激励语区域 - 移动端垂直布局 -->
  <div class="mt-4 glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-800 to-slate-900/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
    <div class="w-full text-center">
      <!-- 名言文本 -->
      <div>
        <p 
          class="text-base sm:text-lg font-serif italic text-slate-300 transition-all duration-300 ease-out"
        >
          "{{ currentQuote.text }}"
        </p>
        <p class="text-xs sm:text-sm text-slate-500 mt-2 transition-all duration-300 ease-out">
          — {{ currentQuote.author }}
        </p>
      </div>
      
      <!-- 名言来源标签 -->
      <div class="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
        <i class="fa-solid fa-quote-left"></i>
        <span>每日英语名言</span>
      </div>
    </div>
    
    <!-- 开始特训按钮 - 移动端优化，更大的触摸区域 -->
    <button 
      @click="handleStartTraining"
      class="w-full bg-accent text-slate-900 font-bold px-6 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden"
      :class="{ 'scale-95 opacity-80': isStarting }"
    >
      <span v-if="!isStarting" class="relative z-10">开始今日特训</span>
      <span v-else class="relative z-10">特训开始中...</span>
      
      <!-- 加载动画 -->
      <div 
        v-if="isStarting" 
        class="absolute inset-0 bg-white/30 animate-pulse"
      ></div>
      
      <!-- 按钮背景效果 - 简化版，提高移动端性能 -->
      <div class="absolute inset-0 bg-white/10 rounded-xl transition-all duration-300 hover:bg-white/20"></div>
    </button>
  </div>
</template>