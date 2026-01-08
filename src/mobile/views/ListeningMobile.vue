<script setup>
// 移动端听力题目选择页面
import { ref } from 'vue';

// 听力题目列表数据
const listeningTopics = [
  {
    id: 1,
    title: "BBC News: Global Crises",
    difficulty: "Medium",
    category: "News",
    duration: "2:30",
    source: "BBC News / 2023真题",
    description: "关于联合国警告全球面临多重危机的新闻报道，包括气候变化、冲突和贫困。"
  },
  {
    id: 2,
    title: "Scientific Breakthrough in Renewable Energy",
    difficulty: "Hard",
    category: "Science",
    duration: "3:15",
    source: "CNN Science / 2024",
    description: "科学家在可再生能源领域取得重大突破，可能改变全球能源格局。"
  },
  {
    id: 3,
    title: "Daily Life in Tokyo",
    difficulty: "Easy",
    category: "Culture",
    duration: "1:45",
    source: "VOA Learning English / 2023",
    description: "介绍东京日常生活的各个方面，包括交通、饮食和文化习惯。"
  },
  {
    id: 4,
    title: "Interview with Climate Activist",
    difficulty: "Medium",
    category: "Interview",
    duration: "4:20",
    source: "TED Talks / 2023",
    description: "对著名气候活动家的采访，讨论气候变化的影响和解决方案。"
  },
  {
    id: 5,
    title: "The History of Internet",
    difficulty: "Hard",
    category: "Technology",
    duration: "5:10",
    source: "National Geographic / 2024",
    description: "探索互联网的发展历史，从早期的ARPANET到现代的全球网络。"
  },
  {
    id: 6,
    title: "Health Benefits of Exercise",
    difficulty: "Easy",
    category: "Health",
    duration: "2:05",
    source: "WHO Public Health / 2023",
    description: "世界卫生组织关于运动对身心健康益处的科普讲解。"
  }
];

// 难度过滤选项
const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
const selectedDifficulty = ref('All');

// 分类过滤选项
const categoryOptions = ['All', 'News', 'Science', 'Culture', 'Interview', 'Technology', 'Health'];
const selectedCategory = ref('All');

// 过滤题目列表
const filteredTopics = () => {
  return listeningTopics.filter(topic => {
    const matchesDifficulty = selectedDifficulty.value === 'All' || topic.difficulty === selectedDifficulty.value;
    const matchesCategory = selectedCategory.value === 'All' || topic.category === selectedCategory.value;
    return matchesDifficulty && matchesCategory;
  });
};

// 处理题目选择
const selectTopic = (topic) => {
  console.log('选择题目:', topic.title);
  // 这里可以添加导航到听力详情页的逻辑
  // router.push({ name: 'ListeningDetail', params: { id: topic.id } });
};
</script>

<template>
  <!-- 移动端听力题目选择页面 -->
  <div class="space-y-4 px-4 pb-6 pt-20">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700 px-4 py-2 sm:py-3 z-50">
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-bold text-white">信号截获</h2>
      </div>
    </div>
    
    <!-- 过滤选项 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="space-y-3">
        <!-- 难度过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">难度</label>
          <select 
            v-model="selectedDifficulty"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-listen/50"
          >
            <option v-for="option in difficultyOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        
        <!-- 分类过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">分类</label>
          <select 
            v-model="selectedCategory"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-listen/50"
          >
            <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 题目列表 -->
    <div class="space-y-3">
      <!-- 题目卡片 -->
      <div 
        v-for="topic in filteredTopics()" 
        :key="topic.id"
        class="glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-slate-700/50"
        @click="selectTopic(topic)"
      >
        <!-- 难度标签 -->
        <div class="flex items-center justify-between mb-2">
          <span 
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-green-500/20 text-green-400': topic.difficulty === 'Easy',
              'bg-yellow-500/20 text-yellow-400': topic.difficulty === 'Medium',
              'bg-red-500/20 text-red-400': topic.difficulty === 'Hard'
            }"
          >
            {{ topic.difficulty }}
          </span>
          <span class="text-xs text-slate-400">{{ topic.duration }}</span>
        </div>
        
        <!-- 题目标题 -->
        <h3 class="text-lg font-semibold text-white mb-1">{{ topic.title }}</h3>
        
        <!-- 题目描述 -->
        <p class="text-slate-400 text-sm line-clamp-2 mb-3">{{ topic.description }}</p>
        
        <!-- 题目详情 -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-800/50 px-3 py-1.5 rounded-lg">
            <span class="text-slate-500">分类:</span>
            <span class="text-white ml-1">{{ topic.category }}</span>
          </div>
          <div class="bg-slate-800/50 px-3 py-1.5 rounded-lg">
            <span class="text-slate-500">来源:</span>
            <span class="text-white ml-1">{{ topic.source }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>