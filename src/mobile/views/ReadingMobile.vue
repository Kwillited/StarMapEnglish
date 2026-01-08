<script setup>
// 移动端阅读练习页面
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
};
</script>

<template>
  <!-- 阅读练习页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 标题 -->
      <div class="flex items-center justify-center mb-3">
        <h3 class="text-lg font-semibold text-white">信号解析 (Reading)</h3>
      </div>
    </div>
    
    <!-- 阅读内容卡片 -->
    <div class="glass-card p-4 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-4">阅读文本</h3>
      <div class="bg-slate-800/50 p-6 rounded-lg">
        <div class="space-y-4">
          <p 
            v-for="(paragraph, index) in paragraphs" 
            :key="paragraph.id" 
            class="text-slate-300 leading-relaxed"
          >
            {{ paragraph.text }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- 阅读进度 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="flex justify-between text-sm text-slate-400 mb-2">
        <span>阅读进度</span>
        <span>{{ readingProgress }}%</span>
      </div>
      <div class="w-full bg-slate-700/50 rounded-full h-2">
        <div 
          class="bg-read h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${readingProgress}%` }"
        ></div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex gap-3 p-4">
      <button 
        class="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-3 rounded-lg transition-colors"
      >
        上一篇
      </button>
      <button 
        class="flex-1 bg-read hover:bg-read/90 text-white px-4 py-3 rounded-lg transition-colors"
      >
        下一篇
      </button>
    </div>
  </div>
</template>