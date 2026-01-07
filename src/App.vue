<script setup>
// 导入组件
import NavBar from './components/NavBar.vue'
import PageHeader from './components/PageHeader.vue'
import { useRoute } from 'vue-router'
import { useWordManagementStore } from './stores/wordManagement.js'
import { useUserStore } from './stores/userStore.js'
import { onMounted, onUnmounted, ref } from 'vue'

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

// 星空背景相关
const stars = ref([])
const showStars = ref(false)
let animationFrame

// 生成星星
const generateStars = () => {
  const newStars = []
  for (let i = 0; i < 80; i++) {
    newStars.push({
      id: i,
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 2 + 1 + 'px',
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 5 + 's',
      animationDuration: (Math.random() * 3 + 2) + 's'
    })
  }
  stars.value = newStars
  showStars.value = true
}

// 星星闪烁效果
const twinkleStar = (index) => {
  if (stars.value[index]) {
    stars.value[index].opacity = Math.random() * 0.6 + 0.4
    animationFrame = setTimeout(() => {
      twinkleStar(index)
    }, Math.random() * 2000 + 1000)
  }
}

// 组件挂载时生成星星
onMounted(() => {
  generateStars()
  stars.value.forEach((_, index) => {
    twinkleStar(index)
  })
})

// 组件卸载时清除定时器
onUnmounted(() => {
  clearTimeout(animationFrame)
})
</script>

<template>
  <!-- 根容器，包含星空背景 -->
  <div class="relative text-slate-200 min-h-screen overflow-hidden">
    <!-- 星空背景 -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 z-0">
      <!-- 星星 -->
      <div 
        v-for="star in stars" 
        :key="star.id"
        class="absolute bg-white rounded-full animate-pulse"
        :style="{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
          animationDelay: star.animationDelay,
          animationDuration: star.animationDuration
        }"
      ></div>
      
      <!-- 背景渐变光效 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-1/4 w-64 sm:w-96 h-full bg-gradient-to-b from-purple-600 via-blue-500 to-transparent transform rotate-12 blur-2xl sm:blur-3xl"></div>
        <div class="absolute top-0 right-1/3 w-48 sm:w-64 h-full bg-gradient-to-b from-blue-400 via-cyan-300 to-transparent transform -rotate-12 blur-xl sm:blur-2xl"></div>
      </div>
    </div>
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
        <main class="flex-1 p-2 md:p-8 lg:p-12 overflow-y-auto pb-16 md:pb-8 h-full">
          
          <!-- 页面头部组件 - 只在控制台页面显示 -->
          <PageHeader v-if="route.path === '/'" :user="userStore.userInfo" class="mb-6" />

          <!-- 路由视图 -->
          <router-view></router-view>
        </main>
      </div>
    </template>
    <!-- 复习提示模态框 -->
    <div v-if="wordStore.showReviewModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="glass-card p-4 md:p-6 rounded-xl w-full max-w-md">
        <div class="text-center">
          <h3 class="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">复习提醒</h3>
          <p class="text-slate-300 mb-4 md:mb-6 text-sm md:text-base">{{ wordStore.reviewModalMessage }}</p>
          <div class="flex flex-row gap-3">
            <button 
              @click="closeModal"
              class="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full transition-colors text-sm md:text-base"
            >
              稍后再说
            </button>
            <button 
              @click="() => {
                closeModal();
                wordStore.studyMode = 'review';
              }"
              class="flex-1 bg-vocab hover:bg-vocab/90 text-white px-4 py-2 rounded-full transition-colors text-sm md:text-base"
            >
              开始复习
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


