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
      <div v-for="char in characters" :key="char.id" class="character-card">
        <div class="card-header">
          <h3>{{ char.template.name }}</h3>
          <span class="level">Lv. {{ char.level }}</span>
        </div>
        <div class="card-body">
          <p>HP: {{ char.hp }} / MP: {{ char.mp }}</p>
          <p>攻擊: {{ char.atk }} / 防禦: {{ char.def }} / 速度: {{ char.spd }}</p>
        </div>
        <div class="card-footer">
          <p class="rarity">稀有度: {{ '★'.repeat(char.template.rarity) }}</p>
        </div>
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
  padding: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.character-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 12px;
}
.character-card h3 {
  margin: 0;
  font-size: 1.2rem;
}
.card-body p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #555;
}
.card-footer {
  margin-top: 12px;
  text-align: right;
}
.rarity {
  margin: 0;
  color: #f59e0b; /* A gold-like color */
  font-weight: bold;
}
.logout-button:hover {
  background-color: #b71c1c;
}
</style>
