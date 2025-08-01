// stores/characters.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllCharacters, type UserCharacter } from '../api/user';

export const useCharacterStore = defineStore('characters', () => {
  const characters = ref<UserCharacter[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const lastFetched = ref<number | null>(null);
  let inflightPromise: Promise<void> | null = null;
  const TTL = 60 * 1000; // 1 分鐘

  const needsRefresh = () => {
    if (!lastFetched.value) return true;
    return Date.now() - lastFetched.value > TTL;
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

  function invalidate() {
    lastFetched.value = null;
  }

  return {
    characters,
    loading,
    error,
    fetchCharacters,
    invalidate,
  };
});
