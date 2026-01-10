<script setup>
// 测试页面组件
import { ref, computed } from 'vue';
import { useWordManagementStore } from '../../shared/stores/wordManagement.js';

// 获取单词管理状态
const wordStore = useWordManagementStore();

// 计算属性：当前正在测试的单词
const currentWord = computed(() => {
  return wordStore.words[0] || null;
});

// 用户选择的答案
const selectedAnswer = ref('');

// 显示正确答案
const showCorrectAnswer = ref(false);

// 随机生成选项
const options = computed(() => {
  if (!currentWord.value) return [];
  
  // 基本选项包括当前单词的正确释义
  const correctAnswer = currentWord.value.meaning;
  const allOptions = [correctAnswer];
  
  // 从其他单词中随机选择3个错误选项
  const otherWords = wordStore.initialWords.filter(word => word.id !== currentWord.value.id);
  const shuffledOtherWords = otherWords.sort(() => 0.5 - Math.random());
  const wrongOptions = shuffledOtherWords.slice(0, 3).map(word => word.meaning);
  
  // 合并所有选项并随机排序
  return [...allOptions, ...wrongOptions].sort(() => 0.5 - Math.random());
});

// 处理答案选择
const handleSelectAnswer = (option) => {
  selectedAnswer.value = option;
  showCorrectAnswer.value = true;
};

// 处理下一题
const handleNext = () => {
  if (currentWord.value) {
    // 判断答案是否正确
    const isCorrect = selectedAnswer.value === currentWord.value.meaning;
    wordStore.completeReview(currentWord.value.id, isCorrect ? 'known' : 'forgot');
    
    // 重置状态
    selectedAnswer.value = '';
    showCorrectAnswer.value = false;
  }
};
</script>

<template>
  <!-- 测试页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <router-link to="/vocabulary/mobile" class="text-white hover:text-vocab transition-colors w-10">
        <i class="fa-solid fa-arrow-left text-xl"></i>
      </router-link>
      <div class="flex-1 text-center">
        <h2 class="text-xl font-bold text-white">测试模式</h2>
        <p class="text-slate-400 text-sm">测试你的词汇掌握情况</p>
      </div>
      <div class="w-10"></div>
    </div>

    <!-- 测试进度 -->
    <div class="p-4">
      <div class="flex gap-4">
        <!-- 测试进度 -->
        <div class="flex-1">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>测试进度</span>
            <span>{{ wordStore.learningProgress }}/{{ wordStore.totalLearningWords }}</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div class="bg-accent h-2 rounded-full" :style="{ width: (wordStore.learningProgress / wordStore.totalLearningWords * 100) + '%' }"></div>
          </div>
        </div>
        <!-- 轮次进度条 -->
        <div class="flex-1">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>轮次进度</span>
            <span>{{ Math.min(wordStore.currentLearningRound, wordStore.maxLearningRounds) }}/{{ wordStore.maxLearningRounds }}</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div class="bg-purple-500 h-2 rounded-full" :style="{ width: (wordStore.learningRoundProgress * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 测试卡片 -->
    <div v-if="currentWord" class="p-6 rounded-2xl">
      <div class="flex flex-col items-center justify-center">
        <!-- 单词和音标 -->
        <div class="flex flex-col items-center gap-2 mb-6">
          <h3 class="text-2xl font-bold text-white">{{ currentWord.word }}</h3>
          <p class="text-slate-500 text-sm">{{ currentWord.phonetic }}</p>
        </div>
        
        <!-- 测试题目 -->
        <div class="mb-6 w-full">
          <h4 class="text-center text-white text-base font-medium mb-4">请选择正确的释义</h4>
          <div class="space-y-4">
            <button 
              v-for="option in options" 
              :key="option"
              @click="handleSelectAnswer(option)"
              :disabled="showCorrectAnswer"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 h-16 flex items-center',
                showCorrectAnswer ? (
                  option === currentWord.meaning 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : (option === selectedAnswer ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800/50 text-slate-300')
                ) : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
            >
              <span class="inline-block w-5 h-5 rounded-full bg-slate-700 mr-3 text-center text-xs leading-5">
                {{ ['A', 'B', 'C', 'D'][options.indexOf(option)] }}
              </span>
              {{ option }}
            </button>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- 下一题按钮 - 固定在底部 -->
    <div v-if="currentWord && showCorrectAnswer" class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md p-4">
      <div class="flex gap-3 justify-center">
        <button 
          @click="handleNext"
          class="py-2 px-12 rounded-lg text-accent border-b-4 border-accent"
        >
          下一题
        </button>
      </div>
    </div>
    

  </div>
</template>