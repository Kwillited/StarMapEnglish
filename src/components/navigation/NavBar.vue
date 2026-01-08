<script setup>
// 桌面端导航栏组件
</script>

<template>
  <!-- 桌面端导航栏 -->
  <nav class="relative bottom-0 left-0 translate-x-0 w-16 h-screen bg-transparent backdrop-blur-2xl border-t-0 border-r border-slate-700 rounded-none px-0 py-0 shadow-2xl shadow-black/50 z-50">
    <!-- 桌面端导航 -->
    <div class="flex flex-col justify-center items-center h-full gap-8 text-xl">
      <div class="text-accent text-2xl mb-auto mt-6 hover:animate-pulse">
        <i class="fa-solid fa-rocket"></i>
      </div>
      
      <div class="flex flex-col gap-8 text-slate-400">
        <router-link to="/" class="hover:text-white transition group relative">
          <i class="fa-solid fa-house"></i>
          <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">控制台</span>
        </router-link>
        <router-link to="/vocabulary" class="hover:text-vocab transition group relative">
          <i class="fa-solid fa-shapes"></i>
          <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">词汇学习</span>
        </router-link>
        <router-link to="/reading" class="hover:text-read transition group relative">
          <i class="fa-solid fa-book-open"></i>
          <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">阅读学习</span>
        </router-link>
        <router-link to="/listening" class="hover:text-listen transition group relative">
          <i class="fa-solid fa-headphones"></i>
          <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">听力学习</span>
        </router-link>
        <router-link to="/writing" class="hover:text-write transition group relative">
          <i class="fa-solid fa-pen-nib"></i>
          <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">写作学习</span>
        </router-link>
      </div>

      <router-link to="/settings" class="mt-auto mb-6 text-xl text-slate-400 hover:text-white group relative">
        <i class="fa-solid fa-gear"></i>
        <span class="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">设置</span>
      </router-link>
    </div>
  </nav>
</template>