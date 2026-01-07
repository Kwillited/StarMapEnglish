<script setup>
// 导入组件
import VocabularyCard from '../components/VocabularyCard.vue'
import MemoryRetention from '../components/MemoryRetention.vue'
import ListeningCard from '../components/ListeningCard.vue'
import ReadingCard from '../components/ReadingCard.vue'
import WritingCard from '../components/WritingCard.vue'
import MotivationalQuote from '../components/MotivationalQuote.vue'
import { useWordManagementStore } from '../stores/wordManagement.js'
import { ref, watch } from 'vue'

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore()

// 定义组件数据
const vocabularyProgress = ref({
  current: wordStore.learningStats.total,
  total: 0,
  categories: '经济类 & 哲学类',
  words: [
    { word: 'Ubiquitous', meaning: '无处不在的' },
    { word: 'Pragmatic', meaning: '务实的' }
  ]
})

const memoryRetention = {
  percentage: 76,
  rating: '优秀'
}

const readingProgress = {
  title: 'The AI Revolution...',
  percentage: 65
}

// 从后端获取单词总数
const fetchTotalWords = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/wordbooks');
    if (response.ok) {
      const data = await response.json();
      // 计算所有词汇本的单词总数
      vocabularyProgress.value.total = data.reduce((sum, book) => sum + book.word_count, 0);
    }
  } catch (error) {
    console.error('Error fetching vocabulary books:', error);
  }
};

// 组件挂载时获取单词总数
fetchTotalWords();

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
