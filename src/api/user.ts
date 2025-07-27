import api from '../services/axios';
export interface CharacterTemplate {
  id: number;
  name: string;
  rarity: number;
  description: string;
  base_hp: number;
  base_mp: number;
  base_atk: number;
  base_spd: number;
  base_def: number;
}

export interface Character {
  id: number;
  level: number;
  exp: number;
  hp: number;
  mp: number;
  atk: number;
  spd: number;
  def: number;
  status_effects: Record<string, any>;
  is_locked: boolean;
  template: CharacterTemplate;
}
/**
 * 獲取登入使用者的所有角色
 * @returns Promise<Character[]> - 角色陣列的 Promise
 */
export async function getAllCharacters(): Promise<Character[]> {
  try {
    // 使用 pre-configured axios instance，它會自動加上 Authorization header
    const response = await api.get<Character[]>('/user/chars');
    return response.data;
  } catch (error) {
    console.error('獲取角色列表失敗:', error);
    // 讓呼叫者可以處理這個錯誤，例如顯示錯誤訊息給使用者
    throw error;
  }
}

