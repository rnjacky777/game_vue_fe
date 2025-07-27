import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import TitlePage from '../pages/TitlePage.vue';

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
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('../pages/RegisterPage.vue'), // 假設您有一個 RegisterPage.vue
  // },
];

// 建立 router 實例
const router = createRouter({
  // 使用 HTML5 History 模式，讓網址看起來更簡潔 (例如 /login 而不是 /#/login)
  history: createWebHistory(),
  routes, // 傳入您定義的路由
});

export default router;
