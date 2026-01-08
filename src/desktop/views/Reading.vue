<script setup>
// 文章选择页面组件
import { ref } from 'vue';

// 文章列表数据
const articles = [
  {
    id: 1,
    title: "The Internet Revolution",
    description: "Exploring how the internet has transformed communication, commerce, and education globally.",
    difficulty: "Easy",
    category: "Technology",
    wordCount: 520,
    source: "2024考研英语阅读A"
  },
  {
    id: 2,
    title: "Climate Change and Global Warming",
    description: "An analysis of the scientific consensus on climate change and its potential impacts.",
    difficulty: "Medium",
    category: "Environment",
    wordCount: 780,
    source: "2023雅思阅读Test 3"
  },
  {
    id: 3,
    title: "The Future of Artificial Intelligence",
    description: "Examining the ethical implications and potential benefits of advanced AI systems.",
    difficulty: "Hard",
    category: "Technology",
    wordCount: 950,
    source: "2023托福阅读Passage 2"
  },
  {
    id: 4,
    title: "Cultural Diversity in Modern Societies",
    description: "How globalization has shaped cultural exchange and diversity in contemporary communities.",
    difficulty: "Medium",
    category: "Culture",
    wordCount: 630,
    source: "2024考研英语阅读B"
  },
  {
    id: 5,
    title: "The Science of Happiness",
    description: "Research findings on the psychological and social factors that contribute to happiness.",
    difficulty: "Easy",
    category: "Psychology",
    wordCount: 480,
    source: "2023剑桥雅思18"
  },
  {
    id: 6,
    title: "Renewable Energy Transition",
    description: "The challenges and opportunities in transitioning to a sustainable energy future.",
    difficulty: "Hard",
    category: "Environment",
    wordCount: 890,
    source: "2023GRE阅读Section 1"
  }
];

// 难度过滤选项
const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
const selectedDifficulty = ref('All');

// 分类过滤选项
const categoryOptions = ['All', 'Technology', 'Environment', 'Culture', 'Psychology'];
const selectedCategory = ref('All');

// 过滤文章列表
const filteredArticles = () => {
  return articles.filter(article => {
    const matchesDifficulty = selectedDifficulty.value === 'All' || article.difficulty === selectedDifficulty.value;
    const matchesCategory = selectedCategory.value === 'All' || article.category === selectedCategory.value;
    return matchesDifficulty && matchesCategory;
  });
};

// 处理文章选择
const selectArticle = (article) => {
  console.log('选择文章:', article.title);
  // 这里可以添加导航到文章详情页的逻辑
  // router.push({ name: 'ArticleDetail', params: { id: article.id } });
};
</script>

<template>
  <!-- 文章选择页面 -->
  <div class="space-y-6 sm:space-y-8">
    <!-- 页面标题 -->
    <div class="space-y-2">
      <h2 class="text-3xl font-bold text-white">文献解码 (Reading)</h2>
    </div>

    <!-- 过滤选项 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 难度过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">难度</label>
          <select 
            v-model="selectedDifficulty"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-read/50"
          >
            <option v-for="option in difficultyOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        
        <!-- 分类过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">分类</label>
          <select 
            v-model="selectedCategory"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-read/50"
          >
            <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <!-- 文章卡片 -->
      <div 
        v-for="article in filteredArticles()" 
        :key="article.id"
        class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-read/10"
        @click="selectArticle(article)"
      >
        <!-- 文章信息 -->
        <div class="space-y-3">
          <!-- 难度标签 -->
          <div class="flex items-center justify-between">
            <span 
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              :class="{
                'bg-green-500/20 text-green-400': article.difficulty === 'Easy',
                'bg-yellow-500/20 text-yellow-400': article.difficulty === 'Medium',
                'bg-red-500/20 text-red-400': article.difficulty === 'Hard'
              }"
            >
              {{ article.difficulty }}
            </span>
            <span class="text-xs text-slate-400">{{ article.wordCount }} words</span>
          </div>
          
          <!-- 文章标题 -->
          <h3 class="text-xl font-semibold text-white line-clamp-2">{{ article.title }}</h3>
          
          <!-- 文章描述 -->
          <p class="text-slate-400 text-sm line-clamp-2">{{ article.description }}</p>
          
          <!-- 文章分类和来源 -->
          <div class="flex justify-between items-center pt-2 border-t border-slate-700">
            <span class="text-xs text-slate-500">{{ article.category }}</span>
            <span class="text-xs text-slate-500">{{ article.source }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>