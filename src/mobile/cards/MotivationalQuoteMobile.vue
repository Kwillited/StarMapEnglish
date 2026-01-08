<script setup>
// 移动端激励名言卡片组件
import { ref, onMounted } from 'vue';

// 激励名言数据
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    author: "Jimmy Dean"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  }
];

// 当前显示的名言索引
const currentQuoteIndex = ref(0);

// 获取随机名言
const getRandomQuote = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentQuoteIndex.value);
  currentQuoteIndex.value = newIndex;
};

// 组件挂载时获取随机名言
onMounted(() => {
  getRandomQuote();
});

// 定义事件
const emit = defineEmits(['start-training']);

// 处理开始特训事件
const handleStartTraining = () => {
  emit('start-training');
};
</script>

<template>
  <!-- 移动端激励名言卡片 -->
  <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl transition hover:scale-[1.01] cursor-pointer">
    <div class="flex flex-col items-center justify-center text-center">
      <div class="text-accent mb-3">
        <i class="fa-solid fa-quote-left text-2xl"></i>
      </div>
      <p class="text-slate-300 text-sm sm:text-base mb-2">
        {{ quotes[currentQuoteIndex].text }}
      </p>
      <p class="text-xs text-slate-400 font-light mb-4">
        — {{ quotes[currentQuoteIndex].author }}
      </p>
      <button 
        @click="handleStartTraining"
        class="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg transition-colors text-sm"
      >
        开始特训
      </button>
    </div>
  </div>
</template>