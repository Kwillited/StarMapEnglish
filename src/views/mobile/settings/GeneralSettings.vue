<script setup>
// 通用设置页面
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '../../../stores/userStore.js';

// 使用用户状态 Pinia store
const userStore = useUserStore();

// 加载状态
const isLoading = ref(true);
const saveMessage = ref('');

// 学习设置数据
const settings = ref({
  general: {
    dailyReminder: true,
    notificationSound: true,
    darkMode: true,
    language: 'zh-CN'
  }
});

// 从后端获取设置
const fetchSettings = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`http://localhost:3000/api/settings/${userStore.userInfo.id}`);
    if (response.ok) {
      const data = await response.json();
      settings.value = data;
    } else {
      console.error('Failed to fetch settings');
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  } finally {
    isLoading.value = false;
  }
};

// 保存设置到后端
const saveSettings = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/settings/${userStore.userInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings.value)
    });
    
    if (response.ok) {
      saveMessage.value = '设置保存成功！';
      setTimeout(() => {
        saveMessage.value = '';
      }, 3000);
    } else {
      saveMessage.value = '保存失败，请重试';
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    saveMessage.value = '保存失败，请检查网络连接';
  }
};

// 监听设置变化，自动保存
watch(settings, () => {
  saveSettings();
}, { deep: true });

// 组件挂载时获取数据
onMounted(async () => {
  await fetchSettings();
});
</script>

<template>
  <div class="space-y-4">
    <!-- 页面顶部 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <h3 class="text-lg font-semibold text-white">通用设置</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
      
      <!-- 保存消息 -->
      <div v-if="saveMessage" class="text-sm text-green-400 flex items-center justify-center">
        <i class="fa-solid fa-check-circle mr-1"></i>
        {{ saveMessage }}
      </div>
    </div>
    
    <!-- 通用设置卡片 -->
    <div class="glass-card bg-slate-800/50 p-4 rounded-lg mx-4">
      <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
        <i class="fa-solid fa-sliders text-white mr-2"></i>
        通用设置
      </h3>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="text-slate-400">每日学习提醒</label>
          <button 
            :class="[
              'w-12 h-6 rounded-full flex items-center transition-all',
              settings.general.dailyReminder ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600' 
            ]"
            @click="settings.general.dailyReminder = !settings.general.dailyReminder"
          >
            <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <label class="text-slate-400">通知声音</label>
          <button 
            :class="[
              'w-12 h-6 rounded-full flex items-center transition-all',
              settings.general.notificationSound ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600' 
            ]"
            @click="settings.general.notificationSound = !settings.general.notificationSound"
          >
            <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <label class="text-slate-400">深色模式</label>
          <button 
            :class="[
              'w-12 h-6 rounded-full flex items-center transition-all',
              settings.general.darkMode ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600' 
            ]"
            @click="settings.general.darkMode = !settings.general.darkMode"
          >
            <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">应用语言</label>
          <select 
            v-model="settings.general.language"
            class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
          >
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 关于信息卡片 -->
    <div class="glass-card bg-slate-800/50 p-4 rounded-lg mx-4">
      <h3 class="text-lg font-semibold text-white mb-3">关于</h3>
      <div class="space-y-2">
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-400">版本</span>
          <span class="text-white">0.0.1</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-400">更新日期</span>
          <span class="text-white">2026-01-07</span>
        </div>
      </div>
    </div>
  </div>
</template>