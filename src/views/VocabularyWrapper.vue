<script setup>
// 主导汇学习页面，根据设备类型自动选择移动端或桌面端组件
import { defineAsyncComponent } from 'vue';
import { useDeviceDetection } from '../composables/useDeviceDetection';

// 获取设备检测结果
const { isMobile } = useDeviceDetection();

// 异步导入组件
const MobileVocabulary = defineAsyncComponent(() => 
  import('./mobile/Vocabulary.vue')
);
const DesktopVocabulary = defineAsyncComponent(() => 
  import('./Vocabulary.vue')
);
</script>

<template>
  <!-- 根据设备类型条件渲染不同组件 -->
  <div>
    <!-- 移动端词汇学习页面 -->
    <MobileVocabulary v-if="isMobile" />
    <!-- 桌面端词汇学习页面 -->
    <DesktopVocabulary v-else />
  </div>
</template>