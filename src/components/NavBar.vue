<script setup>
// NavBar组件，处理导航功能
</script>

<template>
  <!-- 导航栏 -->
  <nav class="fixed md:relative bottom-0 w-full md:w-16 md:h-screen bg-slate-900/90 md:bg-transparent border-t md:border-t-0 md:border-r border-slate-700 z-50 flex md:flex-col justify-around md:justify-center items-center py-3 md:py-0 md:gap-6 backdrop-blur-md">
    <router-link to="/" class="text-accent text-2xl md:text-2xl md:mb-auto md:mt-6 hover:animate-pulse">
      <i class="fa-solid fa-rocket"></i>
    </router-link>
    
    <div class="flex md:flex-col gap-8 md:gap-8 text-xl text-slate-400">
      <router-link to="/" class="hover:text-white transition group relative">
        <i class="fa-solid fa-house"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">控制台</span>
      </router-link>
      <router-link to="/vocabulary" class="hover:text-vocab transition group relative">
        <i class="fa-solid fa-shapes"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">词汇学习</span>
      </router-link>
      <router-link to="/reading" class="hover:text-read transition group relative">
        <i class="fa-solid fa-book-open"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">阅读学习</span>
      </router-link>
      <router-link to="/listening" class="hover:text-listen transition group relative">
        <i class="fa-solid fa-headphones"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">听力学习</span>
      </router-link>
      <router-link to="/writing" class="hover:text-write transition group relative">
        <i class="fa-solid fa-pen-nib"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">写作学习</span>
      </router-link>
      <!-- 小屏模式下的设置按钮 -->
      <router-link to="/settings" class="md:hidden hover:text-white transition group relative">
        <i class="fa-solid fa-gear"></i>
        <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">设置</span>
      </router-link>
    </div>

    <router-link to="/settings" class="hidden md:block md:mt-auto md:mb-6 text-slate-400 hover:text-white group relative">
      <i class="fa-solid fa-gear"></i>
      <span class="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">设置</span>
    </router-link>
  </nav>
</template>