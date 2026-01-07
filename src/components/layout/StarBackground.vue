<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 星空背景相关
const stars = ref([])
const animationFrames = ref([])

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
}

// 星星闪烁效果
const twinkleStar = (index) => {
  const star = stars.value[index]
  if (!star) return

  const twinkle = () => {
    if (stars.value[index]) {
      stars.value[index].opacity = Math.random() * 0.6 + 0.4
      const nextDelay = Math.random() * 2000 + 1000
      
      const frameId = requestAnimationFrame(() => {
        setTimeout(twinkle, nextDelay)
      })
      
      animationFrames.value.push(frameId)
    }
  }
  
  twinkle()
}

// 组件挂载时生成星星
onMounted(() => {
  generateStars()
  stars.value.forEach((_, index) => {
    twinkleStar(index)
  })
})

// 组件卸载时清除所有动画帧
onUnmounted(() => {
  animationFrames.value.forEach(frameId => {
    cancelAnimationFrame(frameId)
  })
  animationFrames.value = []
})
</script>

<template>
  <!-- 星空背景 -->
  <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 z-0">
    <!-- 星星 -->
    <div 
      v-for="star in stars" 
      :key="star.id"
      v-memo="[star.id, star.opacity]"
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
</template>
