<script setup>
// 听力学习页面
</script>

<template>
  <div class="glass-card p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
      <i class="fa-solid fa-headphones text-listen mr-2"></i>
      听力学习中心
    </h2>
    <div class="space-y-4">
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">信号截获</h3>
        <p class="text-slate-400">这里是信号截获的完整功能页面，您可以在这里进行更深入的听力练习和学习。</p>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">听力材料分类</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">新闻</button>
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">访谈</button>
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">演讲</button>
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">电影</button>
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">音乐</button>
          <button class="bg-listen/20 hover:bg-listen/30 text-listen px-3 py-1 rounded-full text-sm transition-colors">纪录片</button>
        </div>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">听力记录</h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">今日听力时长</span>
            <span class="text-white font-semibold">45分钟</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">累计听力时长</span>
            <span class="text-white font-semibold">12小时30分钟</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">听力准确率</span>
            <span class="text-green-400 font-semibold">82%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
