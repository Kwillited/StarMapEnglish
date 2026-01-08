<script setup>
// 个人资料设置页面组件
import { ref } from 'vue';

// 用户个人资料数据
const userProfile = ref({
  username: '游客',
  phone: '',
  exam: '2026考研英语一',
  exam_type: '2026考研英语一',
  daysLeft: 186
});

// 处理资料变更
const handleProfileChange = (field, value) => {
  userProfile.value[field] = value;
  console.log('更新个人资料:', field, value);
};
</script>

<template>
  <!-- 个人资料设置页面 -->
  <div class="space-y-4">
    <!-- 页面标题 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings/mobile" class="text-white hover:text-accent transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <div class="flex-1 text-center">
          <h2 class="text-xl font-bold text-white">个人资料</h2>
          <p class="text-slate-400 text-sm">管理您的个人信息</p>
        </div>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
    </div>

    <!-- 个人信息表单 -->
    <div class="space-y-3">
      <!-- 用户名 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">用户名</h3>
          <input 
            type="text" 
            v-model="userProfile.username"
            @input="handleProfileChange('username', $event.target.value)"
            placeholder="请输入用户名"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      <!-- 手机号 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">手机号</h3>
          <input 
            type="tel" 
            v-model="userProfile.phone"
            @input="handleProfileChange('phone', $event.target.value)"
            placeholder="请输入手机号"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      <!-- 考试类型 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">考试类型</h3>
          <select 
            v-model="userProfile.exam_type"
            @change="handleProfileChange('exam_type', $event.target.value)"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="2026考研英语一">2026考研英语一</option>
            <option value="2026考研英语二">2026考研英语二</option>
            <option value="CET4">CET4</option>
            <option value="CET6">CET6</option>
          </select>
        </div>
      </div>

      <!-- 剩余天数 -->
      <div class="glass-card p-4 rounded-xl">
        <div class="space-y-2">
          <h3 class="text-base font-medium text-white">考试剩余天数</h3>
          <input 
            type="number" 
            v-model="userProfile.daysLeft"
            @input="handleProfileChange('daysLeft', parseInt($event.target.value))"
            min="0"
            placeholder="请输入剩余天数"
            class="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <button class="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-lg transition-colors">
      保存资料
    </button>
  </div>
</template>