import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
const Dashboard = () => import('../desktop/views/Dashboard.vue');
const MobileHome = () => import('../mobile/views/Home.vue');
const MobileVocabulary = () => import('../mobile/views/Vocabulary.vue');
const DesktopVocabulary = () => import('../desktop/views/Vocabulary.vue');
const VocabularyWrapper = () => import('../shared/views/VocabularyWrapper.vue');
const Review = () => import('../mobile/views/Review.vue');
const Study = () => import('../mobile/views/Study.vue');
const Test = () => import('../mobile/views/Test.vue');
const Reading = () => import('../desktop/views/Reading.vue');
const ReadingMobile = () => import('../mobile/views/ReadingMobile.vue');
const ArticleDetail = () => import('../mobile/views/ArticleDetail.vue'); // 移动端文章详情页
const Listening = () => import('../desktop/views/ListeningDesktop.vue');
const ListeningMobile = () => import('../mobile/views/ListeningMobile.vue');
const ListeningDetail = () => import('../mobile/views/ListeningDetail.vue'); // 移动端听力详情页
const Writing = () => import('../desktop/views/Writing.vue');
const WritingMobile = () => import('../mobile/views/WritingMobile.vue');
const WritingDetail = () => import('../mobile/views/WritingDetail.vue'); // 移动端写作详情页
const Settings = () => import('../desktop/views/Settings.vue'); // 桌面端设置（带选项卡）
const MobileSettings = () => import('../mobile/views/Settings.vue'); // 移动端设置（带菜单）
// 设置二级页面
const ProfileSettings = () => import('../mobile/views/settings/ProfileSettings.vue');
const VocabularySettings = () => import('../mobile/views/settings/VocabularySettings.vue');
const ReadingSettings = () => import('../mobile/views/settings/ReadingSettings.vue');
const ListeningSettings = () => import('../mobile/views/settings/ListeningSettings.vue');
const WritingSettings = () => import('../mobile/views/settings/WritingSettings.vue');
const GeneralSettings = () => import('../mobile/views/settings/GeneralSettings.vue');
const Login = () => import('../shared/views/Login.vue');
const Register = () => import('../shared/views/Register.vue');

// 通用路由守卫：根据设备类型选择不同的页面
const deviceGuard = (to, from, next) => {
  const isMobile = window.innerWidth <= 768;
  
  // 根据不同的路径处理不同的重定向逻辑
  switch (to.path) {
    case '/':
      // 根路径根据设备类型重定向到不同的首页
      if (isMobile) {
        next('/home/mobile');
      } else {
        // 桌面端直接显示，避免无限循环
        next();
      }
      break;
    case '/settings':
      next(isMobile ? '/settings/mobile' : undefined);
      break;
    case '/vocabulary':
      next(isMobile ? '/vocabulary/mobile' : '/vocabulary/desktop');
      break;
    default:
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
    { path: '/register', name: 'Register', component: Register },
    { 
      path: '/', 
      name: 'Dashboard', 
      component: Dashboard, 
      beforeEnter: deviceGuard 
    },
    { 
      path: '/home/mobile', 
      name: 'MobileHome', 
      component: MobileHome 
    },
    { 
      path: '/vocabulary', 
      name: 'Vocabulary', 
      component: VocabularyWrapper, 
      beforeEnter: deviceGuard 
    },
    { path: '/vocabulary/desktop', name: 'DesktopVocabulary', component: DesktopVocabulary },
    { path: '/vocabulary/mobile', name: 'MobileVocabulary', component: MobileVocabulary },
    { path: '/review', name: 'Review', component: Review },
    { path: '/study', name: 'Study', component: Study },
    { path: '/test', name: 'Test', component: Test },
    { path: '/reading', name: 'Reading', component: Reading },
    { path: '/listening', name: 'Listening', component: Listening },
    { path: '/listening/mobile', name: 'ListeningMobile', component: ListeningMobile },
    { path: '/reading/mobile', name: 'ReadingMobile', component: ReadingMobile },
    { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/listening/:id', name: 'ListeningDetail', component: ListeningDetail },
    { path: '/writing', name: 'Writing', component: Writing },
    { path: '/writing/mobile', name: 'WritingMobile', component: WritingMobile },
    { path: '/writing/:id', name: 'WritingDetail', component: WritingDetail },
    { 
      path: '/settings', 
      name: 'Settings', 
      component: Settings, 
      beforeEnter: deviceGuard 
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