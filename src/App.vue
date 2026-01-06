<script setup>
// 导入组件
import NavBar from './components/NavBar.vue'
import PageHeader from './components/PageHeader.vue'
import { useRoute } from 'vue-router'

// 定义组件数据
const user = {
  name: 'Alex',
  exam: '2026考研英语一',
  daysLeft: 186,
  energy: 85
}

// 获取当前路由
const route = useRoute()
</script>

<template>
  <div class="text-slate-200 min-h-screen flex flex-col md:flex-row h-screen">
    <!-- 导航栏组件 -->
    <NavBar />

    <!-- 主内容区 -->
    <main class="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pb-24 md:pb-8 h-full">
      
      <!-- 页面头部组件 - 只在控制台页面显示 -->
      <PageHeader v-if="route.path === '/'" :user="user" class="mb-6" />

      <!-- 路由视图 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* 全局样式 - 应用于整个页面 */
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 自定义颜色变量 */
:root {
  --accent: #38bdf8;
  --vocab: #818cf8;
  --read: #34d399;
  --listen: #fbbf24;
  --write: #f472b6;
}

/* 玻璃拟态卡片效果 */
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

/* 隐藏滚动条 */
.hide-scrollbar {
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
