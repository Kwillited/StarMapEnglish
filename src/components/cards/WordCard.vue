<script setup>
// 单词卡片组件
import { computed, ref, watch } from 'vue';

const props = defineProps({
  word: {
    type: Object,
    required: true
  },
  studyMode: {
    type: String,
    required: true
  },
  showMeaning: {
    type: Object,
    default: () => ({})
  },
  showAllMeanings: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle-meaning', 'complete-review']);

// 收藏状态 - 从 localStorage 读取
const isFavorited = ref(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(props.word.id);
});

// 复习状态
const reviewState = ref('initial'); // initial, showingOptions, showingMeaning, showingFuzzyOptions

// 保存点击的状态
const clickedStatus = ref(null);

// 选择题相关状态
const selectedOption = ref(null);
const isAnswerCorrect = ref(false);
const options = ref([]);

// 切换收藏状态 - 保存到 localStorage
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (isFavorited.value) {
    favorites.push(props.word.id);
  } else {
    const index = favorites.indexOf(props.word.id);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// 计算是否显示释义
const isMeaningVisible = computed(() => {
  return props.showMeaning[props.word.id] || props.showAllMeanings || props.studyMode === 'browse' || reviewState.value === 'showingMeaning' || reviewState.value === 'showingFuzzyOptions';
});

// 切换释义显示
const handleToggleMeaning = () => {
  emit('toggle-meaning', props.word.id);
};

// 生成选择题选项
const generateOptions = () => {
  // 这里简化处理，实际应该从其他单词中随机选择错误选项
  const allMeanings = ['无处不在的', '务实的', '短暂的', '可持续的', '范式', '平衡', '认知', '有弹性的', '创新', '利他主义'];
  // 过滤掉正确选项
  const wrongMeanings = allMeanings.filter(meaning => meaning !== props.word.meaning);
  // 随机选择3个错误选项
  const selectedWrongMeanings = wrongMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
  // 合并正确选项和错误选项
  const allOptions = [...selectedWrongMeanings, props.word.meaning];
  // 打乱选项顺序
  options.value = allOptions.sort(() => 0.5 - Math.random());
};

// 处理选项选择
const handleOptionSelect = (option) => {
  selectedOption.value = option;
  isAnswerCorrect.value = option === props.word.meaning;
  // 不直接切换到结果，保持在选项页面显示红绿框
};

// 继续到下一个流程
const continueToNextStep = () => {
  if (reviewState.value === 'showingOptions') {
    // 从选择题模式直接跳转到显示完整单词卡片
    reviewState.value = 'showingMeaning';
  } else if (reviewState.value === 'showingMeaning') {
    // 完成复习
    emit('complete-review', props.word.id, clickedStatus.value);
    // 重置状态
    resetReviewState();
  } else if (reviewState.value === 'showingFuzzyOptions') {
    // 完成复习（模糊状态）
    emit('complete-review', props.word.id, clickedStatus.value);
    // 重置状态
    resetReviewState();
  }
};

// 重置复习状态
const resetReviewState = () => {
  reviewState.value = 'initial';
  clickedStatus.value = null;
  selectedOption.value = null;
  isAnswerCorrect.value = false;
  options.value = [];
};

// 完成复习
const handleCompleteReview = (status) => {
  if (reviewState.value === 'showingMeaning') {
    // 在显示释义状态下点击按钮，完成复习
    clickedStatus.value = status;
    continueToNextStep();
  } else if (reviewState.value === 'initial') {
    // 非学习模式：直接显示释义
    clickedStatus.value = status;
    if (status === 'fuzzy') {
      // 点击模糊按钮，显示下一词和记错了选项
      reviewState.value = 'showingFuzzyOptions';
    } else {
      // 点击记住或忘记按钮，只显示下一个词
      reviewState.value = 'showingMeaning';
    }
  } else {
    // 其他状态，直接完成复习
    emit('complete-review', props.word.id, status);
    // 重置状态
    resetReviewState();
  }
};

// 组件挂载时，如果是学习模式，自动生成选项
if (props.studyMode === 'study') {
  generateOptions();
  reviewState.value = 'showingOptions';
};

// 监听学习模式变化，自动生成选项
watch(() => props.studyMode, (newMode) => {
  if (newMode === 'study') {
    generateOptions();
    reviewState.value = 'showingOptions';
  } else {
    resetReviewState();
  }
});

// 监听单词变化，重置状态
watch(() => props.word, () => {
  if (props.studyMode === 'study') {
    generateOptions();
    reviewState.value = 'showingOptions';
  } else {
    resetReviewState();
  }
});

// 纠正状态为忘记
const correctToForgot = () => {
  emit('complete-review', props.word.id, 'forgot');
  // 重置状态
  reviewState.value = 'initial';
  clickedStatus.value = null;
  selectedOption.value = null;
  isAnswerCorrect.value = false;
  options.value = [];
};

// 获取难度标签
const difficultyLabel = computed(() => {
  return {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  }[props.word.difficulty];
});

// 获取难度样式
const difficultyClass = computed(() => {
  return {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400'
  }[props.word.difficulty];
});

// 获取优先级标签
const priorityLabel = computed(() => {
  return {
    high: '高',
    medium: '中',
    low: '低'
  }[props.word.reviewPriority || 'medium'];
});

// 获取优先级样式
const priorityClass = computed(() => {
  return {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-blue-500/20 text-blue-400'
  }[props.word.reviewPriority || 'medium'];
});
</script>

<template>
  <div class="bg-slate-800/50 p-4 rounded-lg hover:border-vocab/50 border border-slate-700 transition-all">
    <div class="flex justify-between items-start">
      <div>
        <h4 class="text-xl font-bold text-white">{{ word.word }}</h4>
        <!-- 音标显示 -->
        <p class="text-sm text-slate-400 italic mt-1">{{ word.phonetic || '/fəˈnetɪk/' }}</p>
      </div>
      <div class="flex gap-1 items-center">
        <span 
          :class="['text-xs px-2 py-1 rounded-full', difficultyClass]"
        >
          {{ difficultyLabel }}
        </span>
        <span 
          v-if="studyMode === 'review'"
          :class="['text-xs px-2 py-1 rounded-full', priorityClass]"
        >
          {{ priorityLabel }}
        </span>
        <button 
            class="ml-1 text-slate-400 hover:text-yellow-400 transition-colors"
            :class="{ 'text-yellow-400': isFavorited }"
            title="收藏单词"
            @click.stop="toggleFavorite"
          >
            <i :class="isFavorited ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'"></i>
          </button>

      </div>
    </div>
    
    <!-- 内容区域 - 固定高度，确保按钮位置一致 -->
    <div class="mt-4" style="min-height: 280px;">
      <!-- 选择题模式 -->
      <template v-if="studyMode === 'study' && reviewState === 'showingOptions'">
        <h4 class="text-lg font-semibold text-white mb-3">选择正确的释义</h4>
        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="(option, index) in options"
            :key="index"
            @click.stop="handleOptionSelect(option)"
            :class="[
              'bg-slate-800/50 text-white px-4 py-3 rounded-lg transition-all text-left',
              selectedOption ? 'cursor-default' : 'hover:bg-slate-700/50 hover:border-slate-500',
              selectedOption === option ? (
                isAnswerCorrect ? 'border-2 border-green-500 bg-green-500/10' : 'border-2 border-red-500 bg-red-500/10'
              ) : 'border border-transparent'
            ]"
            :disabled="selectedOption !== null"
          >
            <span class="mr-2 font-medium">{{ String.fromCharCode(65 + index) }}.</span>
            {{ option }}
            <!-- 正确答案提示 -->
            <span v-if="selectedOption && option === props.word.meaning" class="ml-2 text-xs text-green-400">
              <i class="fa-solid fa-check"></i>
            </span>
          </button>
        </div>

      </template>
      
      <!-- 释义显示 -->
      <div v-else-if="isMeaningVisible" style="min-height: 220px;">
        <p class="text-slate-300 text-lg">{{ word.meaning }}</p>
        <p v-if="studyMode === 'review'" class="text-xs text-slate-500 mt-1">上次复习: {{ word.lastReviewed }}</p>
      </div>
      
      <!-- 隐藏释义 -->
      <div v-else style="min-height: 220px;">
        <div 
          class="bg-slate-700/50 h-8 rounded flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"
          @click.stop="handleToggleMeaning"
        >
          <span class="text-slate-400 text-sm">点击显示释义</span>
        </div>
      </div>
    </div>
    
    <!-- 统一的操作按钮 -->
    <div class="mt-3 flex justify-center">
      <div class="flex gap-3 w-full max-w-md justify-around">
        <!-- 选择题模式：显示看答案和继续按钮 -->
        <template v-if="studyMode === 'study' && reviewState === 'showingOptions'">
          <!-- 看答案按钮（未选中时显示） -->
          <template v-if="!selectedOption">
            <button 
              @click.stop="continueToNextStep"
              class="bg-slate-600/50 hover:bg-slate-600 text-slate-300 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            >
              <i class="fa-solid fa-eye mr-1"></i>
              看答案
            </button>
          </template>
          <!-- 继续按钮（选中后显示） -->
          <template v-else>
            <button 
              @click.stop="continueToNextStep"
              class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            >
              <i class="fa-solid fa-arrow-right mr-1"></i>
              继续
            </button>
          </template>
        </template>
        
        <!-- 初始状态：显示记住/忘记/模糊按钮 -->
        <template v-else-if="reviewState === 'initial'">
          <button 
            @click.stop="handleCompleteReview('mastered')"
            class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            :title="studyMode !== 'review' ? '记住' : ''"
          >
            <i class="fa-solid fa-check mr-1"></i>
            记住
          </button>
          <button 
            @click.stop="handleCompleteReview('forgot')"
            class="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            :title="studyMode !== 'review' ? '不认识' : ''"
          >
            <i class="fa-solid fa-times mr-1"></i>
            {{ studyMode === 'review' ? '忘记' : '不认识' }}
          </button>
          <button 
            @click.stop="handleCompleteReview('fuzzy')"
            class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            :title="studyMode !== 'review' ? '模糊' : ''"
          >
            <i class="fa-solid fa-question mr-1"></i>
            模糊
          </button>
        </template>
        
        <!-- 记住/忘记状态：只显示下一个词按钮 -->
        <template v-else-if="reviewState === 'showingMeaning'">
          <button 
            @click.stop="continueToNextStep"
            class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          >
            <i class="fa-solid fa-arrow-right mr-1"></i>
            下一词
          </button>
        </template>
        
        <!-- 模糊状态：显示下一词和记错了按钮 -->
        <template v-else-if="reviewState === 'showingFuzzyOptions'">
          <button 
            @click.stop="continueToNextStep"
            class="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          >
            <i class="fa-solid fa-arrow-right mr-1"></i>
            下一词
          </button>
          <button 
            @click.stop="correctToForgot"
            class="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
          >
            <i class="fa-solid fa-xmark mr-1"></i>
            记错了
          </button>
        </template>
      </div>
    </div>
  </div>
</template>