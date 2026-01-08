<script setup>
// 移动端词汇学习页面
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore();
// 路由实例
const router = useRouter();

// 获取当前模式下的单词列表
const currentWords = computed(() => {
  return wordStore.studyMode === 'review' ? wordStore.filteredReviewWords : wordStore.filteredWords;
});

// 跳转到复习页面
const goToReviewPage = () => {
  router.push('/review');
};
</script>

<template>
  <div class="space-y-4 px-4 pb-6 pt-20">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <h2 class="text-lg font-bold text-white flex items-center justify-center p-4">
        <i class="fa-solid fa-shapes text-vocab mr-2"></i>
        反应堆
      </h2>
    </div>
    

    
    <!-- 学习模式切换 - 独立卡片样式 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="flex justify-center flex-wrap gap-2">

        <button 
          @click="goToReviewPage"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block bg-slate-800/50 text-slate-300'
          ]"
        >
          <span class="relative">
            复习
            <span v-if="wordStore.dueForReview > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wordStore.dueForReview }}
            </span>
          </span>
        </button>
        <button 
          @click="router.push('/study')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block bg-slate-800/50 text-slate-300'
          ]"
        >
          学习
        </button>
        <button 
          @click="router.push('/test')"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap inline-block bg-slate-800/50 text-slate-300'
          ]"
        >
          测试
        </button>
      </div>
    </div>
    
    <!-- 复习提醒卡片 - 独立卡片样式 -->
    <div class="glass-card bg-vocab/10 border border-vocab/30 p-4 rounded-xl">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-bell text-vocab text-xl"></i>
          <h4 class="text-white font-semibold">复习提醒</h4>
        </div>
        <p class="text-slate-400 text-sm">您有 <span class="text-vocab font-bold">{{ wordStore.dueForReview }}</span> 个单词需要复习，建议先完成复习再学习新单词，以提高记忆效果。</p>
        <router-link 
          to="/review"
          class="bg-vocab hover:bg-vocab/90 text-white text-sm px-4 py-2 rounded-full transition-colors w-full inline-block text-center"
        >
          开始复习
        </router-link>
      </div>
    </div>
    
    <!-- 学习记录 - 独立卡片样式 -->
    <div class="glass-card p-4 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-3">学习记录</h3>
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">今日学习</span>
          <span class="block text-lg font-bold text-white">{{ wordStore.dailyWords }}</span>
          <span class="block text-xs text-slate-400">单词</span>
        </div>
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">累计学习</span>
          <span class="block text-lg font-bold text-white">{{ wordStore.learningStats.total }}</span>
          <span class="block text-xs text-slate-400">单词</span>
        </div>
        <div class="bg-slate-800/50 p-2 rounded-lg text-center">
          <span class="block text-xs text-slate-400 mb-1">单词总数</span>
          <span class="block text-lg font-bold text-green-400">{{ wordStore.totalWords }}</span>
          <span class="block text-xs text-slate-400">个单词</span>
        </div>
      </div>
    </div>
    

    
    <!-- 测试模式内容 -->
    <div v-if="wordStore.studyMode === 'test'" class="glass-card p-6 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-4">词汇测试</h3>
      <div class="bg-slate-800/50 p-8 rounded-lg text-center">
        <i class="fa-solid fa-pencil-alt text-4xl text-vocab mb-4 opacity-70"></i>
        <h4 class="text-xl font-bold text-white mb-2">测试功能开发中</h4>
        <p class="text-slate-400">词汇测试功能即将上线，敬请期待！</p>
      </div>
    </div>
  </div>
</template>