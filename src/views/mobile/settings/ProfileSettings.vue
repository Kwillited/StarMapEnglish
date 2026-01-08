<script setup>
// 个人信息设置页面
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../../stores/userStore.js';

// 使用用户状态 Pinia store
const userStore = useUserStore();

// 加载状态
const isLoading = ref(true);
const saveMessage = ref('');

// 用于表单绑定的临时数据
const formData = ref({
  username: '',
  phone: '',
  exam_type: ''
});

// 保存个人信息到后端
const saveUserProfile = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userStore.userInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });
    
    if (response.ok) {
      // 更新 Pinia store 中的用户信息
      userStore.updateUserInfo(formData.value);
      saveMessage.value = '个人信息保存成功！';
      setTimeout(() => {
        saveMessage.value = '';
      }, 3000);
    } else {
      saveMessage.value = '保存失败，请重试';
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    saveMessage.value = '保存失败，请检查网络连接';
  }
};

// 从后端获取个人信息
const fetchUserProfile = async () => {
  try {
    // 使用 Pinia store 的方法从后端获取用户信息
    await userStore.fetchUserInfo();
    // 更新表单数据
    formData.value = {
      username: userStore.userInfo.username,
      phone: userStore.userInfo.phone,
      exam_type: userStore.userInfo.exam_type
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
  } finally {
    isLoading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(async () => {
  await fetchUserProfile();
});
</script>

<template>
  <div class="space-y-4">
    <!-- 页面顶部 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <h3 class="text-lg font-semibold text-white">个人信息</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
      
      <!-- 保存消息 -->
      <div v-if="saveMessage" class="text-sm text-green-400 flex items-center justify-center">
        <i class="fa-solid fa-check-circle mr-1"></i>
        {{ saveMessage }}
      </div>
    </div>
    
    <!-- 个人信息卡片 -->
    <div class="glass-card bg-slate-800/50 p-4 rounded-lg mx-4">
      <h3 class="text-lg font-semibold text-white mb-3">个人信息</h3>
      <div class="space-y-3">
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">用户名</label>
          <input type="text" v-model="formData.username" class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white flex-1" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">手机号</label>
          <input type="tel" v-model="formData.phone" class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white flex-1" placeholder="13800138000" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">考试类型</label>
          <select v-model="formData.exam_type" class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white flex-1">
            <option>2026考研英语一</option>
            <option>2026考研英语二</option>
            <option>大学英语四级</option>
            <option>大学英语六级</option>
            <option>托福</option>
            <option>雅思</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="saveUserProfile" class="bg-vocab hover:bg-vocab/90 text-white px-4 py-2 rounded-full transition-colors text-sm">
            <i class="fa-solid fa-save mr-1"></i>
            保存修改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>