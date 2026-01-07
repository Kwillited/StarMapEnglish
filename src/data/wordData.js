// 单词数据文件

// 基础单词数据
export const baseWords = [
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

// 获取初始复习单词
export const getInitialReviewWords = () => {
  return [
    { id: 2, word: 'Pragmatic', meaning: '务实的', category: '哲学类', difficulty: 'medium', reviewPriority: 'high', lastReviewed: '2026-01-06' },
    { id: 5, word: 'Paradigm', meaning: '范式', category: '科技类', difficulty: 'hard', reviewPriority: 'medium', lastReviewed: '2026-01-05' },
    { id: 7, word: 'Cognition', meaning: '认知', category: '哲学类', difficulty: 'hard', reviewPriority: 'high', lastReviewed: '2026-01-04' },
    { id: 10, word: 'Altruism', meaning: '利他主义', category: '哲学类', difficulty: 'medium', reviewPriority: 'medium', lastReviewed: '2026-01-06' }
  ];
};
