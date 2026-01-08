<script setup>
// 主导航栏组件，根据设备类型自动选择移动端或桌面端组件
import { defineAsyncComponent } from 'vue';
import { useDeviceDetection } from '../composables/useDeviceDetection';

// 获取设备检测结果
const { isMobile } = useDeviceDetection();

// 异步导入组件
const MobileNavBar = defineAsyncComponent(() => 
  import('../../mobile/navigation/NavBar.vue')
);
const DesktopNavBar = defineAsyncComponent(() => 
  import('../../desktop/navigation/NavBar.vue')
);
</script>

<template>
  <!-- 根据设备类型条件渲染不同组件 -->
  <div>
    <!-- 移动端导航栏 -->
    <MobileNavBar v-if="isMobile" />
    <!-- 桌面端导航栏 -->
    <DesktopNavBar v-else />
  </div>
</template>