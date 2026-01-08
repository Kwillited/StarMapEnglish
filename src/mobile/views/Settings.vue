<script setup>
// 移动端设置中心 - 一级菜单页面
import { ref } from 'vue';
</script>

<template>
  <div class="space-y-4">
    <!-- 页面顶部 - 非卡片样式 -->
    <div class="p-4 mb-4">
      <!-- 标题 -->
      <div class="flex items-center justify-center mb-3">
        <h3 class="text-lg font-semibold text-white">设置中心</h3>
      </div>
    </div>
    
    <!-- 一级菜单列表 -->
    <div class="space-y-3 px-4">
      <!-- 个人信息 -->
      <router-link to="/settings/mobile/profile" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-vocab/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-user text-vocab"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">个人信息</h4>
                <p class="text-slate-400 text-sm">修改用户名、手机号、考试类型</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
      
      <!-- 词汇学习 -->
      <router-link to="/settings/mobile/vocabulary" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-vocab/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-shapes text-vocab"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">词汇学习设置</h4>
                <p class="text-slate-400 text-sm">调整每日学习单词数、词汇本选择等</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
      
      <!-- 阅读学习 -->
      <router-link to="/settings/mobile/reading" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-read/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-book-open text-read"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">阅读学习设置</h4>
                <p class="text-slate-400 text-sm">调整每日阅读文章数、难度等</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
      
      <!-- 听力学习 -->
      <router-link to="/settings/mobile/listening" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-listen/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-headphones text-listen"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">听力学习设置</h4>
                <p class="text-slate-400 text-sm">调整每日听力时长、播放速度等</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
      
      <!-- 写作学习 -->
      <router-link to="/settings/mobile/writing" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-write/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-pen-nib text-write"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">写作学习设置</h4>
                <p class="text-slate-400 text-sm">调整每日写作练习次数、话题类型等</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
      
      <!-- 通用设置 -->
      <router-link to="/settings/mobile/general" class="block">
        <div class="glass-card bg-slate-800/50 p-4 rounded-lg transition-all hover:bg-slate-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                <i class="fa-solid fa-sliders text-accent"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">通用设置</h4>
                <p class="text-slate-400 text-sm">调整提醒、通知、深色模式等</p>
              </div>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>