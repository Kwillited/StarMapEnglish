<script setup>
// 导入组件
import NavBar from './components/NavBar.vue'
import PageHeader from './components/PageHeader.vue'
import VocabularyReactor from './components/VocabularyReactor.vue'
import MemoryRetention from './components/MemoryRetention.vue'
import SignalInterception from './components/SignalInterception.vue'
import FileDecryption from './components/FileDecryption.vue'
import StructureLab from './components/StructureLab.vue'
import MotivationalQuote from './components/MotivationalQuote.vue'

// 定义组件数据
const user = {
  name: 'Alex',
  exam: '2026考研英语一',
  daysLeft: 186,
  energy: 85
}

const vocabularyProgress = {
  current: 50,
  total: 120,
  categories: '经济类 & 哲学类',
  words: [
    { word: 'Ubiquitous', meaning: '无处不在的' },
    { word: 'Pragmatic', meaning: '务实的' }
  ]
}

const memoryRetention = {
  percentage: 76,
  rating: '优秀'
}

const readingProgress = {
  title: 'The AI Revolution...',
  percentage: 65
}

// 定义组件方法
const startTraining = () => {
  console.log('开始今日特训')
  // 这里可以添加实际的特训开始逻辑
}

const continuePlaying = () => {
  console.log('继续播放听力')
  // 这里可以添加实际的播放逻辑
}
</script>

<template>
  <div class="text-slate-200 min-h-screen flex flex-col md:flex-row h-screen">
    <!-- 导航栏组件 -->
    <NavBar />

    <!-- 主内容区 -->
    <main class="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pb-24 md:pb-8 h-full">
      
      <!-- 页面头部组件 -->
      <PageHeader :user="user" class="mb-6" />

      <!-- 激励语区域组件 -->
      <MotivationalQuote @start-training="startTraining" />

      <!-- 内容网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-8">
        <!-- 单词反应堆组件 -->
        <VocabularyReactor :vocabulary-progress="vocabularyProgress" />

        <!-- 记忆留存率组件 -->
        <MemoryRetention :memory-retention="memoryRetention" />

        <!-- 信号截获 (听力) 组件 -->
        <SignalInterception @continue-playing="continuePlaying" />

        <!-- 档案解密 (阅读) 组件 -->
        <FileDecryption :reading-progress="readingProgress" />

        <!-- 结构实验室 (写作) 组件 -->
        <StructureLab />

      </div>

    </main>
  </div>
</template>

<style>
/* 全局样式 - 应用于整个页面 */
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 自定义颜色变量 */
:root {
  --accent: #38bdf8;
  --vocab: #818cf8;
  --read: #34d399;
  --listen: #fbbf24;
  --write: #f472b6;
}

/* 玻璃拟态卡片效果 */
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

/* 隐藏滚动条 */
.hide-scrollbar {
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
