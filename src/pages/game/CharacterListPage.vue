<template>
  <div class="character-list-container">
    <div v-if="loading" class="loading">正在載入角色資料...</div>
    <div v-else-if="error" class="error-message">
      無法載入角色資料：{{ error.message }}
    </div>
    <div v-else-if="characters.length === 0" class="no-characters">
      您尚未擁有任何角色。
    </div>
    <div v-else class="grid">
      <div
        v-for="char in characters"
        :key="char.id"
        class="character-card"
      >
        <img
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jacky"
          alt="角色圖"
          class="character-image"
          loading="lazy"
        />
        <!-- :src="char.template.image" will imprement in furture-->
        <div class="character-name">{{ char.template.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllCharacters, type Character } from '../../api/user';

const characters = ref<Character[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);

onMounted(async () => {
  try {
    characters.value = await getAllCharacters();
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
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
