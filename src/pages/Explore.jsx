import { useState } from "react";
import { Typography } from "@mui/material";
import ExploreLayout from "../components/ExploreLayout/ExploreLayout";
import ExploreButton from "../components/ExploreButton/ExploreButton";
import ExploreResultCard from "../components/ExploreResultCard/ExploreResultCard";
import BattleAnimation from "../components/BattleAnimation/BattleAnimation";
import MapButton from "../components/MapButton"
import MapModal from "./MapModal"
import NpcButton from "../components/NpcButton"
import NpcModal from "../components/NpcModal"


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
  const [showMap, setShowMap] = useState(false);
  const [currentMap, setCurrentMap] = useState("forest");
  const [eventData, setEventData] = useState(null);
  const [battleData, setBattleData] = useState(null);
  const [showBattle, setShowBattle] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [battleFinished, setBattleFinished] = useState(false);
  const [npcModalOpen, setNpcModalOpen] = useState(false);
  const [npcList] = useState(mockNpcList);

  const handleExplore = async () => {
    setIsExploring(true);
    const mockEvent = await mockApiFetch();
    setEventData(mockEvent);
    setShowResult(false);
    setBattleFinished(false);

    if (mockEvent.type === "battle") {
      setBattleData(mockEvent.battle);
      setShowBattle(true);
    } else {
      setCurrentTextIndex(0);
    }
  };

  const handleNpcSelect = async (npc) => {
    setNpcModalOpen(false);
    const npcEvent = await mockNpcEventFetch(npc.name);
    setEventData(npcEvent);
    setShowResult(false);
    setBattleFinished(false);
    setCurrentTextIndex(0);
  };

  const handleScreenClick = () => {
    if (!eventData) return;

    if (eventData.type === "normal") {
      if (currentTextIndex < eventData.texts.length - 1) {
        setCurrentTextIndex((prev) => prev + 1);
      } else if (!showResult) {
        setShowResult(true);
      } else {
        resetState();
      }
    } else if (eventData.type === "battle" && showResult && battleFinished) {
      resetState();
    }
  };

  const resetState = () => {
    setEventData(null);
    setBattleData(null);
    setShowBattle(false);
    setShowResult(false);
    setCurrentTextIndex(0);
    setIsExploring(false);
    setBattleFinished(false);
  };

  return (
    <>
      <ExploreLayout onClick={eventData ? handleScreenClick : undefined}>
        <MapButton onClick={() => setShowMap(true)} />
        <NpcButton onClick={() => setNpcModalOpen(true)} />

        {showMap && (
          <MapModal
            currentMap={currentMap}
            onClose={() => setShowMap(false)}
            onSelectMap={(mapId) => {
              setCurrentMap(mapId);
              resetState();
            }}
          />
        )}

        {eventData && (
          <>
            {eventData.type === "normal" && !showResult && (
              <Typography variant="body1" sx={{ fontSize: "1.2rem", p: 2 }}>
                {eventData.texts[currentTextIndex]}
              </Typography>
            )}

            {eventData.type === "battle" && showBattle && battleData && (
              <BattleAnimation
                data={eventData}
                onFinish={() => {
                  setShowBattle(false);
                  setShowResult(true);
                  setBattleFinished(true);
                }}
              />
            )}
          </>
        )}

        {((eventData?.type === "normal" && showResult) ||
          (eventData?.type === "battle" && showResult && battleFinished)) && (
          <ExploreResultCard message={eventData.result || "戰鬥結束！你獲得了獎勳！"} />
        )}
      </ExploreLayout>

      <ExploreButton
        onClick={handleExplore}
        disabled={isExploring || !!eventData || showBattle}
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
