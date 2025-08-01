<template>
  <div class="character-list-container">
    <div v-if="store.loading" class="loading">正在載入角色資料...</div>
    <div v-else-if="store.error" class="error-message">
      無法載入角色資料：{{ store.error.message }}
    </div>
    <div v-else-if="store.characters.length === 0" class="no-characters">
      您尚未擁有任何角色。
    </div>
    <div v-else class="grid">
      <div
        v-for="char in store.characters"
        :key="char.user_char_id"
        class="character-card"
      >
        <img
          :src="char.image_sm_url"
          alt="角色圖"
          class="character-image"
          loading="lazy"
        />
        <div class="character-name">{{ char.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted } from 'vue';
import { useCharacterStore } from '../../stores/characters';


const store = useCharacterStore();

onMounted(async () => {
  await store.fetchCharacters();
});
</script>

<style scoped>
.character-list-container {
  padding: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
.character-card:hover {
  transform: scale(1.02);
}

.character-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 6px;
}

.character-name {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  color: #333;
}
</style>
