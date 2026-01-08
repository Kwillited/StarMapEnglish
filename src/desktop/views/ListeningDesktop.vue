<script setup>
// 桌面端听力练习页面
import { ref } from 'vue';

// 音频播放器状态
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(80);

// 播放/暂停音频
const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  console.log('播放/暂停音频:', isPlaying.value);
};

// 调整音量
const adjustVolume = (event) => {
  volume.value = parseInt(event.target.value);
  console.log('调整音量:', volume.value);
};

// 调整播放进度
const seek = (event) => {
  const newTime = parseInt(event.target.value);
  currentTime.value = newTime;
  console.log('调整播放进度:', currentTime.value);
};
</script>

<template>
  <!-- 桌面端听力练习页面 -->
  <div class="space-y-4 sm:space-y-6">
    <!-- 页面标题 -->
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-white">信号截获 (Listening)</h2>
      <p class="text-slate-400">BBC News / 2023真题</p>
    </div>

    <!-- 听力内容区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <!-- 听力文本 -->
      <div class="mb-6">
        <h3 class="text-lg font-bold text-white mb-3">新闻文本</h3>
        <div class="space-y-2">
          <p class="text-slate-300 text-sm">
            <span class="text-accent">[00:00]</span> Good morning, this is BBC News with Jonathan Izard.
          </p>
          <p class="text-slate-300 text-sm">
            <span class="text-accent">[00:05]</span> The United Nations has warned that the world is facing a "perfect storm" of crises, including climate change, conflict, and poverty.
          </p>
          <p class="text-slate-300 text-sm">
            <span class="text-accent">[00:15]</span> The UN Secretary-General Antonio Guterres said that urgent action is needed to address these issues.
          </p>
          <p class="text-slate-300 text-sm">
            <span class="text-accent">[00:22]</span> "We are at a crossroads," he said. "The choices we make now will determine the future of our planet."
          </p>
          <p class="text-slate-300 text-sm">
            <span class="text-accent">[00:30]</span> Mr. Guterres was speaking at the opening of the UN General Assembly in New York.
          </p>
        </div>
      </div>
      
      <!-- 音频播放器 -->
      <div class="bg-slate-800/50 p-4 rounded-xl">
        <div class="space-y-4">
          <!-- 播放进度条 -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs text-slate-400">
              <span>{{ currentTime }}s</span>
              <span>{{ duration }}s</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              v-model="currentTime" 
              @input="seek" 
              class="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-listen"
            />
          </div>
          
          <!-- 播放控制和音量 -->
          <div class="flex items-center justify-between">
            <!-- 播放控制 -->
            <div class="flex items-center gap-4">
              <button 
                @click="togglePlay"
                class="text-white hover:text-listen transition-colors"
              >
                <i :class="isPlaying ? 'fa-solid fa-pause text-xl' : 'fa-solid fa-play text-xl'"
                ></i>
              </button>
              <button class="text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-backward-step"></i>
              </button>
              <button class="text-slate-400 hover:text-white transition-colors">
                <i class="fa-solid fa-forward-step"></i>
              </button>
            </div>
            
            <!-- 音量控制 -->
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-volume-high text-slate-400"></i>
              <input 
                type="range" 
                min="0" 
                max="100" 
                v-model="volume" 
                @input="adjustVolume" 
                class="w-24 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-listen"
              />
              <span class="text-xs text-slate-400">{{ volume }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 听力练习题目 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <h3 class="text-lg font-bold text-white mb-4">听力理解题</h3>
      
      <div class="space-y-4">
        <!-- 题目1 -->
        <div class="space-y-2">
          <h4 class="text-slate-300 font-medium">1. What is the main topic of the news report?</h4>
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-listen" />
              <span class="text-slate-300">A) Climate change</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-listen" />
              <span class="text-slate-300">B) The UN General Assembly</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-listen" />
              <span class="text-slate-300">C) Global crises</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q1" class="accent-listen" />
              <span class="text-slate-300">D) Poverty</span>
            </label>
          </div>
        </div>
        
        <!-- 题目2 -->
        <div class="space-y-2">
          <h4 class="text-slate-300 font-medium">2. Who is Antonio Guterres?</h4>
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q2" class="accent-listen" />
              <span class="text-slate-300">A) BBC News presenter</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q2" class="accent-listen" />
              <span class="text-slate-300">B) UN Secretary-General</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q2" class="accent-listen" />
              <span class="text-slate-300">C) US President</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="q2" class="accent-listen" />
              <span class="text-slate-300">D) Climate scientist</span>
            </label>
          </div>
        </div>
        
        <!-- 提交按钮 -->
        <button class="w-full bg-listen hover:bg-listen/90 text-white py-2 rounded-lg transition-colors">
          提交答案
        </button>
      </div>
    </div>
  </div>
</template>