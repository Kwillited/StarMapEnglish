<script setup>
// 移动端导航栏组件
import { ref } from 'vue';

// 控制下拉菜单显示状态
const showReadWriteMenu = ref(false);

// 切换下拉菜单显示
const toggleReadWriteMenu = () => {
  showReadWriteMenu.value = !showReadWriteMenu.value;
};
</script>

<template>
  <!-- 移动端导航栏 -->
  <nav class="fixed bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1e293b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl shadow-black/50 z-50">
    <!-- 移动端导航 -->
    <div class="grid grid-cols-5 items-center w-full">
      <!-- 控制台 -->
      <router-link to="/" class="nav-active flex flex-col items-center gap-1 group text-white col-span-1">
        <i class="fa-solid fa-grid-2 text-2xl group-hover:scale-110 transition"></i>
      </router-link>
      
      <!-- 词汇学习 -->
      <router-link to="/vocabulary" class="text-slate-500 hover:text-indigo-400 transition flex flex-col items-center gap-1 group col-span-1">
        <i class="fa-solid fa-shapes text-2xl group-hover:scale-110 transition"></i>
      </router-link>
      
      <!-- 听力学习 -->
      <router-link to="/listening" class="text-slate-500 hover:text-emerald-400 transition flex flex-col items-center gap-1 group col-span-1">
        <i class="fa-solid fa-headphones text-2xl group-hover:scale-110 transition"></i>
      </router-link>
      
      <!-- 阅读与写作合并按钮 -->
      <div class="relative flex flex-col items-center gap-1 group col-span-1">
        <button 
          @click="toggleReadWriteMenu"
          class="text-slate-500 hover:text-blue-400 transition flex flex-col items-center gap-1 group"
        >
          <i class="fa-solid fa-book-open text-2xl group-hover:scale-110 transition"></i>
        </button>
        
        <!-- 下拉菜单 -->
        <div 
          v-if="showReadWriteMenu" 
          class="absolute bottom-full mb-2 bg-[#1e293b] border border-white/10 rounded-xl shadow-xl shadow-black/50 z-50"
          style="width: 120px;"
        >
          <router-link 
            to="/reading" 
            class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
            @click="showReadWriteMenu = false"
          >
            <i class="fa-solid fa-book-open"></i>
            <span>阅读</span>
          </router-link>
          <router-link 
            to="/writing" 
            class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
            @click="showReadWriteMenu = false"
          >
            <i class="fa-solid fa-pen-nib"></i>
            <span>写作</span>
          </router-link>
        </div>
      </div>
      
      <!-- 设置按钮 -->
      <router-link to="/settings" class="text-slate-500 hover:text-slate-200 transition flex flex-col items-center gap-1 group col-span-1">
        <i class="fa-solid fa-user-astronaut text-2xl group-hover:scale-110 transition"></i>
      </router-link>
    </div>
    
    <!-- 中央火箭按钮，使用绝对定位 -->
    <router-link to="/" class="absolute left-1/2 -translate-x-1/2 -top-10 bg-accent text-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition border-4 border-[#020617]">
      <i class="fa-solid fa-rocket text-2xl"></i>
    </router-link>
  </nav>
</template>