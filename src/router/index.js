import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
const Dashboard = () => import('../views/Dashboard.vue');
const Vocabulary = () => import('../views/VocabularyWrapper.vue');
const Review = () => import('../views/mobile/Review.vue');
const Study = () => import('../views/mobile/Study.vue');
const Test = () => import('../views/mobile/Test.vue');
const Reading = () => import('../views/Reading.vue');
const Listening = () => import('../views/ListeningDesktop.vue');
const ListeningMobile = () => import('../views/mobile/ListeningMobile.vue');
const Writing = () => import('../views/Writing.vue');
const Settings = () => import('../views/Settings.vue'); // 桌面端设置（带选项卡）
const MobileSettings = () => import('../views/mobile/Settings.vue'); // 移动端设置（带菜单）
// 设置二级页面
const ProfileSettings = () => import('../views/mobile/settings/ProfileSettings.vue');
const VocabularySettings = () => import('../views/mobile/settings/VocabularySettings.vue');
const ReadingSettings = () => import('../views/mobile/settings/ReadingSettings.vue');
const ListeningSettings = () => import('../views/mobile/settings/ListeningSettings.vue');
const WritingSettings = () => import('../views/mobile/settings/WritingSettings.vue');
const GeneralSettings = () => import('../views/mobile/settings/GeneralSettings.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');

// 路由守卫：根据设备类型选择不同的设置页面
const settingsGuard = (to, from, next) => {
  const isMobile = window.innerWidth <= 768;
  if (to.path === '/settings' && isMobile) {
    next('/settings/mobile');
  } else {
    next();
  }
};

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
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
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/study',
      name: 'Study',
      component: Study
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
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
      path: '/listening/mobile',
      name: 'ListeningMobile',
      component: ListeningMobile
    },
    {
      path: '/writing',
      name: 'Writing',
      component: Writing
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: settingsGuard
    },
    {
      path: '/settings/mobile',
      name: 'MobileSettings',
      component: MobileSettings
    },
    // 桌面端子路由
    { path: '/settings/profile', name: 'ProfileSettings', component: ProfileSettings },
    { path: '/settings/vocabulary', name: 'VocabularySettings', component: VocabularySettings },
    { path: '/settings/reading', name: 'ReadingSettings', component: ReadingSettings },
    { path: '/settings/listening', name: 'ListeningSettings', component: ListeningSettings },
    { path: '/settings/writing', name: 'WritingSettings', component: WritingSettings },
    { path: '/settings/general', name: 'GeneralSettings', component: GeneralSettings },
    
    // 移动端子路由 - 带独立前缀
    { path: '/settings/mobile/profile', name: 'MobileProfileSettings', component: ProfileSettings },
    { path: '/settings/mobile/vocabulary', name: 'MobileVocabularySettings', component: VocabularySettings },
    { path: '/settings/mobile/reading', name: 'MobileReadingSettings', component: ReadingSettings },
    { path: '/settings/mobile/listening', name: 'MobileListeningSettings', component: ListeningSettings },
    { path: '/settings/mobile/writing', name: 'MobileWritingSettings', component: WritingSettings },
    { path: '/settings/mobile/general', name: 'MobileGeneralSettings', component: GeneralSettings }
  ]
});

export default router;
