<script setup>
// 阅读练习页面组件
import { ref } from 'vue';

// 阅读进度状态
const readingProgress = ref(30);
const currentParagraph = ref(0);

// 阅读文本段落
const paragraphs = [
  {
    id: 1,
    text: 'The Internet has revolutionized the way we communicate, work, and access information. It has become an integral part of modern life, connecting people from all corners of the globe.'
  },
  {
    id: 2,
    text: 'With the rise of social media platforms, individuals can now share their thoughts, ideas, and experiences with a worldwide audience instantaneously.'
  },
  {
    id: 3,
    text: 'E-commerce has transformed the retail industry, allowing consumers to shop from the comfort of their homes and have products delivered directly to their doorsteps.'
  },
  {
    id: 4,
    text: 'Online education has opened up new opportunities for lifelong learning, making quality education accessible to people who may not have had the chance otherwise.'
  },
  {
    id: 5,
    text: 'However, the Internet also presents challenges, such as privacy concerns, misinformation, and the digital divide between those who have access and those who do not.'
  }
];

// 高亮单词
const highlightedWords = ref([]);

// 处理单词高亮
const handleWordClick = (word) => {
  if (highlightedWords.value.includes(word)) {
    highlightedWords.value = highlightedWords.value.filter(w => w !== word);
  } else {
    highlightedWords.value.push(word);
  }
  console.log('高亮单词:', highlightedWords.value);
};
</script>

<template>
  <!-- 阅读练习页面 -->
  <div class="space-y-4 sm:space-y-6">
    <!-- 页面标题 -->
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-white">文献解码 (Reading)</h2>
      <p class="text-slate-400">2024考研英语阅读A</p>
    </div>

    <!-- 阅读进度条 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <div class="space-y-1">
        <div class="flex justify-between text-xs text-slate-400">
          <span>阅读进度</span>
          <span>{{ readingProgress }}%</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2">
          <div class="bg-read h-2 rounded-full" :style="{ width: readingProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 阅读内容区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <!-- 阅读文本 -->
      <div class="space-y-4 mb-6">
        <p 
          v-for="(paragraph, index) in paragraphs" 
          :key="paragraph.id"
          class="text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          <!-- 将文本分割为单词，支持点击高亮 -->
          <span 
            v-for="(word, wordIndex) in paragraph.text.split(' ')" 
            :key="wordIndex"
            :class="[
              'cursor-pointer transition',
              highlightedWords.includes(word) 
                ? 'text-read bg-read/20 px-1 rounded' 
                : 'hover:text-read'
            ]"
            @click="handleWordClick(word)"
          >
            {{ word }} 
          </span>
        </p>
      </div>
      
      <!-- 阅读工具 -->
      <div class="flex flex-wrap gap-2">
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-font"></i> 字体大小
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-highlighter"></i> 高亮
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-bookmark"></i> 书签
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-search"></i> 查找
        </button>
      </div>
    </div>
    
    <!-- 阅读题目区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <h3 class="text-lg font-bold text-white mb-4">阅读理解题</h3>
      
      <div class="space-y-4">
        <!-- 题目1 -->
        <div class="space-y-2">
          <h4 class="text-slate-300 font-medium">1. What has the Internet revolutionized?</h4>
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-read" />
              <span class="text-slate-300">A) The way we travel</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-read" />
              <span class="text-slate-300">B) The way we communicate</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-read" />
              <span class="text-slate-300">C) The way we eat</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-read" />
              <span class="text-slate-300">D) The way we sleep</span>
            </label>
          </div>
        </div>
        
        <!-- 提交按钮 -->
        <button class="w-full bg-read hover:bg-read/90 text-white py-2 rounded-lg transition-colors">
          提交答案
        </button>
      </div>
    </div>
  </div>
</template>