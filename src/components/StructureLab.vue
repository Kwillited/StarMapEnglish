<script setup>
// StructureLab组件，显示写作练习
</script>

<template>
  <!-- 结构实验室 (写作) -->
  <div class="glass-card p-6 rounded-3xl md:col-span-2 lg:col-span-4 hover:bg-write/5 transition cursor-pointer group">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-3 rounded-lg bg-write/20 text-write group-hover:scale-110 transition">
        <i class="fa-solid fa-pen-fancy"></i>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold text-white">结构实验室 (Writing)</h3>
        <p class="text-xs text-slate-400">大作文模版 / 语法纠错</p>
      </div>
    </div>
    <div class="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
      <p class="text-xs text-slate-300 font-mono leading-relaxed">
        <span class="text-red-400 line-through">As far as I am concerned</span> 
        <span class="text-green-400">From my perspective</span>, 
        technology acts as a double-edged sword...
      </p>
    </div>
  </div>
</template>