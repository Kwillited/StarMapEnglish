import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
const Dashboard = () => import('../views/Dashboard.vue');
const Vocabulary = () => import('../views/Vocabulary.vue');
const Reading = () => import('../views/Reading.vue');
const Listening = () => import('../views/Listening.vue');
const Writing = () => import('../views/Writing.vue');
const Settings = () => import('../views/Settings.vue');

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/vocabulary',
      name: 'Vocabulary',
      component: Vocabulary
    },
    {
      path: '/reading',
      name: 'Reading',
      component: Reading
    },
    {
      path: '/listening',
      name: 'Listening',
      component: Listening
    },
    {
      path: '/writing',
      name: 'Writing',
      component: Writing
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
});

export default router;
