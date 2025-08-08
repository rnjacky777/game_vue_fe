<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../api/auth';

// --- State Management ---
// 使用 ref 來建立響應式狀態，等同於 React 的 useState
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// --- Routing ---
// 取得 Vue Router 的實例，等同於 React 的 useNavigate
const router = useRouter();

// --- Event Handlers ---
const handleSubmit = async () => {
  // 清除先前的錯誤訊息
  error.value = '';
  loading.value = true;
  try {
    // 呼叫登入 API
    const data = await loginUser(username.value, password.value);
    // 將 token 存儲在 sessionStorage
    sessionStorage.setItem('token', data.access_token);
    // 導航到遊戲頁面
    router.push('/main');
  } catch (err) {
    console.error(err);
    error.value = '❌ 登入失敗，請檢查用戶名與密碼。';
  } finally {
    loading.value = false;
  }
};

const goToHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="game-container">
    <header class="header">
      登入
      <button @click="goToHome" class="home-button" title="返回首頁">
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="#FFFFFF">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>
    </header>
    <div class="content">
      <form class="form-card" @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="username">用戶名</label>
          <input
            id="username"
            type="text"
            placeholder="請輸入用戶名"
            v-model="username"
            required
          />
        </div>
        <div class="form-field">
          <label for="password">密碼</label>
          <input
            id="password"
            type="password"
            placeholder="請輸入密碼"
            v-model="password"
            required
          />
        </div>

        <p v-if="error" class="error-message">
          {{ error }}
        </p>

        <button type="submit" class="submit-button" :disabled="loading">
          <div v-if="loading" class="spinner"></div>
          <span v-else>登入</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* GameContainer styles */
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #2a3a4a 0%, #1c2833 100%);
  color: white;
  padding-top: 60px;
}

/* Header styles */
.header {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #80deea;
}

.home-button {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.home-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Content styles */
.content {
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
}

/* FormCard styles */
.form-card {
  background-color: rgba(255, 255, 255, 0.08);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* FormField styles */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field label {
  font-size: 1rem;
  color: #e0f7fa;
  text-align: left;
}

.form-field input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #80deea;
  background-color: #263238;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-field input::placeholder {
  color: #90a4ae;
}

.form-field input:focus {
  outline: none;
  border-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(128, 222, 234, 0.5);
}

/* Error message styles */
.error-message {
  color: #ff8a80; /* MUI error color */
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
}

/* Submit button styles */
.submit-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: #0288d1; /* MUI primary color */
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.submit-button:hover:not(:disabled) {
  background-color: #0277bd;
}

.submit-button:disabled {
  background-color: #546e7a;
  cursor: not-allowed;
}

/* Spinner styles */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
