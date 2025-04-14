import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExploreLayout from "../components/explore/ExploreLayout/ExploreLayout";
import ExploreButton from "../components/explore/ExploreButton/ExploreButton";
import ExploreResultCard from "../components/explore/ExploreResultCard/ExploreResultCard";
import BattleAnimation from "../components/battle/BattleAnimation/BattleAnimation";
import MapButton from "../components/explore/MapButton"
import MapModal from "../components/explore/MapModal"
import NpcButton from "../components/explore/NpcButton"
import NpcModal from "../components/explore/NpcModal"
import styles from "./Explore.module.css";


// 假資料來源（建議可放在獨立檔案）
const mockApiFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isBattle = Math.random() < 0.5;
      if (isBattle) {
        resolve({
          "type": "battle",
          "texts": [
            "你走進古老神殿，一股黑氣撲面而來…",
            "一隻魔化戰士出現在你面前，戰鬥開始！"
          ],
          "teams": {
            "A": [
              {
                "id": "hero_1",
                "name": "劍士艾倫",
                "hp": 500,
                "max_hp": 500,
                "mp": 100,
                "max_mp": 100,
                "avatar": "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                "row": "front"
              },
              {
                "id": "hero_2",
                "name": "法師莉娜",
                "hp": 400,
                "max_hp": 400,
                "mp": 120,
                "max_mp": 120,
                "avatar": "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                "row": "back"
              }
            ],
            "B": [
              {
                "id": "enemy_1",
                "name": "魔化戰士",
                "hp": 500,
                "max_hp": 500,
                "mp": 50,
                "max_mp": 50,
                "avatar": "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                "row": "front"
              },
              {
                "id": "enemy_2",
                "name": "魔化弓手",
                "hp": 500,
                "max_hp": 500,
                "mp": 60,
                "max_mp": 60,
                "avatar": "https://cdn-icons-png.flaticon.com/512/809/809957.png",
                "row": "back"
              }
            ]
          },
          "result": "你成功擊敗魔化戰士，獲得了戰利品。",
          "battle": {
            "result": "win",
            "rounds": [
              {
                "round": 1,
                "actions": [
                  {
                    "actor": "hero_1",
                    "actor_name": "劍士艾倫",
                    "action_type": "attack",
                    "target": "enemy_1",
                    "target_name": "魔化戰士",
                    "damage": 120,
                    "crit": false,
                    "mp_used": 0,
                    "remaining_hp": 380,
                    "remaining_mp": 100,
                    "team": "A"
                  },
                  {
                    "actor": "enemy_1",
                    "actor_name": "魔化戰士",
                    "action_type": "skill",
                    "target": "hero_1",
                    "target_name": "劍士艾倫",
                    "damage": 150,
                    "crit": true,
                    "mp_used": 20,
                    "remaining_hp": 250,
                    "remaining_mp": 30,
                    "team": "B"
                  }
                ]
              },
              {
                "round": 2,
                "actions": [
                  {
                    "actor": "hero_2",
                    "actor_name": "法師莉娜",
                    "action_type": "buff",
                    "target": "hero_all",
                    "buff": {
                      "type": "attack_up",
                      "value": 20,
                      "duration": 3
                    },
                    "mp_used": 30,
                    "remaining_hp": 400,
                    "remaining_mp": 90,
                    "team": "A"
                  },
                  {
                    "actor": "enemy_1",
                    "actor_name": "魔化戰士",
                    "action_type": "attack",
                    "target": "hero_1",
                    "damage": 100,
                    "crit": false,
                    "mp_used": 0,
                    "remaining_hp": 150,
                    "remaining_mp": 30,
                    "team": "B"
                  }
                ]
              }
            ],
            "rewards": {
              "gold": 200,
              "exp": 150,
              "items": [
                {
                  "item_id": 101,
                  "name": "神聖之劍",
                  "rarity": "epic"
                },
                {
                  "item_id": 202,
                  "name": "治療藥水",
                  "rarity": "common"
                }
              ]
            }
          }
        }
        );
      } else {
        resolve({
          "type": "normal",
          "texts": [
            "你在森林中聽到奇怪的聲音...",
            "你靠近後發現是一隻受傷的小狐狸。",
            "牠似乎對你產生了信任。",
          ],
          "result": "你獲得了小狐狸的信任！",
        });
      }
    }, 500);
  });
};
const mockNpcEventFetch = async (npcId) => {
  return {
    type: "normal",
    texts: [`你對 ${npcId} 打了聲招呼。`, `${npcId} 回應了你，並講了一段故事。`],
    result: `${npcId} 贈送了你一個神秘道具。`,
  };
};

