<script setup>
// 阅读设置页面组件
import { ref } from 'vue';

// 阅读设置数据
const readingSettings = ref({
  difficulty: 'medium',
  fontSize: 16,
  autoScroll: false,
  readingMaterials: {
    news: true,
    academic: true,
    fiction: false
  }
});

// 处理设置变更
const handleSettingChange = (setting, value) => {
  readingSettings.value[setting] = value;
  console.log('更新阅读设置:', setting, value);
};

// 处理阅读材料类型变更
const handleMaterialChange = (material, value) => {
  readingSettings.value.readingMaterials[material] = value;
  console.log('更新阅读材料类型:', material, value);
};
</script>

<template>
  <!-- 阅读设置页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings/mobile" class="text-white hover:text-read transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <div class="flex-1 text-center">
          <h2 class="text-xl font-bold text-white">阅读设置</h2>
          <p class="text-slate-400 text-sm">个性化您的阅读学习体验</p>
        </div>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="space-y-3">
      <!-- 阅读难度 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">阅读难度</h3>
          <select 
            v-model="readingSettings.difficulty"
            @change="handleSettingChange('difficulty', $event.target.value)"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-read/50"
          >
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
        </div>
      </div>

      <!-- 字体大小 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">字体大小</h3>
          <div class="flex items-center gap-3">
            <input 
              type="range" 
              min="12" 
              max="24" 
              step="1" 
              v-model="readingSettings.fontSize"
              @input="handleSettingChange('fontSize', parseInt($event.target.value))"
              class="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-read"
            />
            <span class="text-white text-sm min-w-[40px] text-center">{{ readingSettings.fontSize }}px</span>
          </div>
        </div>
      </div>

      <!-- 自动滚动 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-medium text-white">自动滚动</h3>
            <p class="text-slate-400 text-xs">自动滚动阅读内容</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="readingSettings.autoScroll"
              @change="handleSettingChange('autoScroll', readingSettings.autoScroll)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-read/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-read"></div>
          </label>
        </div>
      </div>

      <!-- 阅读材料类型 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">阅读材料类型</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="readingSettings.readingMaterials.news"
                @change="handleMaterialChange('news', readingSettings.readingMaterials.news)"
                class="accent-read"
              />
              <span class="text-slate-300">新闻</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="readingSettings.readingMaterials.academic"
                @change="handleMaterialChange('academic', readingSettings.readingMaterials.academic)"
                class="accent-read"
              />
              <span class="text-slate-300">学术论文</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="readingSettings.readingMaterials.fiction"
                @change="handleMaterialChange('fiction', readingSettings.readingMaterials.fiction)"
                class="accent-read"
              />
              <span class="text-slate-300">小说</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="w-full bg-read hover:bg-read/90 text-white py-2.5 rounded-lg transition-colors">
      保存设置
    </button>
  </div>
</template>