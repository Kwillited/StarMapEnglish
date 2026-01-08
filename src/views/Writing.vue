<script setup>
// 写作学习页面
</script>

<template>
  <div class="glass-card p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
      <i class="fa-solid fa-pen-nib text-write mr-2"></i>
      写作学习中心
    </h2>
    <div class="space-y-4">
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">结构实验室</h3>
        <p class="text-slate-400">这里是结构实验室的完整功能页面，您可以在这里进行更深入的写作练习和学习。</p>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">写作类型</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">议论文</button>
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">说明文</button>
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">记叙文</button>
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">描述文</button>
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">书信</button>
          <button class="bg-write/20 hover:bg-write/30 text-write px-3 py-1 rounded-full text-sm transition-colors">报告</button>
        </div>
      </div>
      <div class="bg-slate-800/50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">写作记录</h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">今日写作时长</span>
            <span class="text-white font-semibold">25分钟</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">累计写作次数</span>
            <span class="text-white font-semibold">28次</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">平均分数</span>
            <span class="text-green-400 font-semibold">85分</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
