import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import TitlePage from '../pages/TitlePage.vue';
import GamePage from '../pages/GamePage.vue';
import CharacterListPage from '../pages/game/CharacterListPage.vue';
import EmptyPage from '../pages/game/EmptyPage.vue';
import ExplorePage from '../pages/game/ExplorePage.vue';
import SettingsPage from '../pages/game/SettingsPage.vue';
import UserInfoPage from '../pages/game/UserInfoPage.vue';
// 定義您的路由
// 這裡我們將根路徑 ('/') 指向 TitlePage 組件
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: TitlePage,
  },
  // 為了讓 TitlePage 上的按鈕能正常運作，
  // 您可以先定義登入和註冊的路由佔位符
  {
    path: '/login',
    name: 'Login',
    // 建議使用延遲載入 (lazy-loading) 來優化效能
    // 這會為此路由生成一個獨立的 chunk (login.[hash].js)
    // 只有在訪問該路由時才會被載入
    component: () => import('../pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/RegisterPage.vue'), // 假設您有一個 RegisterPage.vue
  },
  // 新增遊戲主頁面路由
  {
    path: '/game',
    name: 'Game',
    component: GamePage,
    meta: { requiresAuth: true }, // 標記此路由需要驗證
    children: [
      {
        path: '',
        redirect: '/game/explore', // 預設子路由
      },
      {
        path: 'character_list',
        component: CharacterListPage,
      },
      {
        path: 'empty',
        component: EmptyPage,
      },
      {
        path: 'userinfo',
        component: UserInfoPage,
      },
      {
        path: 'explore',
        component: ExplorePage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

// 建立 router 實例
const router = createRouter({
  // 使用 HTML5 History 模式，讓網址看起來更簡潔 (例如 /login 而不是 /#/login)
  history: createWebHistory(),
  routes, // 傳入您定義的路由
});

// 新增導航守衛 (Navigation Guard)
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  const authRoutes = ['Login', 'Register'];

  // 如果使用者已登入，但想去登入或註冊頁，直接導向遊戲主頁
  if (authRoutes.includes(to.name as string) && isAuthenticated) {
    next({ name: 'Game' });
  }
  // 檢查目標路由是否需要驗證
  else if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要驗證但使用者未登入，則重定向到登入頁面
    next({ name: 'Login' });
  } else {
    // 否則，允許導航
    next();
  }
});

export default router;
