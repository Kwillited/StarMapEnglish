<script setup>
// 移动端听力学习页面
import { ref, onMounted } from 'vue';

// 模拟听力材料数据
const audioMaterial = ref({
  id: 1,
  title: 'The Power of Active Listening',
  duration: '5:23',
  progress: 42,
  isPlaying: false,
  transcript: [
    'Hello everyone, today we\'re going to talk about the power of active listening.',
    'Active listening is a crucial skill that can improve your relationships and communication.',
    'It involves fully concentrating on the speaker, understanding their message, and responding appropriately.',
    'By practicing active listening, you can build trust, resolve conflicts, and foster meaningful connections.',
    'In today\'s fast-paced world, active listening has become more important than ever.',
    'So let\'s explore some strategies to enhance your active listening skills.'
  ],
  vocabulary: [
    { word: 'Crucial', meaning: '至关重要的' },
    { word: 'Concentrating', meaning: '集中注意力' },
    { word: 'Appropriately', meaning: '适当地' },
    { word: 'Resolve', meaning: '解决' },
    { word: 'Foster', meaning: '培养，促进' }
  ]
});

// 切换播放状态
const togglePlay = () => {
  audioMaterial.value.isPlaying = !audioMaterial.value.isPlaying;
};
</script>

<template>
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="glass-card p-4 rounded-xl">
      <h2 class="text-xl font-bold text-white mb-4 flex items-center">
        <i class="fa-solid fa-headphones text-listen mr-2"></i>
        听力学习中心
      </h2>
    </div>
    
    <!-- 音频播放区域 -->
    <div class="glass-card p-4 rounded-xl">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white mb-2">{{ audioMaterial.title }}</h3>
        <span class="text-sm text-slate-400">{{ audioMaterial.duration }}</span>
      </div>
      
      <!-- 音频进度条 -->
      <div class="w-full bg-slate-700/50 rounded-full h-2.5 mb-4">
        <div class="bg-listen h-2.5 rounded-full" :style="{ width: `${audioMaterial.progress}%` }"></div>
      </div>
      <div class="flex justify-between text-xs text-slate-400 mb-4">
        <span>{{ Math.floor((audioMaterial.progress / 100) * 323 / 60) }}:{{ Math.floor((audioMaterial.progress / 100) * 323 % 60).toString().padStart(2, '0') }}</span>
        <span>{{ audioMaterial.duration }}</span>
      </div>
      
      <!-- 播放控制按钮 -->
      <div class="flex justify-center mb-4">
        <button 
          @click="togglePlay" 
          class="bg-listen text-white font-bold py-3 px-8 rounded-full hover:bg-listen/90 transition-colors shadow-lg flex items-center gap-2"
        >
          <i :class="audioMaterial.isPlaying ? 'fa-solid fa-pause text-2xl' : 'fa-solid fa-play text-2xl'"></i>
          <span>{{ audioMaterial.isPlaying ? '暂停' : '播放' }}</span>
        </button>
      </div>
      
      <!-- 音频状态 -->
      <div class="text-center text-sm text-slate-400">
        <p>{{ audioMaterial.isPlaying ? '正在播放...' : '点击播放开始听力练习' }}</p>
      </div>
    </div>
    
    <!-- 听力原文区域 -->
    <div class="glass-card p-4 rounded-xl">
      <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
        <i class="fa-solid fa-file-lines text-listen mr-2"></i>
        听力原文
      </h3>
      
      <div class="space-y-3 text-slate-300">
        <p v-for="(line, index) in audioMaterial.transcript" :key="index" class="text-sm">
          {{ index + 1 }}. {{ line }}
        </p>
      </div>
    </div>
    
    <!-- 听力测试按钮 -->
    <button class="w-full bg-listen text-white font-bold py-3 px-4 rounded-xl hover:bg-listen/90 transition-colors shadow-lg">
      开始听力测试
    </button>
  </div>
</template>