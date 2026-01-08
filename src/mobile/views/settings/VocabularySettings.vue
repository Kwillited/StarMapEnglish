<script setup>
// 词汇设置页面组件
import { ref } from 'vue';

// 词汇设置数据
const vocabularySettings = ref({
  dailyWords: 50,
  vocabularyBook: 'CET4',
  showPhonetic: true,
  autoPlayAudio: false
});

// 处理设置变更
const handleSettingChange = (setting, value) => {
  vocabularySettings.value[setting] = value;
  console.log('更新词汇设置:', setting, value);
};
</script>

<template>
  <!-- 词汇设置页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings/mobile" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <div class="flex-1 text-center">
          <h2 class="text-xl font-bold text-white">词汇设置</h2>
          <p class="text-slate-400 text-sm">个性化您的词汇学习体验</p>
        </div>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="space-y-3">
      <!-- 每日学习单词数 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">每日学习单词数</h3>
          <div class="flex items-center gap-3">
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="10" 
              v-model="vocabularySettings.dailyWords"
              @input="handleSettingChange('dailyWords', parseInt($event.target.value))"
              class="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-vocab"
            />
            <span class="text-white text-sm min-w-[40px] text-center">{{ vocabularySettings.dailyWords }}</span>
          </div>
        </div>
      </div>

      <!-- 词汇书选择 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">词汇书选择</h3>
          <select 
            v-model="vocabularySettings.vocabularyBook"
            @change="handleSettingChange('vocabularyBook', $event.target.value)"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-vocab/50"
          >
            <option value="CET4">CET4高频词汇</option>
            <option value="CET6">CET6高频词汇</option>
            <option value="考研词汇">考研核心词汇</option>
          </select>
        </div>
      </div>

      <!-- 显示音标 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">显示音标</h3>
            <p class="text-slate-400 text-xs">在单词卡片中显示音标</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="vocabularySettings.showPhonetic"
              @change="handleSettingChange('showPhonetic', vocabularySettings.showPhonetic)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-vocab/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vocab"></div>
          </label>
        </div>
      </div>

      <!-- 自动播放音频 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">自动播放音频</h3>
            <p class="text-slate-400 text-xs">点击单词卡片时自动播放发音</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="vocabularySettings.autoPlayAudio"
              @change="handleSettingChange('autoPlayAudio', vocabularySettings.autoPlayAudio)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-vocab/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vocab"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="w-full bg-vocab hover:bg-vocab/90 text-white py-2.5 rounded-lg transition-colors">
      保存设置
    </button>
  </div>
</template>