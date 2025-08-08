<template>
  <div v-if="userStore.isLoading" class="loading-container">
    正在載入...
  </div>
  <div v-else class="game-page-container">
    <header class="header">{{ headerTitle }}</header>
    <div class="game-interface-content">
      <router-view />
    </div>
    <nav class="navbar">
      <router-link to="/game/character_list" class="nav-item">
        <span class="icon">👥</span>
        <span class="label">角色列表</span>
      </router-link>
      <router-link to="/game/empty" class="nav-item">
        <span class="icon">📝</span>
        <span class="label">任務</span>
      </router-link>
      <router-link to="/game/explore" class="nav-item">
        <span class="icon">🗺️</span>
        <span class="label">探險</span>
      </router-link>
      <router-link to="/game/userinfo" class="nav-item">
        <span class="icon">🙋‍♂️</span>
        <span class="label">自己</span>
      </router-link>
      <router-link to="/game/settings" class="nav-item">
        <span class="icon">⚙️</span>
        <span class="label">設定</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// 根據當前路由計算標題
const headerTitle = computed(() => {
  const pathTitles: { [key: string]: string } = {
    "/game/explore": "探索頁面",
    "/game": "探索頁面",
    "/game/settings": "設定頁面",
    "/game/character_list": "角色列表",
    "/game/userinfo": "用戶資訊",
  };
  return pathTitles[route.path] || "遊戲主頁";
});

// 元件掛載時檢查 token 並獲取用戶資訊
onMounted(() => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    router.push("/login");
  } else {
    axios.get("https://amon777.ddns.net/game:8001/api/auth/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      userStore.setUser(res.data); // 使用 store action
      userStore.setLoading(false); // 使用 store action
    })
    .catch((err) => {
      console.error("獲取用戶資訊失敗:", err);
      sessionStorage.removeItem("token");
      userStore.setLoading(false); // 確保錯誤時也更新載入狀態
      router.push("/login");
    });
  }
});
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.game-page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #fdfdfd; /* 給頁面一個淺色背景 */
}

.header {
  /* 您的標頭樣式 */
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.game-interface-content {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
}

.navbar {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  background-color: #fff;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  text-decoration: none;
  color: #666;
}

.nav-item .icon {
  font-size: 24px;
}

.nav-item .label {
  font-size: 12px;
  margin-top: 4px;
}

/* Vue Router 會自動為當前 active 的連結添加這個 class */
.router-link-exact-active {
  color: #1976d2; /* Active 顏色 */
}
</style>
