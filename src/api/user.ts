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

// 根據您的使用者資訊 API 回應格式定義的介面
export interface UserInfo {
  id: number;
  username: string;
  user_data: {
    money: number;
    current_map: {
      name: string;
    };
    current_area: {
      name: string;
    };
  };
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

/**
 * 更新使用者的隊伍
 * @param char_ids - 角色 ID 陣列
 * @returns Promise<UserCharacter[]> - 更新後隊伍角色陣列的 Promise
 */
export async function updateUserTeams(char_ids: number[]): Promise<UserCharacter[]> {
  try {
    const response = await api.post<UserCharacter[]>('/user/teams', { char_ids });
    return response.data;
  } catch (error) {
    console.error('更新隊伍失敗:', error);
    throw error;
  }
}

/**
 * 獲取當前登入使用者的資訊
 * @returns Promise<UserInfo> - 使用者資訊的 Promise
 */
export async function fetchUserInfo(): Promise<UserInfo> {
  try {
    // Axios 攔截器會自動加上 token，所以這裡不需要手動傳遞
    const response = await api.get<UserInfo>('/auth/userinfo');
    return response.data;
  } catch (error) {
    console.error('獲取使用者資訊失敗:', error);
    // 讓呼叫者可以處理這個錯誤
    throw error;
  }
}