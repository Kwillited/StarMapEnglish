<script setup>
// 词汇学习页面
import WordCard from '../components/WordCard.vue';
import { useWordManagementStore } from '../stores/wordManagement.js';
import { ref, onMounted, computed, watch } from 'vue';

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore();

// 初始化总复习单词数
wordStore.initializeTotalReviewWords();

// 当前显示的单词索引
const currentWordIndex = ref(0);

// 获取当前模式下的单词列表
const currentWords = computed(() => {
  return wordStore.studyMode === 'review' ? wordStore.filteredReviewWords : wordStore.filteredWords;
});

// 监听单词列表变化，重置索引
watch(currentWords, () => {
  currentWordIndex.value = 0;
});

// 切换到下一个单词
const nextWord = () => {
  if (currentWords.value.length > 0) {
    currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length;
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="glass-card p-4 md:p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
        <i class="fa-solid fa-shapes text-vocab mr-2"></i>
        词汇学习中心
      </h2>
      
      <!-- 搜索和模式切换 -->
      <div class="flex flex-col md:flex-row items-center gap-3 mb-3">
        <!-- 搜索框 -->
        <div class="relative flex-1">
          <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            v-model="wordStore.searchQuery" 
            placeholder="搜索单词或释义..." 
            class="w-full bg-slate-800/50 border border-slate-700 rounded-full px-12 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-vocab transition-colors"
          />
        </div>
        
        <!-- 学习模式切换 -->
        <div class="flex justify-center w-full md:w-auto">
          <div class="flex flex-wrap gap-2 justify-around">
            <button 
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                wordStore.studyMode === 'browse' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
              @click="wordStore.toggleStudyMode('browse')"
            >
              浏览
            </button>
            <button 
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                wordStore.studyMode === 'review' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
              @click="wordStore.toggleStudyMode('review')"
            >
              <span class="relative">
                复习
                <span v-if="wordStore.dueForReview > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {{ wordStore.dueForReview }}
                </span>
              </span>
            </button>
            <button 
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                wordStore.studyMode === 'study' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
              @click="wordStore.toggleStudyMode('study')"
            >
              学习
            </button>
            <button 
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                wordStore.studyMode === 'test' ? 'bg-vocab text-white' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
              @click="wordStore.toggleStudyMode('test')"
            >
              测试
            </button>
          </div>
        </div>
      </div>
      
      <!-- 复习提醒卡片 -->
      <div v-if="wordStore.dueForReview > 0 && wordStore.studyMode === 'browse'" class="bg-vocab/10 border border-vocab/30 p-4 rounded-lg mb-4">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-bell text-vocab text-xl"></i>
          <div class="flex-1">
            <h4 class="text-white font-semibold">复习提醒</h4>
            <p class="text-slate-400 text-sm">您有 <span class="text-vocab font-bold">{{ wordStore.dueForReview }}</span> 个单词需要复习，建议先完成复习再学习新单词，以提高记忆效果。</p>
          </div>
          <button 
            @click="wordStore.toggleStudyMode('review')"
            class="bg-vocab hover:bg-vocab/90 text-white text-sm px-4 py-2 rounded-full transition-colors"
          >
            开始复习
          </button>
        </div>
      </div>
      
      <!-- 学习记录 -->
      <div v-if="wordStore.studyMode === 'browse'" class="grid grid-cols-3 gap-3 mb-3">
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
          <span class="block text-lg font-bold text-green-400">{{ totalWords }}</span>
          <span class="block text-xs text-slate-400">个单词</span>
        </div>
      </div>
      
      <!-- 仅在非浏览、非测试模式下显示单词列表内容 -->
      <div v-if="wordStore.studyMode !== 'browse' && wordStore.studyMode !== 'test'">
        <!-- 复习模式进度 -->
        <div v-if="wordStore.studyMode === 'review'" class="mb-4 flex flex-row gap-4">
          <!-- 复习轮次部分 -->
          <div class="flex-1">
            <!-- 轮次显示 -->
              <div class="flex justify-between items-center mb-2">
                <h4 class="text-sm text-slate-400">复习轮次</h4>
                <span class="text-sm text-white">{{ Math.min(wordStore.currentRound, wordStore.maxRounds) }} / {{ wordStore.maxRounds }}</span>
              </div>
            <!-- 轮次进度条 -->
            <div class="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${wordStore.roundProgress * 100}%` }"
              ></div>
            </div>
          </div>
          
          <!-- 本轮复习进度部分 -->
          <div class="flex-1">
            <!-- 本轮复习进度 -->
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm text-slate-400">本轮进度</h4>
              <span class="text-sm text-white">{{ wordStore.reviewProgress }} / {{ wordStore.totalReviewWords }}</span>
            </div>
            <!-- 本轮进度条 -->
            <div class="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                class="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${(wordStore.reviewProgress / wordStore.totalReviewWords) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- 学习进度（仅学习模式） -->
        <div v-else-if="wordStore.studyMode === 'study'" class="mb-4 flex flex-row gap-4">
          <!-- 学习轮次部分 -->
          <div class="flex-1">
            <!-- 学习轮次 -->
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm text-slate-400">学习轮次</h4>
              <span class="text-sm text-white">{{ Math.min(wordStore.currentLearningRound, wordStore.maxLearningRounds) }} / {{ wordStore.maxLearningRounds }}</span>
            </div>
            <!-- 学习轮次进度条 -->
            <div class="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                class="bg-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${wordStore.learningRoundProgress * 100}%` }"
              ></div>
            </div>
          </div>
          
          <!-- 学习进度部分 -->
          <div class="flex-1">
            <!-- 学习进度 -->
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm text-slate-400">学习进度</h4>
              <span class="text-sm text-white">{{ wordStore.learningProgress }} / {{ wordStore.totalLearningWords }}</span>
            </div>
            <!-- 学习进度条 -->
            <div class="w-full bg-slate-700/50 rounded-full h-2">
              <div 
                class="bg-vocab h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${wordStore.learningProgress / wordStore.totalLearningWords * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        

        
        <!-- 单词卡片显示 -->
        <!-- 小屏单卡片显示模式 -->
        <div v-if="currentWords.length > 0" class="md:hidden">
          <div @click="nextWord" class="cursor-pointer">
            <WordCard
              :word="currentWords[currentWordIndex]"
              :study-mode="wordStore.studyMode"
              :show-meaning="wordStore.showMeaning"
              :show-all-meanings="wordStore.showAllMeanings"
              @toggle-meaning="wordStore.toggleMeaning"
              @complete-review="wordStore.completeReview"
            />
          </div>
          <div class="text-center mt-2 text-sm text-slate-400">
            点击卡片切换到下一个单词 ({{ currentWordIndex + 1 }} / {{ currentWords.length }})
          </div>
        </div>
        
        <!-- 大屏多卡片显示模式 -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- 动态渲染单词卡片 -->
          <WordCard
            v-for="word in currentWords"
            :key="word.id"
            :word="word"
            :study-mode="wordStore.studyMode"
            :show-meaning="wordStore.showMeaning"
            :show-all-meanings="wordStore.showAllMeanings"
            @toggle-meaning="wordStore.toggleMeaning"
            @complete-review="wordStore.completeReview"
          />
        </div>
        
        <!-- 空状态 -->
        <div v-if="(wordStore.studyMode === 'review' && wordStore.filteredReviewWords.length === 0) || (wordStore.studyMode !== 'review' && wordStore.filteredWords.length === 0)" class="text-center py-12 text-slate-400">
          <i class="fa-solid fa-search text-4xl mb-2 opacity-50"></i>
          <p>{{ wordStore.studyMode === 'review' ? '没有需要复习的单词' : '没有找到匹配的单词' }}</p>
        </div>
      </div>
      <!-- 测试模式内容 -->
      <div v-if="wordStore.studyMode === 'test'" class="glass-card p-6 rounded-xl mt-4">
        <h3 class="text-lg font-semibold text-white mb-4">词汇测试</h3>
        <div class="bg-slate-800/50 p-8 rounded-lg text-center">
          <i class="fa-solid fa-pencil-alt text-4xl text-vocab mb-4 opacity-70"></i>
          <h4 class="text-xl font-bold text-white mb-2">测试功能开发中</h4>
          <p class="text-slate-400">词汇测试功能即将上线，敬请期待！</p>
        </div>
      </div>
    </div>
  </div>
</template>
