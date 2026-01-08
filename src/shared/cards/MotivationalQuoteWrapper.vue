<script setup>
// 主MotivationalQuote组件，根据设备类型自动选择移动端或桌面端组件
import { defineAsyncComponent } from 'vue';
import { useDeviceDetection } from '../composables/useDeviceDetection';

// 获取设备检测结果
const { isMobile } = useDeviceDetection();

// 异步导入组件
const MobileMotivationalQuote = defineAsyncComponent(() => 
  import('../../mobile/cards/MotivationalQuoteMobile.vue')
);
const DesktopMotivationalQuote = defineAsyncComponent(() => 
  import('../../desktop/cards/MotivationalQuoteDesktop.vue')
);

// 定义事件
const emit = defineEmits(['start-training']);

// 处理开始特训事件
const handleStartTraining = () => {
  emit('start-training');
};
</script>

<template>
  <!-- 根据设备类型条件渲染不同组件 -->
  <div>
    <!-- 移动端组件 -->
    <MobileMotivationalQuote 
      v-if="isMobile" 
      @start-training="handleStartTraining"
    />
    <!-- 桌面端组件 -->
    <DesktopMotivationalQuote 
      v-else 
      @start-training="handleStartTraining"
    />
  </div>
</template>