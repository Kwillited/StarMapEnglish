import { ref, onMounted, onUnmounted } from 'vue';

// 设备检测可组合函数
export function useDeviceDetection() {
  // 响应式变量，标记当前是否为移动端设备
  const isMobile = ref(false);

  // 检测设备类型的函数
  const checkDevice = () => {
    // 使用 window.matchMedia 检测屏幕宽度
    // 通常移动端设备的断点为 768px
    isMobile.value = window.matchMedia('(max-width: 767px)').matches;
  };

  // 组件挂载时检测设备类型
  onMounted(() => {
    checkDevice();
    // 监听窗口大小变化，动态更新设备类型
    window.addEventListener('resize', checkDevice);
  });

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice);
  });

  // 返回检测结果
  return {
    isMobile
  };
}