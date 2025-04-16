import { useState,useEffect } from "react";
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
import { useUser } from "../context/UserContext";
// 假資料來源（建議可放在獨立檔案）

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
  const { user, updateCurrentMap } = useUser();
  const [mode, setMode] = useState("idle");
  const [showMap, setShowMap] = useState(false);
  const [currentMap, setCurrentMap] = useState("forest");
  const [eventData, setEventData] = useState(null);
  const [battleData, setBattleData] = useState(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [npcModalOpen, setNpcModalOpen] = useState(false);
  const [npcList] = useState(mockNpcList);

  // Handle case when user is null
  if (!user) {
    return <div>Loading...</div>; // Or handle loading/error in another way
  }

  const handleExplore = async () => {
    if (!user) {
      console.error("尚未載入 user 資料，無法探索");
      return;
    }
    setMode("exploring");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/explore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          map_id: user.current_map_id,
        }),
      });
  
      if (!response.ok) {
        throw new Error("探索事件 API 發生錯誤");
      }
  
      const event = await response.json();
      setEventData(event);
      setCurrentTextIndex(0);
  
      if (event.type === "battle") {
        setBattleData(event.battle);
        setMode("battle");
      } else {
        setMode("event");
      }
    } catch (error) {
      console.error("探索事件錯誤：", error);
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
        <Box className={styles.mapNpcButtonContainer}>
          <MapButton onClick={() => !isBusy && setShowMap(true)} className={styles.mapNpcButton} />
          <NpcButton onClick={() => !isBusy && setNpcModalOpen(true)} className={styles.mapNpcButton} />
        </Box>

        {eventData?.type === "normal" && mode !== "result" && (
          <Box className={styles.eventTextBox}>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", textAlign: "center" }}>
              {eventData.texts[currentTextIndex]}
            </Typography>
          </Box>
        )}

        {eventData?.type === "battle" && mode === "battle" && battleData && (
          <Box className={styles.battleAnimationBox}>
            <BattleAnimation data={eventData} onFinish={() => { setMode("result"); }} />
          </Box>
        )}

        {mode === "result" && eventData && (
          <Box className={styles.resultCardBox}>
            <ExploreResultCard message={eventData.result || "戰鬥結束！你獲得了獎勳！"} />
          </Box>
        )}

        <Box className={styles.exploreButtonContainer}>
          <ExploreButton onClick={handleExplore} disabled={isBusy} />
        </Box>
      </ExploreLayout>

      <MapModal
        open={showMap}
        onClose={() => setShowMap(false)}
        onSelectMap={() => {
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
