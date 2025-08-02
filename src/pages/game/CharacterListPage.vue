<template>
  <div class="character-list-container">
    <div class="header">
      <h2 class="title">角色列表</h2>
      <button class="mode-toggle" @click="toggleEditMode">
        {{ isEditMode ? '離開編隊' : '編隊模式' }}
      </button>
    </div>

    <!-- 編隊區（編隊模式才出現） -->
    <div v-if="isEditMode" class="team-editor">
      <div class="team-label">當前隊伍（最多 6 人）</div>
      <div class="team-slots">
        <div
          v-for="slot in 6"
          :key="slot"
          class="slot"
          :class="{ filled: !!team[slot - 1] }"
        >
          <template v-if="team[slot - 1]">
            <div class="slot-content">
              <div class="name">
                {{ getCharacterName(team[slot - 1]) }}
              </div>
              <button class="remove-btn" @click="removeFromTeam(team[slot - 1])">
                ✕
              </button>
            </div>
          </template>
          <template v-else>
            <div class="empty">空位</div>
          </template>
        </div>
      </div>
      <div class="team-hint">
        已選 {{ team.length }} / 6 人。{{ team.length === 6 ? '已滿' : `還可加 ${6 - team.length} 人` }}
      </div>
      <div class="actions">
        <button class="save-btn" :disabled="saving" @click="saveTeam">
          {{ saving ? '儲存中...' : '儲存隊伍' }}
        </button>
        <button class="clear-btn" @click="clearTeam">清空</button>
      </div>
    </div>

    <!-- 資料狀態 -->
    <div v-if="store.loading" class="loading">正在載入角色資料...</div>
    <div v-else-if="store.error" class="error-message">
      無法載入角色資料：{{ store.error.message }}
    </div>
    <div v-else-if="store.characters.length === 0" class="no-characters">
      您尚未擁有任何角色。
    </div>

    <!-- 角色 Grid -->
    <div v-else class="grid">
      <div
        v-for="char in store.characters"
        :key="char.user_char_id"
        class="character-card"
        :class="{ selected: isInTeam(char.user_char_id) }"
        @click="onCharacterClick(char.user_char_id)"
      >
        <div class="image-wrapper">
          <img
            :src="char.image_sm_url"
            alt="角色圖"
            class="character-image"
            loading="lazy"
          />
          <div v-if="isInTeam(char.user_char_id)" class="badge">已選</div>
        </div>
        <div class="character-name">{{ char.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useCharacterStore } from '../../stores/characters';

const store = useCharacterStore();

const isEditMode = ref(false);
// 只儲存隊伍中角色的 ID
const team = ref<number[]>([]);
const saving = ref(false);

onMounted(async () => {
  // 元件掛載時，同時獲取角色與當前隊伍
  await Promise.all([store.fetchCharacters(), store.fetchTeams()]);
});

// 監聽 store.teams 的變化，並同步到本地的 team 狀態
// 這會在隊伍被獲取或更新後，自動更新本地隊伍
watch(
  () => store.teams,
  (newTeams) => {
    team.value = newTeams.map((c) => c.user_char_id);
  },
  { deep: true, immediate: true },
);

function toggleEditMode() {
  isEditMode.value = !isEditMode.value;
  // 如果是取消編輯，則將隊伍重置回 store 中的狀態
  if (!isEditMode.value) {
    team.value = store.teams.map((c) => c.user_char_id);
  }
}

function isInTeam(id: number) {
  return team.value.includes(id);
}

function onCharacterClick(id: number) {
  if (!isEditMode.value) return;
  if (isInTeam(id)) {
    removeFromTeam(id);
  } else {
    addToTeam(id);
  }
}

function addToTeam(id: number) {
  if (team.value.length >= 6) return;
  if (!isInTeam(id)) {
    team.value.push(id);
  }
}

function removeFromTeam(id: number) {
  team.value = team.value.filter((x) => x !== id);
}

function clearTeam() {
  team.value = [];
}

function getCharacterName(id: number) {
  const c = store.characters.find((c) => c.user_char_id === id);
  return c ? c.name : '未知角色';
}

async function saveTeam() {
  if (saving.value) return;
  saving.value = true;
  try {
    // 呼叫 store action 來更新隊伍
    await store.updateTeams(team.value);
    // watcher 會自動用 API 回應來更新本地的 `team` ref
    isEditMode.value = false; // 成功後離開編輯模式
  } catch (e) {
    console.error('儲存隊伍失敗', e);
    // 可選：向使用者顯示錯誤訊息
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.character-list-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.mode-toggle {
  padding: 6px 12px;
  background-color: #1f6feb;
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.85rem;
}
.mode-toggle:hover {
  filter: brightness(1.1);
}

/* team editor */
.team-editor {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  background: #f9fbfd;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.team-label {
  font-weight: 600;
}
.team-slots {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.slot {
  flex: 1 1 calc(16.66% - 8px);
  min-width: 80px;
  height: 60px;
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slot.filled {
  border-style: solid;
  border-color: #7c3aed;
}
.slot-content {
  display: flex;
  align-items: center;
  gap: 4px;
}
.name {
  font-size: 0.75rem;
  font-weight: 600;
}
.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px 6px;
  line-height: 1;
}
.empty {
  font-size: 0.6rem;
  color: #94a3b8;
}
.team-hint {
  font-size: 0.75rem;
  color: #475569;
}
.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.save-btn {
  padding: 6px 14px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
}
.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.clear-btn {
  padding: 6px 14px;
  background: #f3f4f6;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  cursor: pointer;
}

/* grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

/* card */
.character-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform 0.2s, border-color 0.2s;
  cursor: pointer;
}
.character-card:hover {
  transform: scale(1.02);
}
.character-card.selected {
  border-color: #7c3aed;
}
.image-wrapper {
  position: relative;
}
.character-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 6px;
}
.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #7c3aed;
  color: white;
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 0.55rem;
  font-weight: 600;
}
.character-name {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  color: #333;
  word-break: break-word;
}

/* status */
.loading,
.error-message,
.no-characters {
  padding: 12px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #334e68;
  font-size: 0.9rem;
}
.error-message {
  background: #ffe3e3;
  color: #a50000;
}
</style>
