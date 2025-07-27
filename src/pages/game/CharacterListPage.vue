<template>
  <div class="settings-container">
    <div class="settings-section">
      <h2>帳號設定</h2>
      <button @click="handleLogout" class="logout-button">登出</button>
    </div>

    <div class="settings-section">
      <h2>音效設定</h2>
      <div class="setting-item">
        <label for="volume">音量</label>
        <input type="range" id="volume" min="0" max="100" v-model="volume" />
        <span>{{ volume }}%</span>
      </div>
    </div>

    <div class="settings-section">
      <h2>一般設定</h2>
      <div class="setting-item">
        <label for="language">語言</label>
        <select id="language" v-model="language">
          <option value="zh-TW">繁體中文</option>
          <option value="en-US">English</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();

const volume = ref(80);
const language = ref('zh-TW');

const handleLogout = () => {
  // 清除 Pinia store 中的用戶狀態
  userStore.clearUser();
  // 清除 sessionStorage 中的 token
  sessionStorage.removeItem('token');
  // 導向到登入頁面
  router.push('/login');
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  color: #333;
  background-color: #fff;
  height: 100%;
}

.settings-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.settings-section:last-child {
  border-bottom: none;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.setting-item label {
  font-size: 1rem;
  width: 80px;
}

.setting-item input[type="range"] {
  flex-grow: 1;
  cursor: pointer;
}

.setting-item select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
}

.logout-button {
  padding: 10px 20px;
  background-color: #d32f2f; /* A red color for logout/danger actions */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #b71c1c;
}
</style>

