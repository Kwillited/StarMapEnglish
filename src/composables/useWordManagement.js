// 单词管理组合式函数
import { ref, computed } from 'vue';

// 基础单词数据
const baseWords = [
  { id: 1, word: 'Ubiquitous', meaning: '无处不在的', category: '科技类', difficulty: 'medium' },
  { id: 2, word: 'Pragmatic', meaning: '务实的', category: '哲学类', difficulty: 'medium' },
  { id: 3, word: 'Ephemeral', meaning: '短暂的', category: '文化类', difficulty: 'hard' },
  { id: 4, word: 'Sustainable', meaning: '可持续的', category: '环境类', difficulty: 'easy' },
  { id: 5, word: 'Paradigm', meaning: '范式', category: '科技类', difficulty: 'hard' },
  { id: 6, word: 'Equilibrium', meaning: '平衡', category: '经济类', difficulty: 'medium' },
  { id: 7, word: 'Cognition', meaning: '认知', category: '哲学类', difficulty: 'hard' },
  { id: 8, word: 'Resilient', meaning: '有弹性的', category: '社会类', difficulty: 'easy' },
  { id: 9, word: 'Innovation', meaning: '创新', category: '科技类', difficulty: 'easy' },
  { id: 10, word: 'Altruism', meaning: '利他主义', category: '哲学类', difficulty: 'medium' }
];

