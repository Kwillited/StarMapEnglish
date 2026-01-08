<script setup>
// 移动端导航栏组件
</script>

<template>
  <!-- 移动端导航栏 -->
  <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-2xl border-t border-slate-700 px-4 py-2 sm:py-3 z-50">
    <div class="flex items-center justify-around">
      <router-link to="/" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-accent transition-colors">
        <i class="fa-solid fa-house text-lg"></i>
        <span class="text-xs">首页</span>
      </router-link>
      <router-link to="/vocabulary/mobile" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-vocab transition-colors">
        <i class="fa-solid fa-shapes text-xl"></i>
        <span class="text-xs">词汇</span>
      </router-link>
      <router-link to="/listening/mobile" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-listen transition-colors">
        <i class="fa-solid fa-headphones text-lg"></i>
        <span class="text-xs">听力</span>
      </router-link>
      <router-link to="/reading/mobile" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-read transition-colors">
        <i class="fa-solid fa-book-open text-lg"></i>
        <span class="text-xs">阅读</span>
      </router-link>
      <router-link to="/writing/mobile" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-write transition-colors">
        <i class="fa-solid fa-pen-nib text-lg"></i>
        <span class="text-xs">写作</span>
      </router-link>
      <router-link to="/settings/mobile" class="flex flex-col items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
        <i class="fa-solid fa-gear text-lg"></i>
        <span class="text-xs">设置</span>
      </router-link>
    </div>
  </nav>
</template>