const mockNpcList = [
  { id: "npc_1", name: "艾莉絲" },
  { id: "npc_2", name: "洛格" },
  { id: "npc_3", name: "瑪莉亞" },
];
export default function ExplorePage() {
  const [mode, setMode] = useState("idle");
  const [showMap, setShowMap] = useState(false);
  const [currentMap, setCurrentMap] = useState("forest");
  const [eventData, setEventData] = useState(null);
  const [battleData, setBattleData] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [npcModalOpen, setNpcModalOpen] = useState(false);
  const [npcList] = useState(mockNpcList);

  const handleExplore = async () => {
    setMode("exploring");
    const mockEvent = await mockApiFetch();
    setEventData(mockEvent);
    setCurrentTextIndex(0);

    if (mockEvent.type === "battle") {
      setBattleData(mockEvent.battle);
      setMode("battle");
    } else {
      setMode("event");
    }
  };

  const handleNpcSelect = async (npc) => {
    setNpcModalOpen(false);
    setMode("exploring");
    const npcEvent = await mockNpcEventFetch(npc.name);
    setEventData(npcEvent);
    setCurrentTextIndex(0);
    setMode("event");
  };

  const handleScreenClick = () => {
    if (!eventData) return;

    if (eventData.type === "normal") {
      if (currentTextIndex < eventData.texts.length - 1) {
        setCurrentTextIndex((prev) => prev + 1);
      } else if (mode !== "result") {
        setMode("result");
      } else {
        resetState();
      }
    } else if (eventData.type === "battle" && mode === "result") {
      resetState();
    }
  };

  const resetState = () => {
    setMode("idle");
    setEventData(null);
    setBattleData(null);
    setCurrentTextIndex(0);
  };

  const isBusy = mode !== "idle";

  return (
    <>
      <ExploreLayout onClick={eventData ? handleScreenClick : undefined} className={styles.explorePage}>
        {/* 頂部操作按鈕區域 */}
        <Box className={styles.mapNpcButtonContainer}>
          <MapButton onClick={() => !isBusy && setShowMap(true)} className={styles.mapNpcButton} />
          <NpcButton onClick={() => !isBusy && setNpcModalOpen(true)} className={styles.mapNpcButton} />
        </Box>

        {/* 事件文字區塊 */}
        {eventData?.type === "normal" && mode !== "result" && (
          <Box className={styles.eventTextBox}>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
              {eventData.texts[currentTextIndex]}
            </Typography>
          </Box>
        )}

        {/* 戰鬥動畫顯示區塊 */}
        {eventData?.type === "battle" && mode === "battle" && battleData && (
          <Box className={styles.battleAnimationBox}>
            <BattleAnimation data={eventData} onFinish={() => { setMode("result"); }} />
          </Box>
        )}

        {/* 結果卡片顯示 */}
        {mode === "result" && eventData && (
          <Box className={styles.resultCardBox}>
            <ExploreResultCard message={eventData.result || "戰鬥結束！你獲得了獎勳！"} />
          </Box>
        )}

        {/* 探索按鈕 */}
        <Box className={styles.exploreButtonContainer}>
          <ExploreButton onClick={handleExplore} disabled={isBusy} />
        </Box>
      </ExploreLayout>

      {/* 地圖與 NPC 模態視窗 */}
      <MapModal
        open={showMap}
        currentMap={currentMap}
        onClose={() => setShowMap(false)}
        onSelectMap={(mapId) => {
          setCurrentMap(mapId);
          resetState();
          setShowMap(false);
        }}
      />

      <NpcModal
        open={npcModalOpen}
        onClose={() => setNpcModalOpen(false)}
        npcs={npcList}
        onSelectNpc={handleNpcSelect}
      />
    </>
  );
}