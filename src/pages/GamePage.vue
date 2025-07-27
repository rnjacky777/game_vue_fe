<template>
  <div v-if="isLoading" class="loading-container">
    正在載入...
  </div>
  <GameContainer v-else>
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
      <router-link to="/game/explore" class="nav-item">
        <span class="icon">✨</span>
        <span class="label">探險2</span>
      </router-link>
      <router-link to="/game/settings" class="nav-item">
        <span class="icon">⚙️</span>
        <span class="label">設定</span>
      </router-link>
    </nav>
  </GameContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import GameContainer from '../components/common/GameContainer/GameContainer.vue';
import { useUser } from '../context/UserContext'; // 假設您有一個 User composable

const isLoading = ref(true);
const { setUser } = useUser();
const router = useRouter();
const route = useRoute();

// 根據當前路由計算標題
const headerTitle = computed(() => {
  const pathTitles: { [key: string]: string } = {
    "/game/explore": "探索頁面",
    "/game": "探索頁面",
    "/game/settings": "設定頁面",
    "/game/character_list": "角色列表",
  };
  return pathTitles[route.path] || "遊戲主頁";
});

// 元件掛載時檢查 token 並獲取用戶資訊
onMounted(() => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    router.push("/login");
  } else {
    axios.get("http://127.0.0.1:8000/api/auth/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUser(res.data); // 重新設回 user
      isLoading.value = false; // 載入完成
    })
    .catch((err) => {
      console.error("獲取用戶資訊失敗:", err);
      sessionStorage.removeItem("token");
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
