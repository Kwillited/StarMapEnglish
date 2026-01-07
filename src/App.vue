<script setup>
// 导入组件
import NavBar from './components/navigation/NavBar.vue'
import PageHeader from './components/layout/PageHeader.vue'
import StarBackground from './components/layout/StarBackground.vue'
import ReviewModal from './components/modals/ReviewModal.vue'
import { useRoute } from 'vue-router'
import { useWordManagementStore } from './stores/wordManagement.js'
import { useUserStore } from './stores/userStore.js'

// 获取当前路由
const route = useRoute()

// 获取单词管理store
const wordStore = useWordManagementStore()

// 获取用户状态store
const userStore = useUserStore()

// 关闭模态框
const closeModal = () => {
  wordStore.showReviewModal = false
}
</script>

<template>
  <!-- 根容器，包含星空背景 -->
  <div class="relative text-slate-200 min-h-screen overflow-hidden">
    <!-- 星空背景组件 -->
    <StarBackground />
    <!-- 对于登录和注册页面，不显示导航栏，直接显示路由视图 -->
    <template v-if="route.path === '/login' || route.path === '/register'">
      <router-view></router-view>
    </template>
    
    <!-- 对于其他页面，显示导航栏和主内容区 -->
    <template v-else>
      <div class="relative flex flex-col md:flex-row h-screen z-10">
        <!-- 导航栏组件 -->
        <NavBar />

        <!-- 主内容区 -->
        <main class="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pb-20 md:pb-12 h-full">
          
          <!-- 页面头部组件 - 只在控制台页面显示 -->
          <PageHeader v-if="route.path === '/'" :user="userStore.userInfo" class="mb-6" />

          <!-- 路由视图 -->
          <router-view></router-view>
        </main>
      </div>
    </template>
    <!-- 复习提示模态框组件 -->
    <ReviewModal 
      :visible="wordStore.showReviewModal"
      :message="wordStore.reviewModalMessage"
      @close="closeModal"
      @start-review="closeModal"
    />

  </div>
</template>


