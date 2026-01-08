<script setup>
// 桌面端设置页面组件
import { ref } from 'vue';

// 当前选中的设置选项卡
const activeTab = ref('profile');

// 设置选项卡数据
const tabs = [
  { id: 'profile', label: '个人资料', icon: 'fa-solid fa-user' },
  { id: 'vocabulary', label: '词汇学习', icon: 'fa-solid fa-graduation-cap' },
  { id: 'reading', label: '阅读设置', icon: 'fa-solid fa-book-open' },
  { id: 'listening', label: '听力设置', icon: 'fa-solid fa-headphones' },
  { id: 'writing', label: '写作设置', icon: 'fa-solid fa-pen-ruler' },
  { id: 'general', label: '通用设置', icon: 'fa-solid fa-gear' }
];

// 处理选项卡切换
const switchTab = (tabId) => {
  activeTab.value = tabId;
  console.log('切换选项卡:', tabId);
};
</script>

<template>
  <!-- 桌面端设置页面 -->
  <div class="space-y-4 sm:space-y-6">
    <!-- 页面标题 -->
    <div class="space-y-2">
      <h2 class="text-2xl font-bold text-white">系统设置 (Settings)</h2>
      <p class="text-slate-400">个性化您的学习体验</p>
    </div>

    <!-- 设置选项卡和内容区域 -->
    <div class="glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
        <!-- 左侧选项卡导航 -->
        <div class="md:col-span-2">
          <div class="space-y-1">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="switchTab(tab.id)"
              :class="[
                'flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors text-left',
                activeTab === tab.id 
                  ? 'bg-accent/20 text-accent font-medium' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              ]"
            >
              <i :class="tab.icon"></i>
              <span class="text-sm">{{ tab.label }}</span>
            </button>
          </div>
        </div>
        
        <!-- 右侧内容区域 -->
        <div class="md:col-span-4">
          <!-- 个人资料设置 -->
          <div v-if="activeTab === 'profile'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">个人资料</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">用户名</label>
                <input type="text" placeholder="请输入用户名" class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">手机号</label>
                <input type="tel" placeholder="请输入手机号" class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">考试类型</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="2026考研英语一">2026考研英语一</option>
                  <option value="2026考研英语二">2026考研英语二</option>
                  <option value="CET4">CET4</option>
                  <option value="CET6">CET6</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 词汇学习设置 -->
          <div v-if="activeTab === 'vocabulary'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">词汇学习设置</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">每日学习单词数</label>
                <input type="number" min="10" max="200" value="50" class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">词汇书选择</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="CET4">CET4高频词汇</option>
                  <option value="CET6">CET6高频词汇</option>
                  <option value="考研词汇">考研核心词汇</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- 阅读设置 -->
          <div v-if="activeTab === 'reading'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">阅读设置</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">阅读难度</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">阅读材料类型</label>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="news" class="accent-accent" />
                    <span class="text-slate-300">新闻</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="academic" class="accent-accent" />
                    <span class="text-slate-300">学术论文</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value="fiction" class="accent-accent" />
                    <span class="text-slate-300">小说</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 听力设置 -->
          <div v-if="activeTab === 'listening'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">听力设置</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">听力难度</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">自动播放下一题</label>
                <div class="flex items-center gap-2">
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="autoPlay" value="yes" class="accent-accent" checked />
                    <span class="text-slate-300">是</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="autoPlay" value="no" class="accent-accent" />
                    <span class="text-slate-300">否</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 写作设置 -->
          <div v-if="activeTab === 'writing'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">写作设置</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">写作难度</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">自动保存</label>
                <div class="flex items-center gap-2">
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="autoSave" value="yes" class="accent-accent" checked />
                    <span class="text-slate-300">是</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="autoSave" value="no" class="accent-accent" />
                    <span class="text-slate-300">否</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 通用设置 -->
          <div v-if="activeTab === 'general'" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-4">通用设置</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">语言</label>
                <select class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50">
                  <option value="zh-CN">中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">深色模式</label>
                <div class="flex items-center gap-2">
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="darkMode" value="auto" class="accent-accent" checked />
                    <span class="text-slate-300">自动</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="darkMode" value="on" class="accent-accent" />
                    <span class="text-slate-300">开启</span>
                  </label>
                  <label class="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="darkMode" value="off" class="accent-accent" />
                    <span class="text-slate-300">关闭</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 保存按钮 -->
          <div class="mt-6">
            <button class="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg transition-colors">
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>