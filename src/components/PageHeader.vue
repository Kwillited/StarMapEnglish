<script setup>
// PageHeader组件，显示用户信息、考试倒计时和搜索功能
import { ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

// 定义搜索相关数据和方法
const searchQuery = ref('');

const handleSearch = () => {
  console.log('搜索:', searchQuery.value);
  // 这里可以添加实际的搜索逻辑
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <!-- 页面头部 -->
  <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
    <div>
      <h1 class="text-3xl font-bold text-white tracking-tight">下午好, 指挥官 <span class="text-accent">{{ user.name }}</span></h1>
      <p class="text-slate-400 text-sm mt-1">当前任务: <span class="text-white bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs border border-red-500/30">{{ user.exam }}</span></p>
    </div>
    
    <!-- 搜索框 -->
    <div class="w-full md:w-64 lg:w-80 mt-2 md:mt-0">
      <div class="relative glass-card rounded-full px-4 py-1.5">
        <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索单词、文章..." 
          class="w-full bg-transparent outline-none text-white pl-10 pr-12 placeholder-slate-500"
          @keypress="handleKeyPress"
        />
        <button 
          @click="handleSearch" 
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
    
    <div class="glass-card px-5 py-3 rounded-full flex items-center gap-4 w-full md:w-auto">
      <div class="flex flex-col">
        <span class="text-xs text-slate-400 uppercase tracking-wider">距离发射 (考试)</span>
        <span class="font-mono text-xl text-accent font-bold">{{ user.daysLeft }} <span class="text-xs font-normal text-slate-400">天</span></span>
      </div>
      <div class="h-8 w-[1px] bg-slate-600"></div>
      <div class="flex flex-col">
        <span class="text-xs text-slate-400 uppercase tracking-wider">今日能量</span>
        <span class="font-mono text-xl text-green-400 font-bold">{{ user.energy }}%</span>
      </div>
    </div>
  </header>
</template>