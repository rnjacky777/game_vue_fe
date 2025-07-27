import { ref } from 'vue';
import { defineStore } from 'pinia';

// 依照慣例，store 的命名會使用 `use` 作為前綴，並以 `Store` 結尾。
// `defineStore` 的第一個參數是 store 在您應用程式中的唯一 ID。
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<any | null>(null);
  const isLoading = ref(true);

  // Actions
  function setUser(newUser: any) {
    user.value = newUser;
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function clearUser() {
    user.value = null;
  }

  return { user, isLoading, setUser, setLoading, clearUser };
});

