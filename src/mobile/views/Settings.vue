<script setup>
import { computed } from 'vue';

// 1. 个人信息 (单独提取，作为头部大卡片)
const profileLink = {
  path: '/settings/mobile/profile',
  title: '个人中心',
  desc: '管理账号与考级目标',
  avatar: 'fa-user-astronaut' // 换个更酷的图标
};

// 2. 学习模块 (核心功能，采用宫格布局)
const learningModules = [
  {
    id: 'vocabulary',
    title: '词汇设置',
    label: '每日单词 / 词书',
    path: '/settings/mobile/vocabulary',
    icon: 'fa-shapes',
    // 使用渐变色背景，视觉更丰富
    bgClass: 'bg-gradient-to-br from-vocab/20 to-vocab/5 text-vocab', 
    borderClass: 'group-hover:border-vocab/30'
  },
  {
    id: 'reading',
    title: '阅读训练',
    label: '文章难度 / 来源',
    path: '/settings/mobile/reading',
    icon: 'fa-book-open',
    bgClass: 'bg-gradient-to-br from-read/20 to-read/5 text-read',
    borderClass: 'group-hover:border-read/30'
  },
  {
    id: 'listening',
    title: '听力磨耳朵',
    label: '倍速 / 播放模式',
    path: '/settings/mobile/listening',
    icon: 'fa-headphones-simple',
    bgClass: 'bg-gradient-to-br from-listen/20 to-listen/5 text-listen',
    borderClass: 'group-hover:border-listen/30'
  },
  {
    id: 'writing',
    title: '写作练习',
    label: '话题库 / 批改',
    path: '/settings/mobile/writing',
    icon: 'fa-pen-nib',
    bgClass: 'bg-gradient-to-br from-write/20 to-write/5 text-write',
    borderClass: 'group-hover:border-write/30'
  }
];

// 3. 底部通用设置 (横条布局)
const generalLink = {
  path: '/settings/mobile/general',
  title: '通用设置',
  desc: '深色模式 / 通知提醒 / 关于我们',
  icon: 'fa-gear'
};
</script>

<template>
  <div class="fixed inset-0 px-4 sm:px-6 lg:px-8 select-none overflow-hidden overscroll-behavior-none">
    <!-- 顶部标题 (与其他页面保持一致) -->
    <div class="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <h2 class="text-lg font-bold text-white flex items-center justify-center p-4">
        <i class="fa-solid fa-gear text-vocab mr-2"></i> 设置中心
      </h2>
    </div>

    <!-- 主内容区 -->
    <div class="pt-24 pb-4 max-h-full">
      <div class="max-w-md sm:max-w-xl md:max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <!-- 1. 个人信息卡片 (Banner 样式) -->
        <router-link :to="profileLink.path" class="block group relative overflow-hidden rounded-2xl">
          <!-- 背景装饰 -->
          <div class="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-800/60 z-0"></div>
          <div class="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div class="relative z-10 flex items-center p-3 sm:p-4 border border-white/5 rounded-2xl transition-all duration-300 group-hover:border-white/10 group-active:scale-[0.98]">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-700/50 flex items-center justify-center mr-3 sm:mr-4 shadow-inner ring-1 ring-white/10">
              <i :class="['fa-solid text-lg sm:text-xl text-blue-400', profileLink.avatar]"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors">{{ profileLink.title }}</h3>
              <p class="text-slate-400 text-xs mt-0.5">{{ profileLink.desc }}</p>
            </div>
            <i class="fa-solid fa-chevron-right text-slate-600 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </router-link>

        <!-- 分隔标题 -->
        <div class="flex items-center space-x-2 px-1">
          <div class="h-4 w-1 bg-vocab rounded-full"></div>
          <span class="text-sm font-bold text-slate-400 tracking-wider">学习配置</span>
        </div>

        <!-- 2. 学习模块 (Bento Grid 响应式布局) -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <router-link 
            v-for="item in learningModules" 
            :key="item.id" 
            :to="item.path"
            class="group relative"
          >
            <!-- 卡片本体 -->
            <div class="h-24 sm:h-28 rounded-2xl bg-slate-800/40 border border-white/5 p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:bg-slate-800 hover:border-white/10 active:scale-[0.96] shadow-sm hover:shadow-lg hover:shadow-black/20">
              
              <!-- 顶部图标区 -->
              <div class="flex justify-between items-start">
                <div :class="['w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm sm:text-base shadow-sm', item.bgClass]">
                  <i :class="['fa-solid', item.icon]"></i>
                </div>
                <!-- 右上角装饰箭头 -->
                <i class="fa-solid fa-arrow-right text-[10px] text-slate-600 -mr-1 -mt-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"></i>
              </div>

              <!-- 底部文字区 -->
              <div>
                <h4 class="text-white font-bold text-sm tracking-wide">{{ item.title }}</h4>
                <p class="text-slate-500 text-[10px] mt-0.5 truncate">{{ item.label }}</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- 3. 底部通用设置 (胶囊样式) -->
        <div class="pt-1 sm:pt-2">
          <router-link :to="generalLink.path" class="block group">
            <div class="bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-3 sm:p-4 flex items-center justify-between transition-all hover:bg-slate-800 active:scale-[0.99]">
              <div class="flex items-center">
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-700/50 flex items-center justify-center mr-2 sm:mr-3 text-slate-300 group-hover:text-white transition-colors">
                  <i :class="['fa-solid', generalLink.icon]"></i>
                </div>
                <span class="text-slate-300 font-medium group-hover:text-white transition-colors">{{ generalLink.title }}</span>
              </div>
              <div class="flex items-center text-slate-500 text-xs">
                <span class="mr-2 hidden sm:inline">{{ generalLink.desc }}</span>
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>