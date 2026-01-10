<script setup>
// 移动端写作题目选择页面
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 写作题目列表数据
const writingTopics = [
  {
    id: 1,
    title: "The Impact of Artificial Intelligence on Modern Society",
    type: "议论文",
    difficulty: "Medium",
    wordLimit: "400-450",
    timeLimit: 60,
    source: "2023年考研写作B",
    description: "探讨人工智能对现代社会的多方面影响，包括经济、就业、教育和生活方式等。"
  },
  {
    id: 2,
    title: "Climate Change: Challenges and Solutions",
    type: "议论文",
    difficulty: "Hard",
    wordLimit: "500-600",
    timeLimit: 70,
    source: "2024年雅思写作Task 2",
    description: "分析气候变化带来的全球性挑战，并提出可行的解决方案，强调国际合作的重要性。"
  },
  {
    id: 3,
    title: "The Importance of Lifelong Learning in the Digital Age",
    type: "议论文",
    difficulty: "Easy",
    wordLimit: "300-400",
    timeLimit: 50,
    source: "2023年托福写作",
    description: "阐述在数字化时代，终身学习的重要性以及如何培养终身学习的习惯。"
  },
  {
    id: 4,
    title: "The Role of Social Media in Modern Communication",
    type: "议论文",
    difficulty: "Medium",
    wordLimit: "400-500",
    timeLimit: 60,
    source: "2023年大学英语六级写作",
    description: "讨论社交媒体在现代沟通中的作用，包括其积极影响和潜在问题。"
  },
  {
    id: 5,
    title: "The Benefits of Exercise for Physical and Mental Health",
    type: "说明文",
    difficulty: "Easy",
    wordLimit: "300-400",
    timeLimit: 50,
    source: "2024年考研写作A",
    description: "说明运动对身心健康的益处，包括增强体质、改善心情和提高认知能力等。"
  },
  {
    id: 6,
    title: "The Future of Work: Remote Work and Hybrid Models",
    type: "议论文",
    difficulty: "Hard",
    wordLimit: "500-600",
    timeLimit: 70,
    source: "2023年GRE写作",
    description: "分析远程工作和混合工作模式的未来发展趋势，以及它们对职场文化的影响。"
  }
];

// 难度过滤选项
const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
const selectedDifficulty = ref('All');

// 类型过滤选项
const typeOptions = ['All', '议论文', '说明文'];
const selectedType = ref('All');

// 过滤题目列表
const filteredTopics = () => {
  return writingTopics.filter(topic => {
    const matchesDifficulty = selectedDifficulty.value === 'All' || topic.difficulty === selectedDifficulty.value;
    const matchesType = selectedType.value === 'All' || topic.type === selectedType.value;
    return matchesDifficulty && matchesType;
  });
};

// 处理题目选择
const selectTopic = (topic) => {
  console.log('选择题目:', topic.title);
  // 导航到写作详情页
  router.push({ name: 'WritingDetail', params: { id: topic.id } });
};
</script>

<template>
  <!-- 移动端写作题目选择页面 -->
  <div class="space-y-4 px-4 pb-6 pt-20">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <h2 class="text-lg font-bold text-white flex items-center justify-center p-4">
        <i class="fa-solid fa-shapes text-vocab mr-2"></i>
        信息合成
      </h2>
    </div>
    
    <!-- 过滤选项 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="grid grid-cols-2 gap-4">
        <!-- 难度过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">难度</label>
          <select 
            v-model="selectedDifficulty"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-write/50"
          >
            <option v-for="option in difficultyOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        
        <!-- 类型过滤 -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">类型</label>
          <select 
            v-model="selectedType"
            class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-write/50"
          >
            <option v-for="option in typeOptions" :key="option" :value="option">{{ option }}</option>
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
          <span class="text-xs text-slate-400">{{ topic.wordLimit }} words</span>
        </div>
        
        <!-- 题目标题 -->
        <h3 class="text-lg font-semibold text-white mb-1">{{ topic.title }}</h3>
        
        <!-- 题目描述 -->
        <p class="text-slate-400 text-sm line-clamp-2 mb-3">{{ topic.description }}</p>
        
        <!-- 题目详情 -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-800/50 px-3 py-1.5 rounded-lg">
            <span class="text-slate-500">类型:</span>
            <span class="text-white ml-1">{{ topic.type }}</span>
          </div>
          <div class="bg-slate-800/50 px-3 py-1.5 rounded-lg">
            <span class="text-slate-500">时间:</span>
            <span class="text-white ml-1">{{ topic.timeLimit }}分钟</span>
          </div>
        </div>
        
        <!-- 题目来源 -->
        <div class="mt-3 text-xs text-slate-500">{{ topic.source }}</div>
      </div>
    </div>
  </div>
</template>