<script setup>
// 控制台页面组件
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../shared/stores/userStore.js';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';
import DashboardCard from '../cards/DashboardCard.vue';
import VocabularyCard from '../cards/VocabularyCard.vue';
import ReadingCard from '../cards/ReadingCard.vue';
import ListeningCard from '../cards/ListeningCard.vue';
import WritingCard from '../cards/WritingCard.vue';
import MemoryRetention from '../cards/MemoryRetention.vue';
import MotivationalQuoteWrapper from '../../shared/cards/MotivationalQuoteWrapper.vue';

// 获取用户状态
const userStore = useUserStore();

// 获取单词管理状态
const wordStore = useWordManagementStore();

// 处理继续播放听力
const handleContinuePlaying = () => {
  console.log('继续播放听力');
};

// 处理开始特训
const handleStartTraining = () => {
  console.log('开始特训');
};

// 处理开始学习
const handleStartLearning = () => {
  wordStore.studyMode = 'study';
  console.log('开始学习');
};

// 处理开始复习
const handleStartReview = () => {
  wordStore.studyMode = 'review';
  console.log('开始复习');
};
</script>

<template>
  <!-- 控制台页面 -->
  <div class="space-y-4 sm:space-y-6">


    <!-- 主要数据卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
      <!-- 词汇学习卡片 -->
      <VocabularyCard />
      
      <!-- 阅读学习卡片 -->
      <ReadingCard />
      
      <!-- 听力学习卡片 -->
      <ListeningCard @continue-playing="handleContinuePlaying" />
      
      <!-- 写作学习卡片 -->
      <WritingCard />
    </div>

    <!-- 第二行卡片 -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      <!-- 记忆保持率卡片 -->
      <MemoryRetention />
      
      <!-- 激励名言卡片 -->
      <div class="md:col-span-2 lg:col-span-4">
        <MotivationalQuoteWrapper @start-training="handleStartTraining" />
      </div>
    </div>

    <!-- 学习建议卡片 -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      <!-- 今日学习计划卡片 -->
      <div class="lg:col-span-6 glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl transition hover:scale-[1.01] cursor-pointer">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div class="p-2 sm:p-3 rounded-lg bg-vocab/20 text-vocab">
            <i class="fa-solid fa-calendar-check"></i>
          </div>
          <div class="flex flex-col">
            <h3 class="font-bold text-white text-base sm:text-lg">今日学习计划</h3>
            <p class="text-xs text-slate-400">CET4词汇 / 50个</p>
          </div>
        </div>
        
        <!-- 学习进度 -->
        <div class="space-y-2 mb-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">今日学习目标</span>
            <span class="text-vocab font-bold">0 / 50</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-1.5">
            <div class="bg-vocab h-1.5 rounded-full" style="width: 0%"></div>
          </div>
        </div>
        
        <!-- 学习按钮 -->
        <div class="flex gap-2">
          <button 
            @click="handleStartReview"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors text-sm"
          >
            开始复习
          </button>
          <button 
            @click="handleStartLearning"
            class="flex-1 bg-vocab hover:bg-vocab/90 text-white py-2 rounded-lg transition-colors text-sm"
          >
            开始学习
          </button>
        </div>
      </div>
      
      <!-- 学习建议卡片 -->
      <div class="lg:col-span-6 glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl transition hover:scale-[1.01] cursor-pointer">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div class="p-2 sm:p-3 rounded-lg bg-accent/20 text-accent">
            <i class="fa-solid fa-lightbulb"></i>
          </div>
          <div class="flex flex-col">
            <h3 class="font-bold text-white text-base sm:text-lg">学习建议</h3>
            <p class="text-xs text-slate-400">基于您的学习数据</p>
          </div>
        </div>
        
        <!-- 建议内容 -->
        <div class="space-y-3">
          <div class="flex items-start gap-2">
            <i class="fa-solid fa-circle-check text-green-400 mt-1 text-xs"></i>
            <p class="text-slate-300 text-xs sm:text-sm">建议先完成{{ wordStore.dueForReview }}个复习单词，再学习新单词</p>
          </div>
          <div class="flex items-start gap-2">
            <i class="fa-solid fa-circle-check text-green-400 mt-1 text-xs"></i>
            <p class="text-slate-300 text-xs sm:text-sm">每天保持30分钟以上的听力练习</p>
          </div>
          <div class="flex items-start gap-2">
            <i class="fa-solid fa-circle-check text-green-400 mt-1 text-xs"></i>
            <p class="text-slate-300 text-xs sm:text-sm">建议每周完成2-3篇阅读练习</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>