export function useWordManagement() {
  // 状态管理
  const searchQuery = ref('');
  const studyMode = ref('browse'); // browse, review, study, test
  const showMeaning = ref({});
  const showAllMeanings = ref(false);
  const reviewProgress = ref(0);
  const totalReviewWords = ref(0);
  
  // 复习轮次相关
  const currentRound = ref(1);
  const maxRounds = ref(1);
  const roundProgress = ref(0);
  const hasForgottenWords = ref(false);
  const forgottenWords = ref([]);
  
  // 学习设置
  const dailyWordCount = ref(50);
  
  // 学习记录
  const learningStats = {
    today: 50,
    total: 1250,
    retention: 76
  };
  
  // 获取初始复习单词
  const getInitialReviewWords = () => {
    return [
      { id: 2, word: 'Pragmatic', meaning: '务实的', category: '哲学类', difficulty: 'medium', reviewPriority: 'high', lastReviewed: '2026-01-06' },
      { id: 5, word: 'Paradigm', meaning: '范式', category: '科技类', difficulty: 'hard', reviewPriority: 'medium', lastReviewed: '2026-01-05' },
      { id: 7, word: 'Cognition', meaning: '认知', category: '哲学类', difficulty: 'hard', reviewPriority: 'high', lastReviewed: '2026-01-04' },
      { id: 10, word: 'Altruism', meaning: '利他主义', category: '哲学类', difficulty: 'medium', reviewPriority: 'medium', lastReviewed: '2026-01-06' }
    ];
  };
  
  // 单词数据
  const words = ref(baseWords);
  const reviewWords = ref(getInitialReviewWords());
  
  // 初始化总复习单词数
  totalReviewWords.value = reviewWords.value.length;
  
  // 计算需要复习的单词数量
  const dueForReview = computed(() => reviewWords.value.length);
  
  // 过滤单词列表
  const filteredWords = computed(() => {
    return words.value.filter(word => {
      return word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
             word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });
  
  // 过滤复习单词列表
  const filteredReviewWords = computed(() => {
    return reviewWords.value.filter(word => {
      return word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
             word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });
  
  // 切换学习模式
  const toggleStudyMode = (mode) => {
    studyMode.value = mode;
    
    // 切换到复习模式时，重置复习进度和轮次
    if (mode === 'review') {
      resetReviewState();
    }
    
    // 切换到学习模式前检查是否需要复习
    if (mode === 'study' && dueForReview.value > 0) {
      // 提示用户先复习
      alert(`您有 ${dueForReview.value} 个单词需要复习，建议先完成复习再学习新单词！`);
      // 可以选择是否强制切换到复习模式
      // studyMode.value = 'review';
    }
  };
  
  // 重置复习状态
  const resetReviewState = () => {
    reviewProgress.value = 0;
    currentRound.value = 1;
    maxRounds.value = 1;
    roundProgress.value = 0;
    hasForgottenWords.value = false;
    forgottenWords.value = [];
    reviewWords.value = getInitialReviewWords();
    totalReviewWords.value = reviewWords.value.length;
  };
  
  // 切换显示单词意思
  const toggleMeaning = (wordId = null) => {
    if (wordId) {
      // 单个单词切换：切换指定单词的显示状态
      showMeaning.value = {
        ...showMeaning.value,
        [wordId]: !showMeaning.value[wordId]
      };
    } else {
      // 全局切换：切换所有单词的显示状态
      showAllMeanings.value = !showAllMeanings.value;
      // 清空单个单词的显示状态，使用全局状态
      showMeaning.value = {};
    }
  };
  
  // 完成复习
  const completeReview = (wordId, status) => {
    // 这里可以添加实际的复习完成逻辑
    reviewProgress.value++;
    console.log(`完成复习单词: ${wordId}, 状态: ${status}`);
    
    // 找到当前单词的完整信息
    const currentWord = reviewWords.value.find(word => word.id === wordId);
    
    // 检查是否需要增加复习轮次
    // 如果用户点了"忘记"，则将单词添加到forgottenWords数组中
    if (status === 'forgot' && currentWord) {
      hasForgottenWords.value = true;
      forgottenWords.value.push(currentWord);
      console.log('用户点了忘记，将单词添加到忘记列表:', currentWord.word);
    }
    
    // 从复习列表中移除该单词（模拟）
    const index = reviewWords.value.findIndex(word => word.id === wordId);
    if (index > -1) {
      reviewWords.value.splice(index, 1);
    }
    
    // 复习轮次计算
    // 计算当前轮次的进度
    const roundWordsCount = totalReviewWords.value;
    
    // 计算总复习进度：(当前轮次-1) * 本轮单词数 + 当前轮次已复习单词数
    const totalReviewedWords = (currentRound.value - 1) * roundWordsCount + reviewProgress.value;
    roundProgress.value = totalReviewedWords / (roundWordsCount * maxRounds.value);
    
    // 检查是否完成当前轮次
    if (reviewProgress.value >= roundWordsCount) {
      // 如果当前轮次有忘记的单词，则增加一轮复习
      if (hasForgottenWords.value && forgottenWords.value.length > 0) {
        // 增加一轮复习
        maxRounds.value++;
        console.log(`当前轮次有忘记的单词，增加一轮复习，当前最大轮次: ${maxRounds.value}`);
        console.log(`下一轮复习单词:`, forgottenWords.value.map(word => word.word));
        
        // 进入下一轮复习，只复习被标记为"忘记"的单词
        currentRound.value++;
        
        // 重置复习列表，只包含被标记为"忘记"的单词
        reviewWords.value = [...forgottenWords.value];
        
        // 更新总复习单词数
        totalReviewWords.value = reviewWords.value.length;
        
        // 重置复习进度和忘记标记（轮次内的进度）
        reviewProgress.value = 0;
        hasForgottenWords.value = false;
        forgottenWords.value = [];
      } else {
        // 进入下一轮复习或结束复习
        currentRound.value++;
        
        // 检查是否完成所有轮次
        if (currentRound.value > maxRounds.value) {
          // 完成所有轮次的复习，不做任何动作
        } else {
          // 重置复习列表
          reviewWords.value = getInitialReviewWords();
          
          // 重置复习进度和忘记标记（轮次内的进度）
          reviewProgress.value = 0;
          hasForgottenWords.value = false;
          forgottenWords.value = [];
        }
      }
    }
  };
  
  return {
    // 状态
    searchQuery,
    studyMode,
    showMeaning,
    showAllMeanings,
    reviewProgress,
    totalReviewWords,
    currentRound,
    maxRounds,
    roundProgress,
    hasForgottenWords,
    forgottenWords,
    dailyWordCount,
    learningStats,
    
    // 数据
    words,
    reviewWords,
    dueForReview,
    filteredWords,
    filteredReviewWords,
    
    // 方法
    toggleStudyMode,
    toggleMeaning,
    completeReview,
    resetReviewState
  };
}