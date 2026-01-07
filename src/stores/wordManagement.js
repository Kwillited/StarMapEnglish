import { defineStore } from 'pinia';
import { baseWords, getInitialReviewWords } from '../data/wordData.js';

export const useWordManagementStore = defineStore('wordManagement', {
  state: () => ({
    // 搜索和显示状态
    searchQuery: '',
    showMeaning: {},
    showAllMeanings: false,
    
    // 学习模式
    studyMode: 'browse', // browse, review, study, test
    
    // 复习相关状态
    reviewProgress: 0,
    totalReviewWords: 0,
    currentRound: 1,
    maxRounds: 1,
    roundProgress: 0,
    hasForgottenWords: false,
    forgottenWords: [],
    reviewWords: [...getInitialReviewWords()],
    
    // 学习相关状态
    learningProgress: 0,
    totalLearningWords: baseWords.length,
    currentLearningRound: 1,
    maxLearningRounds: 1,
    learningRoundProgress: 0,
    hasUnknownWords: false,
    unknownWords: [],
    
    // 单词数据
    words: [...baseWords],
    initialWords: [...baseWords],
    
    // 学习统计
    learningStats: {
      today: 50,
      total: 1250
    },
    
    // 每日学习设置
    dailyWords: 50,
    
    // 模态框状态
    showReviewModal: false,
    reviewModalMessage: ''
  }),
  
  getters: {
    // 计算需要复习的单词数量
    dueForReview: (state) => state.reviewWords.length,
    
    // 过滤单词列表
    filteredWords: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.words.filter(word => 
        word.word.toLowerCase().includes(query) || 
        word.meaning.toLowerCase().includes(query)
      );
    },
    
    // 过滤复习单词列表
    filteredReviewWords: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.reviewWords.filter(word => 
        word.word.toLowerCase().includes(query) || 
        word.meaning.toLowerCase().includes(query)
      );
    }
  },
  
  actions: {
    // 初始化总复习单词数
    initializeTotalReviewWords() {
      this.totalReviewWords = this.reviewWords.length;
    },
    
    // 切换学习模式
    toggleStudyMode(mode) {
      this.studyMode = mode;
      
      // 根据模式重置相应状态
      if (mode === 'review') {
        this.resetReviewState();
      } else if (mode === 'study') {
        this.resetLearningState();
        // 学习前检查是否需要复习
        if (this.dueForReview > 0) {
          this.showReviewReminder();
        }
      }
    },
    
    // 显示复习提醒
    showReviewReminder() {
      this.reviewModalMessage = `您有 ${this.dueForReview} 个单词需要复习，建议先完成复习再学习新单词！`;
      this.showReviewModal = true;
    },
    
    // 重置复习状态
    resetReviewState() {
      this.reviewProgress = 0;
      this.currentRound = 1;
      this.maxRounds = 1;
      this.roundProgress = 0;
      this.hasForgottenWords = false;
      this.forgottenWords = [];
      this.reviewWords = [...getInitialReviewWords()];
      this.totalReviewWords = this.reviewWords.length;
    },
    
    // 重置学习状态
    resetLearningState() {
      this.learningProgress = 0;
      this.currentLearningRound = 1;
      this.maxLearningRounds = 1;
      this.learningRoundProgress = 0;
      this.hasUnknownWords = false;
      this.unknownWords = [];
      this.words = [...this.initialWords];
      this.totalLearningWords = this.words.length;
    },
    
    // 切换显示单词意思
    toggleMeaning(wordId = null) {
      if (wordId) {
        // 单个单词切换
        this.showMeaning = {
          ...this.showMeaning,
          [wordId]: !this.showMeaning[wordId]
        };
      } else {
        // 全局切换
        this.showAllMeanings = !this.showAllMeanings;
        this.showMeaning = {}; // 清空单个单词状态，使用全局状态
      }
    },
    
    // 完成复习/学习
    completeReview(wordId, status) {
      if (this.studyMode === 'review') {
        this.handleReviewMode(wordId, status);
      } else if (this.studyMode === 'study') {
        this.handleStudyMode(wordId, status);
      }
    },
    
    // 处理复习模式
    handleReviewMode(wordId, status) {
      this.reviewProgress++;
      this.learningProgress++;
      
      // 从复习列表中移除单词
      const reviewIndex = this.reviewWords.findIndex(word => word.id === wordId);
      if (reviewIndex > -1) {
        const currentWord = this.reviewWords[reviewIndex];
        
        // 处理忘记或模糊的情况
        if (status === 'forgot' || status === 'fuzzy') {
          this.hasForgottenWords = true;
          this.forgottenWords.push(currentWord);
        }
        
        // 从复习列表中移除
        this.reviewWords.splice(reviewIndex, 1);
      }
      
      // 从主单词列表中移除
      const wordIndex = this.words.findIndex(word => word.id === wordId);
      if (wordIndex > -1) {
        this.words.splice(wordIndex, 1);
      }
      
      // 更新进度
      this.updateReviewProgress();
      this.updateLearningProgress();
      
      // 检查是否完成当前轮次
      this.checkReviewRoundCompletion();
    },
    
    // 处理学习模式
    handleStudyMode(wordId, status) {
      this.learningProgress++;
      
      // 从主单词列表中移除单词
      const wordIndex = this.words.findIndex(word => word.id === wordId);
      if (wordIndex > -1) {
        const currentWord = this.words[wordIndex];
        
        // 处理不认识或模糊的情况
        if (status === 'forgot' || status === 'fuzzy') {
          this.hasUnknownWords = true;
          this.unknownWords.push(currentWord);
        }
        
        // 从主列表中移除
        this.words.splice(wordIndex, 1);
      }
      
      // 更新学习进度
      this.updateLearningProgress();
      
      // 检查是否完成当前学习轮次
      this.checkStudyRoundCompletion();
    },
    
    // 更新复习进度
    updateReviewProgress() {
      const roundWordsCount = this.totalReviewWords;
      const totalReviewedWords = (this.currentRound - 1) * roundWordsCount + this.reviewProgress;
      this.roundProgress = totalReviewedWords / (roundWordsCount * this.maxRounds);
    },
    
    // 更新学习进度
    updateLearningProgress() {
      const learningRoundWordsCount = this.totalLearningWords;
      this.learningRoundProgress = this.learningProgress / learningRoundWordsCount;
    },
    
    // 检查复习轮次完成情况
    checkReviewRoundCompletion() {
      const roundWordsCount = this.totalReviewWords;
      
      if (this.reviewProgress >= roundWordsCount) {
        // 如果有忘记的单词，增加一轮复习
        if (this.hasForgottenWords && this.forgottenWords.length > 0) {
          this.maxRounds++;
          this.currentRound++;
          
          // 更新复习列表为忘记的单词
          this.reviewWords = [...this.forgottenWords];
          this.totalReviewWords = this.reviewWords.length;
          
          // 重置状态
          this.reviewProgress = 0;
          this.hasForgottenWords = false;
          this.forgottenWords = [];
        } else {
          // 确保当前轮次不超过最大轮次
          this.currentRound = Math.min(this.currentRound, this.maxRounds);
        }
      }
    },
    
    // 检查学习轮次完成情况
    checkStudyRoundCompletion() {
      if (this.words.length === 0) {
        // 如果有不认识的单词，增加一轮学习
        if (this.hasUnknownWords && this.unknownWords.length > 0) {
          this.maxLearningRounds++;
          this.currentLearningRound++;
          
          // 更新学习列表为不认识的单词
          this.words = [...this.unknownWords];
          this.totalLearningWords = this.words.length;
          
          // 重置状态
          this.learningProgress = 0;
          this.hasUnknownWords = false;
          this.unknownWords = [];
        } else {
          // 确保当前轮次不超过最大轮次
          this.currentLearningRound = Math.min(this.currentLearningRound, this.maxLearningRounds);
        }
      }
    }
  }
});
