// stores/characters.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllCharacters, getUserTeams, updateUserTeams, type UserCharacter } from '../api/user';

export const useCharacterStore = defineStore('characters', () => {
  const characters = ref<UserCharacter[]>([]);
  const teams = ref<UserCharacter[]>([]);

  const loading = ref(false);
  const error = ref<Error | null>(null);
  const lastFetched = ref<number | null>(null);
  let inflightPromise: Promise<void> | null = null;

  const teamsLoading = ref(false);
  const teamsError = ref<Error | null>(null);
  const teamsLastFetched = ref<number | null>(null);
  let teamsInflightPromise: Promise<void> | null = null;

  const teamsUpdating = ref(false);
  const teamsUpdateError = ref<Error | null>(null);
  const TTL = 60 * 1000; // 1 分鐘

  const needsRefresh = () => {
    if (!lastFetched.value) return true;
    return Date.now() - lastFetched.value > TTL;
  };

  const teamsNeedsRefresh = () => {
    if (!teamsLastFetched.value) return true;
    return Date.now() - teamsLastFetched.value > TTL;
  };

  async function fetchCharacters(force = false) {
    if (!force && !needsRefresh() && characters.value.length > 0) {
      return; // 仍在有效期限內、已有資料
    }
    if (inflightPromise) {
      // 同時多個呼叫共用一個進行中的 request
      return inflightPromise;
    }
    loading.value = true;
    error.value = null;
    inflightPromise = (async () => {
      try {
        const data = await getAllCharacters();
        characters.value = data;
        lastFetched.value = Date.now();
      } catch (err) {
        error.value = err as Error;
      } finally {
        loading.value = false;
        inflightPromise = null;
      }
    })();
    return inflightPromise;
  }

  async function fetchTeams(force = false) {
    if (!force && !teamsNeedsRefresh() && teams.value.length > 0) {
      return;
    }
    if (teamsInflightPromise) {
      return teamsInflightPromise;
    }
    teamsLoading.value = true;
    teamsError.value = null;
    teamsInflightPromise = (async () => {
      try {
        const data = await getUserTeams();
        teams.value = data;
        teamsLastFetched.value = Date.now();
      } catch (err) {
        teamsError.value = err as Error;
      } finally {
        teamsLoading.value = false;
        teamsInflightPromise = null;
      }
    })();
    return teamsInflightPromise;
  }

  async function updateTeams(charIds: number[]) {
    teamsUpdating.value = true;
    teamsUpdateError.value = null;
    try {
      const data = await updateUserTeams(charIds);
      // API 回傳更新後的隊伍，直接用它來更新狀態
      teams.value = data;
      // 同時更新 fetch 時間戳，避免不必要的重新獲取
      teamsLastFetched.value = Date.now();
    } catch (err) {
      teamsUpdateError.value = err as Error;
      throw err; // 讓呼叫者可以處理錯誤
    } finally {
      teamsUpdating.value = false;
    }
  }

  function invalidate() {
    lastFetched.value = null;
    teamsLastFetched.value = null;
  }

  return {
    characters,
    loading,
    error,
    teams,
    teamsLoading,
    teamsError,
    teamsUpdating,
    teamsUpdateError,
    fetchCharacters,
    fetchTeams,
    updateTeams,
    invalidate,
  };
});
