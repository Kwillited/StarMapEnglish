<script setup>
// DashboardCard基础组件
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  colorClass: {
    type: String,
    default: 'text-accent'
  },
  bgColorClass: {
    type: String,
    default: 'bg-accent/20'
  },
  hoverColorClass: {
    type: String,
    default: 'hover:bg-accent/5'
  },
  colSpan: {
    type: String,
    default: 'md:col-span-1 lg:col-span-4'
  }
});
</script>

<template>
  <!-- Dashboard卡片基础组件 -->
  <div :class="['glass-card p-4 sm:p-6 rounded-2xl md:rounded-3xl', colSpan, hoverColorClass, 'transition cursor-pointer group']">
    <!-- 标题区域 -->
    <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div :class="['p-2 sm:p-3 rounded-lg', bgColorClass, colorClass, 'group-hover:scale-110 transition']">
        <i :class="icon" class="text-sm sm:text-base"></i>
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold text-white text-base sm:text-lg">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-slate-400">{{ subtitle }}</p>
      </div>
    </div>
    
    <!-- 内容区域插槽 -->
    <slot name="content"></slot>
    
    <!-- 操作区域插槽 -->
    <slot name="actions"></slot>
  </div>
</template>