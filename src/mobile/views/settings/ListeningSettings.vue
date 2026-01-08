<script setup>
// 听力设置页面组件
import { ref } from 'vue';

// 听力设置数据
const listeningSettings = ref({
  difficulty: 'medium',
  autoPlay: true,
  playbackSpeed: 1.0,
  autoNext: true
});

// 处理设置变更
const handleSettingChange = (setting, value) => {
  listeningSettings.value[setting] = value;
  console.log('更新听力设置:', setting, value);
};
</script>

<template>
  <!-- 听力设置页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings/mobile" class="text-white hover:text-listen transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <div class="flex-1 text-center">
          <h2 class="text-xl font-bold text-white">听力设置</h2>
          <p class="text-slate-400 text-sm">个性化您的听力学习体验</p>
        </div>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="space-y-3">
      <!-- 听力难度 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">听力难度</h3>
          <select 
            v-model="listeningSettings.difficulty"
            @change="handleSettingChange('difficulty', $event.target.value)"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-listen/50"
          >
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </div>
      </div>

      <!-- 自动播放 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">自动播放</h3>
            <p class="text-slate-400 text-xs">播放完当前音频后自动播放下一个</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="listeningSettings.autoPlay"
              @change="handleSettingChange('autoPlay', listeningSettings.autoPlay)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-listen/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-listen"></div>
          </label>
        </div>
      </div>

      <!-- 播放速度 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">播放速度</h3>
          <div class="flex items-center gap-3">
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.1" 
              v-model="listeningSettings.playbackSpeed"
              @input="handleSettingChange('playbackSpeed', parseFloat($event.target.value))"
              class="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-listen"
            />
            <span class="text-white text-sm min-w-[40px] text-center">{{ listeningSettings.playbackSpeed }}x</span>
          </div>
        </div>
      </div>

      <!-- 自动跳转下一题 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">自动跳转下一题</h3>
            <p class="text-slate-400 text-xs">完成当前题目后自动跳转到下一题</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="listeningSettings.autoNext"
              @change="handleSettingChange('autoNext', listeningSettings.autoNext)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-listen/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-listen"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="w-full bg-listen hover:bg-listen/90 text-white py-2.5 rounded-lg transition-colors">
      保存设置
    </button>
  </div>
</template>