<script setup>
// 写作练习页面组件
import { ref } from 'vue';

// 写作主题
const writingTopic = ref({
  title: 'The Impact of Artificial Intelligence on Modern Society',
  type: '议论文',
  wordLimit: 400-450,
  timeLimit: 60
});

// 写作内容
const writingContent = ref('');

// 字数统计
const wordCount = ref(0);

// 剩余时间
const remainingTime = ref(60 * 60); // 60分钟，单位为秒

// 处理写作内容变化
const handleContentChange = (event) => {
  writingContent.value = event.target.value;
  // 简单的字数统计，按空格分割
  wordCount.value = writingContent.value.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
</script>

<template>
  <!-- 写作练习页面 -->
  <div class="space-y-4 sm:space-y-6">
    <!-- 页面标题 -->
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-white">信息合成 (Writing)</h2>
      <p class="text-slate-400">2023年考研写作B</p>
    </div>

    <!-- 写作任务卡片 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <h3 class="text-lg font-bold text-white mb-3">写作任务</h3>
      <div class="space-y-3">
        <div>
          <h4 class="text-slate-400 text-xs uppercase tracking-wider mb-1">主题</h4>
          <p class="text-white font-medium">{{ writingTopic.title }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-slate-400 text-xs uppercase tracking-wider mb-1">类型</h4>
            <p class="text-white">{{ writingTopic.type }}</p>
          </div>
          <div>
            <h4 class="text-slate-400 text-xs uppercase tracking-wider mb-1">字数要求</h4>
            <p class="text-white">{{ writingTopic.wordLimit }}词</p>
          </div>
          <div>
            <h4 class="text-slate-400 text-xs uppercase tracking-wider mb-1">时间限制</h4>
            <p class="text-white">{{ writingTopic.timeLimit }}分钟</p>
          </div>
          <div>
            <h4 class="text-slate-400 text-xs uppercase tracking-wider mb-1">剩余时间</h4>
            <p class="text-write font-medium">{{ formatTime(remainingTime) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 写作区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-white">写作区域</h3>
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400">字数:</span>
          <span :class="wordCount > writingTopic.wordLimit ? 'text-red-400' : 'text-white'">
            {{ wordCount }}/{{ writingTopic.wordLimit }}
          </span>
        </div>
      </div>
      <textarea 
        v-model="writingContent"
        @input="handleContentChange"
        placeholder="请在此处开始写作..."
        class="w-full h-64 sm:h-80 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-write/50"
      ></textarea>
    </div>
    
    <!-- 写作工具区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <h3 class="text-lg font-bold text-white mb-4">写作工具</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-spell-check mr-1"></i> 拼写检查
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-synagogue mr-1"></i> 同义词替换
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-chart-line mr-1"></i> 结构分析
        </button>
        <button class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-xs">
          <i class="fa-solid fa-download mr-1"></i> 导出作文
        </button>
      </div>
    </div>
  </div>
</template>