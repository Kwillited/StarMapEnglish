<script setup>
// 移动端首页组件
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';
import { useUserStore } from '../../shared/stores/userStore.js';

// 获取单词管理状态
const wordStore = useWordManagementStore();

// 获取用户状态
const userStore = useUserStore();
</script>

<template>
  <!-- 移动端首页 -->
  <div class="space-y-6 p-4">
    <!-- 用户信息和欢迎 -->
    <div class="glass-card p-4 rounded-2xl">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white">欢迎回来</h2>
          <p class="text-slate-400 text-sm">{{ userStore.userInfo?.username || '学习者' }}</p>
        </div>
        <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-slate-900">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </div>

    <!-- 学习统计 -->
    <div class="glass-card p-4 rounded-2xl">
      <h3 class="text-lg font-semibold text-white mb-4">学习统计</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-slate-800/50 p-3 rounded-xl">
          <p class="text-slate-400 text-xs">今日学习</p>
          <p class="text-white font-bold text-lg">{{ wordStore.learningStats.today }} 词</p>
        </div>
        <div class="bg-slate-800/50 p-3 rounded-xl">
          <p class="text-slate-400 text-xs">总学习</p>
          <p class="text-white font-bold text-lg">{{ wordStore.learningStats.total }} 词</p>
        </div>
        <div class="bg-slate-800/50 p-3 rounded-xl">
          <p class="text-slate-400 text-xs">待复习</p>
          <p class="text-white font-bold text-lg">{{ wordStore.dueForReview }} 词</p>
        </div>
        <div class="bg-slate-800/50 p-3 rounded-xl">
          <p class="text-slate-400 text-xs">单词总数</p>
          <p class="text-white font-bold text-lg">{{ wordStore.totalWords }} 词</p>
        </div>
      </div>
    </div>

    <!-- 学习功能卡片 -->
    <div class="glass-card p-4 rounded-2xl">
      <h3 class="text-lg font-semibold text-white mb-4">开始学习</h3>
      <div class="grid grid-cols-2 gap-3">
        <router-link to="/vocabulary/mobile" class="bg-vocab/20 p-3 rounded-xl text-center hover:bg-vocab/30 transition-colors">
          <i class="fa-solid fa-shapes text-2xl text-vocab mb-2"></i>
          <p class="text-white text-sm">词汇学习</p>
        </router-link>
        <router-link to="/listening/mobile" class="bg-listen/20 p-3 rounded-xl text-center hover:bg-listen/30 transition-colors">
          <i class="fa-solid fa-headphones text-2xl text-listen mb-2"></i>
          <p class="text-white text-sm">听力练习</p>
        </router-link>
        <router-link to="/reading/mobile" class="bg-read/20 p-3 rounded-xl text-center hover:bg-read/30 transition-colors">
          <i class="fa-solid fa-book-open text-2xl text-read mb-2"></i>
          <p class="text-white text-sm">阅读训练</p>
        </router-link>
        <router-link to="/writing/mobile" class="bg-write/20 p-3 rounded-xl text-center hover:bg-write/30 transition-colors">
          <i class="fa-solid fa-pen-nib text-2xl text-write mb-2"></i>
          <p class="text-white text-sm">写作练习</p>
        </router-link>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="glass-card p-4 rounded-2xl">
      <h3 class="text-lg font-semibold text-white mb-4">快速操作</h3>
      <div class="grid grid-cols-2 gap-3">
        <router-link to="/study" class="bg-accent/20 p-3 rounded-xl text-center hover:bg-accent/30 transition-colors">
          <i class="fa-solid fa-book text-2xl text-accent mb-2"></i>
          <p class="text-white text-sm">开始学习</p>
        </router-link>
        <router-link to="/review" class="bg-green-500/20 p-3 rounded-xl text-center hover:bg-green-500/30 transition-colors">
          <i class="fa-solid fa-repeat text-2xl text-green-400 mb-2"></i>
          <p class="text-white text-sm">单词复习</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移动端首页样式 */
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur-2xl;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.5);
}
</style>