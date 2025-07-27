import api from '../services/axios';
import type { AxiosResponse } from 'axios';

// 建議為您的 API 回應定義介面以獲得更好的類型安全性
interface LoginResponse {
  access_token: string;
  token_type: string;
  // 您可以根據後端的回應添加其他欄位
}

interface RegisterResponse {
  // 根據您的後端註冊成功後回傳的資料結構定義
  message: string;
  // 例如： user: { id: string; username: string; }
}

/**
 * 登入使用者
 * @param username - 使用者名稱
 * @param password - 密碼
 * @returns 包含 access_token 的 Promise
 */
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> = await api.post('/auth/login', { username, password });
  return res.data;
};

export const registerUser = async (username: string, password: string): Promise<RegisterResponse> => {
  const response: AxiosResponse<RegisterResponse> = await api.post('/auth/register', { username, password });
  return response.data;
};
