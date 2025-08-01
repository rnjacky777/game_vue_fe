import api from '../services/axios';

// 根據新的 API 回應格式定義的角色介面
export interface UserCharacter {
  user_char_id: number;
  char_temp_id: number;
  name: string;
  level: number;
  position: number;
  image_sm_url: string;
}

/**
 * 獲取登入使用者的所有角色
 * @returns Promise<UserCharacter[]> - 角色陣列的 Promise
 */
export async function getAllCharacters(): Promise<UserCharacter[]> {
  try {
    // 使用 pre-configured axios instance，它會自動加上 Authorization header
    const response = await api.get<UserCharacter[]>('/user/chars');
    return response.data;
  } catch (error) {
    console.error('獲取角色列表失敗:', error);
    // 讓呼叫者可以處理這個錯誤，例如顯示錯誤訊息給使用者
    throw error;
  }
}

/**
 * 獲取登入使用者的隊伍
 * @returns Promise<UserCharacter[]> - 隊伍角色陣列的 Promise
 */
export async function getUserTeams(): Promise<UserCharacter[]> {
  try {
    // 使用 pre-configured axios instance，它會自動加上 Authorization header
    const response = await api.get<UserCharacter[]>('/user/teams');
    return response.data;
  } catch (error) {
    console.error('獲取隊伍列表失敗:', error);
    throw error;
  }
}
