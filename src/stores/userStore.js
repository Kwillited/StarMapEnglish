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
    }
    // isAuthenticated 状态已移除，未使用
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
    
    // fetchUserInfo 方法已移除，调用不存在的 API 端点
    // login 方法已移除，未使用
    // logout 方法已移除，未使用
  }
});
