<script setup>
// 阅读学习页面
</script>

<template>
  <div class="glass-card p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
      <i class="fa-solid fa-book-open text-read mr-2"></i>
      阅读学习中心
    </h2>
    <div class="space-y-4">
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">档案解密</h3>
        <p class="text-slate-400">这里是档案解密的完整功能页面，您可以在这里进行更深入的阅读练习和学习。</p>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">文章分类</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">科技</button>
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">经济</button>
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">文化</button>
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">社会</button>
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">环境</button>
          <button class="bg-read/20 hover:bg-read/30 text-read px-3 py-1 rounded-full text-sm transition-colors">教育</button>
        </div>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">阅读记录</h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">今日阅读时长</span>
            <span class="text-white font-semibold">30分钟</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">累计阅读文章数</span>
            <span class="text-white font-semibold">45篇</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">平均阅读速度</span>
            <span class="text-green-400 font-semibold">220词/分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
