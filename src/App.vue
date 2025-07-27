<script setup lang="ts">
// 這個組件現在是路由的進入點，不需要其他邏輯
</script>

<template>
  <!-- router-view 會根據當前的 URL 路徑，動態地渲染對應的組件 -->
  <!-- 例如，訪問 '/' 時，這裡會顯示 TitlePage.vue 的內容 -->
  <router-view></router-view>
</template>

<style>
/* 您可以將全域樣式保留在此處，或像您的專案一樣放在 src/style.css 中 */
#app {
  /* 為了讓 TitlePage 的 100vh 生效，確保 #app 也佔滿螢幕 */
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
