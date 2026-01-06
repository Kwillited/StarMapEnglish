<script setup>
// NavBar组件，处理导航功能
</script>

<template>
  <!-- 导航栏 -->
  <nav class="fixed md:relative bottom-0 w-full md:w-24 md:h-screen bg-slate-900/90 md:bg-transparent border-t md:border-t-0 md:border-r border-slate-700 z-50 flex md:flex-col justify-around md:justify-center items-center py-3 md:py-0 md:gap-8 backdrop-blur-md">
    <a href="#" class="text-accent text-2xl md:text-3xl md:mb-auto md:mt-8 hover:animate-pulse">
      <i class="fa-solid fa-rocket"></i>
    </a>
    
    <div class="flex md:flex-col gap-8 md:gap-10 text-xl text-slate-400">
      <a href="#" class="hover:text-white transition group relative">
        <i class="fa-solid fa-house"></i>
        <span class="hidden md:block absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">控制台</span>
      </a>
      <a href="#" class="hover:text-vocab transition"><i class="fa-solid fa-shapes"></i></a>
      <a href="#" class="hover:text-read transition"><i class="fa-solid fa-book-open"></i></a>
      <a href="#" class="hover:text-listen transition"><i class="fa-solid fa-headphones"></i></a>
      <a href="#" class="hover:text-write transition"><i class="fa-solid fa-pen-nib"></i></a>
    </div>

    <a href="#" class="hidden md:block md:mt-auto md:mb-8 text-slate-400 hover:text-white">
      <i class="fa-solid fa-gear"></i>
    </a>
  </nav>
</template>