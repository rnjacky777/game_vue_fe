<script setup lang="ts">
import { useRouter } from 'vue-router';

// 取得 Vue Router 的實例，等同於 React 的 useNavigate
const router = useRouter();

// 導航到登入頁面的函式
const goToLogin = () => {
  router.push('/login');
};

// 導航到註冊頁面的函式
const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="home-container">
    <h3 class="title">歡迎來到冒險之旅</h3>
    <h6 class="subtitle">請選擇登入或註冊以開始你的冒險！</h6>

    <div class="button-group">
      <button class="btn btn-primary" @click="goToLogin">
        登入
      </button>

      <button class="btn btn-outlined" @click="goToRegister">
        註冊
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* 確保容器佔滿整個視窗寬度 */
  background: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
  text-align: center;
  padding: 24px;
  box-sizing: border-box; /* 確保 padding 不會影響總寬高 */
}

.title {
  /* MUI Typography variant="h3" 的預設樣式 */
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 24px; /* sx={{ marginBottom: 3 }} */
  color: #01579b;
}

.subtitle {
  /* MUI Typography variant="h6" 的預設樣式 */
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 40px; /* sx={{ marginBottom: 5 }} */
  color: #0277bd;
}

.button-group {
  display: flex;
  gap: 24px; /* sx={{ gap: 3 }} */
}

.btn {
  padding: 12px 28px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s, border-color 0.2s;
  font-family: inherit;
}

.btn-primary {
  background-color: #0288d1; /* MUI primary color */
  color: white;
  border: 1px solid transparent;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12); /* MUI boxShadow: 4 */
}

.btn-primary:hover {
  background-color: #0277bd; /* MUI hover color */
  transform: scale(1.05);
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12); /* MUI boxShadow: 6 */
}

.btn-outlined {
  background-color: transparent;
  color: #0288d1; /* MUI primary color */
  border: 1px solid #0288d1;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12); /* MUI boxShadow: 2 */
}

.btn-outlined:hover {
  background-color: #b3e5fc;
  transform: scale(1.05);
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12); /* MUI boxShadow: 4 */
}

.btn:focus,
.btn:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
