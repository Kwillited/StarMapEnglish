<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/apiservice.js'

const router = useRouter()
const username = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAgreed = ref(true) // 默认同意服务条款和隐私政策
const error = ref('')
const stars = ref([])
const showStars = ref(false)
const showPassword = ref(false)

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

let animationFrame

const twinkleStar = (index) => {
  if (stars.value[index]) {
    stars.value[index].opacity = Math.random() * 0.6 + 0.4
    animationFrame = setTimeout(() => {
      twinkleStar(index)
    }, Math.random() * 2000 + 1000)
  }
}

onMounted(() => {
  generateStars()
  stars.value.forEach((_, index) => {
    twinkleStar(index)
  })
})

onUnmounted(() => {
  clearTimeout(animationFrame)
})

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  if (!username.value || !phone.value || !password.value || !confirmPassword.value) {
    error.value = '请填写完整的注册信息'
    return
  }
  
  // 验证是否同意服务条款和隐私政策
  if (!termsAgreed.value) {
    error.value = '请阅读并同意服务条款和隐私政策'
    return
  }
  
  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone.value)) {
    error.value = '请输入有效的手机号码'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }
  
  if (password.value.length < 6) {
    error.value = '密码长度不能少于6位'
    return
  }
  
  try {
    // 调用注册API
    const result = await api.auth.register({
      username: username.value,
      phone: phone.value,
      password: password.value,
      exam_type: '大学英语四级' // 默认考试类型
    })
    
    error.value = ''
    router.push('/login')
  } catch (err) {
    error.value = err.message || '网络错误，请稍后重试'
  }
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden flex justify-center items-center p-3 sm:p-4">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
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
      
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 left-1/4 w-64 sm:w-96 h-full bg-gradient-to-b from-purple-600 via-blue-500 to-transparent transform rotate-12 blur-2xl sm:blur-3xl"></div>
        <div class="absolute top-0 right-1/3 w-48 sm:w-64 h-full bg-gradient-to-b from-blue-400 via-cyan-300 to-transparent transform -rotate-12 blur-xl sm:blur-2xl"></div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-slate-900 to-transparent">
        <svg class="absolute bottom-0 w-full h-20 sm:h-32 text-slate-900" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,200 L0,120 Q360,180 720,100 Q1080,20 1440,80 L1440,200 Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
    
    <div class="relative z-10 w-full max-w-xs sm:max-w-md">
      <div class="text-center mb-5 sm:mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-full mb-2.5 sm:mb-4 animate-float">
          <i class="fa-solid fa-rocket text-xl sm:text-4xl text-accent"></i>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight">StarMap</h1>
        <p class="text-xs sm:text-base text-slate-400">开启您的学习星图之旅</p>
      </div>
      
      <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-2.5 sm:p-4 text-red-400 mb-3 sm:mb-6 backdrop-blur-sm animate-shake text-xs sm:text-sm">
        <div class="flex items-center gap-1.5 sm:gap-2">
          <i class="fa-solid fa-triangle-exclamation text-xs sm:text-base"></i>
          <span>{{ error }}</span>
        </div>
      </div>
      
      <div class="glass-card rounded-xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-xl">
        <form @submit.prevent="handleRegister" class="space-y-3 sm:space-y-5">
          <div class="group">
            <label for="username" class="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 ml-0.5 sm:ml-1 transition-colors group-focus-within:text-accent">用户名</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-2.5 sm:pl-4 flex items-center pointer-events-none">
                <i class="fa-regular fa-user text-slate-500 text-xs sm:text-base group-focus-within:text-accent transition-colors"></i>
              </div>
              <input 
                type="text" 
                id="username" 
                v-model="username"
                placeholder="给自己起个名字" 
                class="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg sm:rounded-xl pl-8 sm:pl-11 pr-2.5 sm:pr-4 py-2 sm:py-4 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
              />
            </div>
          </div>
          
          <div class="group">
            <label for="phone" class="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 ml-0.5 sm:ml-1 transition-colors group-focus-within:text-accent">手机号</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-2.5 sm:pl-4 flex items-center pointer-events-none">
                <i class="fa-solid fa-phone text-slate-500 text-xs sm:text-base group-focus-within:text-accent transition-colors"></i>
              </div>
              <input 
                type="tel" 
                id="phone" 
                v-model="phone"
                placeholder="13800138000" 
                class="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg sm:rounded-xl pl-8 sm:pl-11 pr-2.5 sm:pr-4 py-2 sm:py-4 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
              />
            </div>
          </div>
          
          <div class="group">
            <label for="password" class="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 ml-0.5 sm:ml-1 transition-colors group-focus-within:text-accent">密码</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-2.5 sm:pl-4 flex items-center pointer-events-none">
                <i class="fa-solid fa-lock text-slate-500 text-xs sm:text-base group-focus-within:text-accent transition-colors"></i>
              </div>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password"
                placeholder="至少6位" 
                class="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg sm:rounded-xl pl-8 sm:pl-11 pr-2.5 sm:pr-4 py-2 sm:py-4 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
              />
              <button 
                type="button" 
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-2.5 sm:pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors text-xs sm:text-base"
              >
                <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
              </button>
            </div>
          </div>
          
          <div class="group">
            <label for="confirmPassword" class="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 ml-0.5 sm:ml-1 transition-colors group-focus-within:text-accent">确认密码</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-2.5 sm:pl-4 flex items-center pointer-events-none">
                <i class="fa-solid fa-lock text-slate-500 text-xs sm:text-base group-focus-within:text-accent transition-colors"></i>
              </div>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="confirmPassword"
                placeholder="再次输入密码" 
                class="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg sm:rounded-xl pl-8 sm:pl-11 pr-2.5 sm:pr-4 py-2 sm:py-4 text-xs sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
              />
            </div>
          </div>
          
          <div class="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <input 
              type="checkbox" 
              id="terms" 
              v-model="termsAgreed"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-0.5 rounded border-slate-600 bg-slate-800 text-accent focus:ring-accent/50 flex-shrink-0 cursor-pointer" 
            />
            <label for="terms" class="text-slate-400 leading-tight sm:leading-normal">
              <span class="hidden sm:inline">我已阅读并同意</span>
              <span class="sm:hidden">同意</span>
              <a href="#" class="text-accent hover:text-accent/80 transition-colors">服务条款</a>
              <span class="hidden sm:inline">和</span>
              <span class="sm:hidden">&</span>
              <a href="#" class="text-accent hover:text-accent/80 transition-colors">隐私政策</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-600/90 text-white font-semibold py-2 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/25 relative overflow-hidden group text-xs sm:text-base"
          >
            <span class="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
              创建账号
              <i class="fa-solid fa-star text-xs sm:text-base transition-transform group-hover:rotate-12"></i>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
        
        <div class="relative my-4 sm:my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-700/50"></div>
          </div>
          <div class="relative flex justify-center text-xs sm:text-sm">
            <span class="px-3 sm:px-4 bg-transparent text-slate-500">或者</span>
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-2 sm:gap-4">
          <button class="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] text-xs sm:text-sm">
            <i class="fa-brands fa-qq text-blue-400 text-sm sm:text-base"></i>
            <span class="text-slate-300">QQ</span>
          </button>
          <button class="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] text-xs sm:text-sm">
            <i class="fa-brands fa-weixin text-green-400 text-sm sm:text-base"></i>
            <span class="text-slate-300">微信</span>
          </button>
          <button class="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] text-xs sm:text-sm">
            <i class="fa-solid fa-comment-dots text-orange-400 text-sm sm:text-base"></i>
            <span class="text-slate-300">短信</span>
          </button>
        </div>
      </div>
      
      <div class="text-center mt-4 sm:mt-8">
        <p class="text-xs sm:text-sm text-slate-400">已经有账号？</p>
        <button 
          @click="router.push('/login')" 
          class="text-accent hover:text-accent/80 font-semibold mt-1 sm:mt-2 transition-colors inline-flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-base"
        >
          立即登录
          <i class="fa-solid fa-arrow-right text-xs sm:text-base transition-transform group-hover:translate-x-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>