<script setup>
// MotivationalQuote组件，显示激励语和开始特训按钮
import { ref, onMounted } from 'vue';

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

// 组件挂载时初始化 - 已简化，不再随机显示名言
onMounted(() => {
  // 初始显示第一条名言
});
</script>

<template>
  <!-- 激励语区域 -->
  <div class="mt-4 glass-card p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-gradient-to-r from-slate-800 to-slate-900/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:bg-gradient-to-r from-slate-800/90 to-slate-900/70">
    <div class="max-w-2xl text-center md:text-left">
      <!-- 名言文本 -->
      <div>
        <p 
          class="text-base sm:text-lg md:text-xl font-serif italic text-slate-300 transition-all duration-500 ease-out"
        >
          "{{ currentQuote.text }}"
        </p>
        <p class="text-xs sm:text-sm text-slate-500 mt-2 transition-all duration-500 ease-out">
          — {{ currentQuote.author }}
        </p>
      </div>
      
      <!-- 名言来源标签 -->
      <div class="mt-3 sm:mt-4 flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500">
        <i class="fa-solid fa-quote-left"></i>
        <span>每日英语名言</span>
      </div>
    </div>
    
    <!-- 开始特训按钮 -->
    <button 
      @click="handleStartTraining"
      class="relative bg-accent text-slate-900 font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden"
      :class="{ 'scale-95 opacity-80': isStarting }"
    >
      <span v-if="!isStarting" class="relative z-10">开始今日特训</span>
      <span v-else class="relative z-10">特训开始中...</span>
      
      <!-- 加载动画 -->
      <div 
        v-if="isStarting" 
        class="absolute inset-0 bg-white/30 animate-pulse"
      ></div>
      
      <!-- 按钮背景效果 -->
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl transition-all duration-500 hover:scale-150"></div>
    </button>
  </div>
</template>