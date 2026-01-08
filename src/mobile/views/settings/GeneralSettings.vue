<script setup>
// 通用设置页面组件
import { ref } from 'vue';

// 通用设置数据
const generalSettings = ref({
  language: 'zh-CN',
  darkMode: 'auto',
  notifications: true,
  soundEffects: true
});

// 处理设置变更
const handleSettingChange = (setting, value) => {
  generalSettings.value[setting] = value;
  console.log('更新设置:', setting, value);
};
</script>

<template>
  <!-- 通用设置页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings/mobile" class="text-white hover:text-accent transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <div class="flex-1 text-center">
          <h2 class="text-xl font-bold text-white">通用设置</h2>
          <p class="text-slate-400 text-sm">个性化您的应用体验</p>
        </div>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="space-y-3">
      <!-- 语言设置 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">语言</h3>
          <select 
            v-model="generalSettings.language"
            @change="handleSettingChange('language', $event.target.value)"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="zh-CN">中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
      </div>

      <!-- 深色模式 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">深色模式</h3>
          <div class="flex gap-2">
            <label class="flex items-center gap-2 cursor-pointer flex-1">
              <input 
                type="radio" 
                name="darkMode" 
                value="auto" 
                v-model="generalSettings.darkMode"
                @change="handleSettingChange('darkMode', 'auto')"
                class="accent-accent"
              />
              <span class="text-slate-300">自动</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer flex-1">
              <input 
                type="radio" 
                name="darkMode" 
                value="on" 
                v-model="generalSettings.darkMode"
                @change="handleSettingChange('darkMode', 'on')"
                class="accent-accent"
              />
              <span class="text-slate-300">开启</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer flex-1">
              <input 
                type="radio" 
                name="darkMode" 
                value="off" 
                v-model="generalSettings.darkMode"
                @change="handleSettingChange('darkMode', 'off')"
                class="accent-accent"
              />
              <span class="text-slate-300">关闭</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 通知设置 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">通知提醒</h3>
            <p class="text-slate-400 text-xs">接收学习提醒和通知</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="generalSettings.notifications"
              @change="handleSettingChange('notifications', generalSettings.notifications)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
        </div>
      </div>

      <!-- 音效设置 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">音效</h3>
            <p class="text-slate-400 text-xs">开启或关闭应用音效</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="generalSettings.soundEffects"
              @change="handleSettingChange('soundEffects', generalSettings.soundEffects)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-lg transition-colors">
      保存设置
    </button>
  </div>
</template>