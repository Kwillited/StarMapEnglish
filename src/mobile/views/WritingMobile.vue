<script setup>
// 移动端写作练习页面
import { ref } from 'vue';

// 写作主题
const writingTopic = ref({
  title: 'The Impact of Artificial Intelligence on Modern Society',
  type: '议论文',
  wordLimit: '400-450',
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
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 标题 -->
      <div class="flex items-center justify-center mb-3">
        <h3 class="text-lg font-semibold text-white">信息合成 (Writing)</h3>
      </div>
    </div>
    
    <!-- 写作主题卡片 -->
    <div class="glass-card p-4 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-4">写作任务</h3>
      <div class="bg-slate-800/50 p-6 rounded-lg">
        <div class="space-y-3">
          <div>
            <h4 class="text-sm text-slate-400 mb-1">写作类型</h4>
            <p class="text-white font-medium">{{ writingTopic.type }}</p>
          </div>
          <div>
            <h4 class="text-sm text-slate-400 mb-1">题目</h4>
            <p class="text-white font-medium">{{ writingTopic.title }}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <h4 class="text-sm text-slate-400 mb-1">字数要求</h4>
              <p class="text-white font-medium">{{ writingTopic.wordLimit }} 词</p>
            </div>
            <div>
              <h4 class="text-sm text-slate-400 mb-1">时间限制</h4>
              <p class="text-write font-medium">{{ writingTopic.timeLimit }} 分钟</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 写作区域 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="flex justify-between text-sm text-slate-400 mb-2">
        <span>写作内容</span>
        <div class="flex items-center gap-2">
          <span class="text-white">{{ wordCount }}</span>
          <span>/ {{ writingTopic.wordLimit }}</span>
        </div>
      </div>
      <textarea 
        v-model="writingContent"
        @input="handleContentChange"
        placeholder="请在此输入你的写作内容..."
        class="w-full h-64 bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-write/50 resize-none"
      ></textarea>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex gap-3 p-4">
      <button 
        class="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-3 rounded-lg transition-colors"
      >
        保存草稿
      </button>
      <button 
        class="flex-1 bg-write hover:bg-write/90 text-white px-4 py-3 rounded-lg transition-colors"
      >
        提交作文
      </button>
    </div>
  </div>
</template>