<script setup>
import { defineProps, defineEmits } from 'vue'
import { useWordManagementStore } from '../../stores/wordManagement.js'
import { useRouter } from 'vue-router'

// 定义属性
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})

// 定义事件
const emit = defineEmits(['close', 'start-review'])

// 获取单词管理store
const wordStore = useWordManagementStore()

// 获取路由实例
const router = useRouter()

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 开始复习
const startReview = () => {
  wordStore.studyMode = 'review'
  emit('start-review')
  emit('close')
  // 跳转到复习页面
  router.push('/review')
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="glass-card p-4 md:p-6 rounded-xl w-full max-w-md">
      <div class="text-center">
        <h3 class="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">复习提醒</h3>
        <p class="text-slate-300 mb-4 md:mb-6 text-sm md:text-base">{{ message }}</p>
        <div class="flex flex-row gap-3">
          <button 
            @click="closeModal"
            class="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full transition-colors text-sm md:text-base"
          >
            稍后再说
          </button>
          <button 
            @click="startReview"
            class="flex-1 bg-vocab hover:bg-vocab/90 text-white px-4 py-2 rounded-full transition-colors text-sm md:text-base"
          >
            开始复习
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
