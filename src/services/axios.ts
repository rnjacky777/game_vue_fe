import axios from 'axios';

// 建立一個 Axios 實例
const api = axios.create({
  // 設置您的 API 基礎 URL
  // 例如：'http://localhost:3000/api'
  // 您可以將其存儲在 .env 文件中以獲得更好的靈活性
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api' || 'https://amon777.ddns.net/game',
  timeout: 5000, // 設置請求超時
  headers: {
    'Content-Type': 'application/json',
  },
});

// 您也可以添加請求攔截器來附加 JWT token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // 修正：從 sessionStorage 讀取 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加回應攔截器來處理常見錯誤
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 處理例如 401 未授權等錯誤
    if (error.response && error.response.status === 401) {
      // 可能需要重定向到登入頁面
      console.error('Unauthorized, redirecting to login.');
    }
    return Promise.reject(error);
  }
);

export default api;
