// 用户状态管理
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: 1,
      name: '游客',
      username: '游客',
      phone: '',
      exam: '2026考研英语一',
      exam_type: '2026考研英语一',
      daysLeft: 186,
      energy: 85
    }
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
    }
  }
});