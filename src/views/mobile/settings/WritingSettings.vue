<script setup>
// 写作学习设置页面
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '../../../stores/userStore.js';

// 使用用户状态 Pinia store
const userStore = useUserStore();

// 加载状态
const isLoading = ref(true);
const saveMessage = ref('');

// 学习设置数据
const settings = ref({
  writing: {
    dailyPractice: 1,
    topicType: 'mixed',
    autoCheckGrammar: true,
    wordLimit: 200
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
        
        <h3 class="text-lg font-semibold text-white">写作学习设置</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
      
      <!-- 保存消息 -->
      <div v-if="saveMessage" class="text-sm text-green-400 flex items-center justify-center">
        <i class="fa-solid fa-check-circle mr-1"></i>
        {{ saveMessage }}
      </div>
    </div>
    
    <!-- 写作学习设置卡片 -->
    <div class="glass-card bg-slate-800/50 p-4 rounded-lg mx-4">
      <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
        <i class="fa-solid fa-pen-nib text-write mr-2"></i>
        写作学习设置
      </h3>
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">每日写作练习次数</label>
          <input 
            type="number" 
            v-model.number="settings.writing.dailyPractice"
            min="1" 
            max="5"
            class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-24"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">话题类型</label>
          <select 
            v-model="settings.writing.topicType"
            class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
          >
            <option value="mixed">混合</option>
            <option value="academic">学术</option>
            <option value="daily">日常</option>
            <option value="business">商务</option>
          </select>
        </div>
        <div class="flex justify-between items-center">
          <label class="text-slate-400">自动检查语法</label>
          <button 
            :class="[
              'w-12 h-6 rounded-full flex items-center transition-all',
              settings.writing.autoCheckGrammar ? 'bg-write justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
            ]"
            @click="settings.writing.autoCheckGrammar = !settings.writing.autoCheckGrammar"
          >
            <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">单词限制</label>
          <input 
            type="number" 
            v-model.number="settings.writing.wordLimit"
            min="50" 
            max="1000"
            class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
          />
        </div>
      </div>
    </div>
  </div>
</template>