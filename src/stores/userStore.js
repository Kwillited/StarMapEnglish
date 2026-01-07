// 用户状态管理
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: 1,
      name: 'Alex',
      username: 'Alex',
      phone: '',
      exam: '2026考研英语一',
      exam_type: '2026考研英语一',
      daysLeft: 186,
      energy: 85
    },
    isAuthenticated: true
  }),
  
  actions: {
    // 更新用户信息
    updateUserInfo(newInfo) {
      this.userInfo = {
        ...this.userInfo,
        ...newInfo,
        // 确保 name 和 exam 字段与 username 和 exam_type 保持一致
        name: newInfo.username || this.userInfo.name,
        exam: newInfo.exam_type || this.userInfo.exam
      };
    },
    
    // 从后端获取用户信息
    async fetchUserInfo() {
      try {
        const response = await fetch('http://localhost:3000/api/current-user');
        if (response.ok) {
          const data = await response.json();
          this.updateUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    
    // 登录
    login(userData) {
      this.userInfo = {
        ...this.userInfo,
        ...userData,
        name: userData.username,
        exam: userData.exam_type
      };
      this.isAuthenticated = true;
    },
    
    // 登出
    logout() {
      this.userInfo = {
        id: 0,
        name: '',
        username: '',
        phone: '',
        exam: '',
        exam_type: '',
        daysLeft: 0,
        energy: 0
      };
      this.isAuthenticated = false;
    }
  }
});
