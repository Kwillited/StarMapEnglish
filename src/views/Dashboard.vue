<script setup>
// 导入组件
import VocabularyCard from '../components/VocabularyCard.vue'
import MemoryRetention from '../components/MemoryRetention.vue'
import ListeningCard from '../components/ListeningCard.vue'
import ReadingCard from '../components/ReadingCard.vue'
import WritingCard from '../components/WritingCard.vue'
import MotivationalQuote from '../components/MotivationalQuote.vue'

// 定义组件数据
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
  <!-- 激励语区域组件 -->
  <MotivationalQuote @start-training="startTraining" />

  <!-- 内容网格 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-8">
    <!-- 单词反应堆组件 -->
    <VocabularyCard :vocabulary-progress="vocabularyProgress" />

    <!-- 记忆留存率组件 -->
    <MemoryRetention :memory-retention="memoryRetention" />

    <!-- 信号截获 (听力) 组件 -->
    <ListeningCard @continue-playing="continuePlaying" />

    <!-- 档案解密 (阅读) 组件 -->
    <ReadingCard :reading-progress="readingProgress" />

    <!-- 结构实验室 (写作) 组件 -->
    <WritingCard />

  </div>
</template>
