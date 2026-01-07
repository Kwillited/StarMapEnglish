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
  <div class="text-slate-200 min-h-screen">
    <!-- 对于登录和注册页面，不显示导航栏，直接显示路由视图 -->
    <template v-if="route.path === '/login' || route.path === '/register'">
      <router-view></router-view>
    </template>
    
    <!-- 对于其他页面，显示导航栏和主内容区 -->
    <template v-else>
      <div class="flex flex-col md:flex-row h-screen">
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
  </div>
</template>


