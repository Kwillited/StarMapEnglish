import { defineStore } from 'pinia';
import { baseWords, getInitialReviewWords } from '../data/wordData.js';

export const useWordManagementStore = defineStore('wordManagement', {
  // 状态管理
  state: () => ({
    searchQuery: '',
    studyMode: 'browse', // browse, review, study, test
    showMeaning: {},
    showAllMeanings: false,
    reviewProgress: 0,
    totalReviewWords: 0,
    
    // 复习轮次相关
    currentRound: 1,
    maxRounds: 1,
    roundProgress: 0,
    hasForgottenWords: false,
    forgottenWords: [],
    
    // 学习进度相关
    learningProgress: 0,
    totalLearningWords: baseWords.length,
    currentLearningRound: 1,
    maxLearningRounds: 1,
    learningRoundProgress: 0,
    
    // 学习记录
    learningStats: {
      today: 50,
      total: 1250,
      retention: 76
    },
    
    // 单词数据
    words: [...baseWords],
    reviewWords: [...getInitialReviewWords()]
  }),
  
  // 计算属性
  getters: {
    // 计算需要复习的单词数量
    dueForReview: (state) => state.reviewWords.length,
    
    // 过滤单词列表
    filteredWords: (state) => {
      return state.words.filter(word => {
        return word.word.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
               word.meaning.toLowerCase().includes(state.searchQuery.toLowerCase());
      });
    },
    
    // 过滤复习单词列表
    filteredReviewWords: (state) => {
      return state.reviewWords.filter(word => {
        return word.word.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
               word.meaning.toLowerCase().includes(state.searchQuery.toLowerCase());
      });
    }
  },
  
  // 操作方法
  actions: {
    // 初始化总复习单词数
    initializeTotalReviewWords() {
      this.totalReviewWords = this.reviewWords.length;
    },
    
    // 切换学习模式
    toggleStudyMode(mode) {
      this.studyMode = mode;
      
      // 切换到复习模式时，重置复习进度和轮次
      if (mode === 'review') {
        this.resetReviewState();
      }
      
      // 切换到学习模式前检查是否需要复习
      if (mode === 'study' && this.dueForReview > 0) {
        // 提示用户先复习
        alert(`您有 ${this.dueForReview} 个单词需要复习，建议先完成复习再学习新单词！`);
      }
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
    
    // 切换显示单词意思
    toggleMeaning(wordId = null) {
      if (wordId) {
        // 单个单词切换：切换指定单词的显示状态
        this.showMeaning = {
          ...this.showMeaning,
          [wordId]: !this.showMeaning[wordId]
        };
      } else {
        // 全局切换：切换所有单词的显示状态
        this.showAllMeanings = !this.showAllMeanings;
        // 清空单个单词的显示状态，使用全局状态
        this.showMeaning = {};
      }
    },
    
    // 完成复习
    completeReview(wordId, status) {
      // 这里可以添加实际的复习完成逻辑
      this.reviewProgress++;
      this.learningProgress++;
      console.log(`完成复习单词: ${wordId}, 状态: ${status}`);
      
      // 从复习列表中移除该单词
      const reviewIndex = this.reviewWords.findIndex(word => word.id === wordId);
      if (reviewIndex > -1) {
        // 找到当前单词的完整信息
        const currentWord = this.reviewWords[reviewIndex];
        
        // 检查是否需要增加复习轮次
        // 如果用户点了"忘记"或"模糊"，则将单词添加到忘记列表中
        if (status === 'forgot' || status === 'fuzzy') {
          this.hasForgottenWords = true;
          this.forgottenWords.push(currentWord);
          console.log(`用户点了${status === 'forgot' ? '忘记' : '模糊'}，将单词添加到忘记列表:`, currentWord.word);
        }
        
        // 从复习列表中移除该单词
        this.reviewWords.splice(reviewIndex, 1);
      }
      
      // 从主单词列表中移除该单词（无论什么模式）
      const wordIndex = this.words.findIndex(word => word.id === wordId);
      if (wordIndex > -1) {
        this.words.splice(wordIndex, 1);
      }
      
      // 复习轮次计算
      // 计算当前轮次的进度
      const roundWordsCount = this.totalReviewWords;
      
      // 计算总复习进度：(当前轮次-1) * 本轮单词数 + 当前轮次已复习单词数
      const totalReviewedWords = (this.currentRound - 1) * roundWordsCount + this.reviewProgress;
      this.roundProgress = totalReviewedWords / (roundWordsCount * this.maxRounds);
      
      // 学习进度计算
      // 计算当前学习轮次进度
      const learningRoundWordsCount = this.totalLearningWords;
      this.learningRoundProgress = this.learningProgress / learningRoundWordsCount;
      
      // 检查是否完成当前轮次
      if (this.reviewProgress >= roundWordsCount) {
        // 如果当前轮次有忘记的单词，则增加一轮复习
        if (this.hasForgottenWords && this.forgottenWords.length > 0) {
          // 增加一轮复习
          this.maxRounds++;
          console.log(`当前轮次有忘记的单词，增加一轮复习，当前最大轮次: ${this.maxRounds}`);
          console.log(`下一轮复习单词:`, this.forgottenWords.map(word => word.word));
          
          // 进入下一轮复习，只复习被标记为"忘记"的单词
          this.currentRound++;
          
          // 重置复习列表，只包含被标记为"忘记"的单词
          this.reviewWords = [...this.forgottenWords];
          
          // 更新总复习单词数
          this.totalReviewWords = this.reviewWords.length;
          
          // 重置复习进度和忘记标记（轮次内的进度）
          this.reviewProgress = 0;
          this.hasForgottenWords = false;
          this.forgottenWords = [];
        } else {
          // 进入下一轮复习或结束复习
          this.currentRound++;
          
          // 检查是否完成所有轮次
          if (this.currentRound > this.maxRounds) {
            // 完成所有轮次的复习，不做任何动作
          } else {
            // 重置复习列表
            this.reviewWords = [...getInitialReviewWords()];
            
            // 重置复习进度和忘记标记（轮次内的进度）
            this.reviewProgress = 0;
            this.hasForgottenWords = false;
            this.forgottenWords = [];
          }
        }
      }
    }
  }
});
