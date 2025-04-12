import { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExploreLayout from "../components/ExploreLayout/ExploreLayout";
import ExploreButton from "../components/ExploreButton/ExploreButton";
import ExploreResultCard from "../components/ExploreResultCard/ExploreResultCard";
import BattleAnimation from "../components/BattleAnimation/BattleAnimation";

// 假資料來源（建議可放在獨立檔案）
const mockApiFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isBattle = Math.random() < 0.5;
      if (isBattle) {
        resolve({
          type: "battle",
          texts: ["你遇到一隻兇猛的怪物，準備戰鬥！"],
          result: "你擊敗了怪物，獲得了寶藏！",
          battle: {
            result: "win",
            rounds: [
              {
                round: 1,
                actions: [
                  {
                    actor: "teamA_1",
                    action_type: "attack",
                    target: "teamB_1",
                    damage: 120,
                    crit: false,
                    remaining_hp: 380,
                  },
                  {
                    actor: "teamB_1",
                    action_type: "skill",
                    target: "teamA_1",
                    damage: 150,
                    crit: true,
                    remaining_hp: 250,
                  },
                ],
              },
              {
                round: 2,
                actions: [
                  {
                    actor: "teamA_2",
                    action_type: "buff",
                    target: "teamA_all",
                    buff: "attack_up",
                    value: 20,
                  },
                  {
                    actor: "teamB_2",
                    action_type: "attack",
                    target: "teamA_1",
                    damage: 100,
                    crit: false,
                    remaining_hp: 150,
                  },
                ],
              },
            ],
            rewards: {
              gold: 200,
              exp: 100,
              items: [{ item_id: 1, name: "稀有劍", rarity: "rare" }],
            },
          },
        });
      } else {
        resolve({
          type: "normal",
          texts: [
            "你在森林中聽到奇怪的聲音...",
            "你靠近後發現是一隻受傷的小狐狸。",
            "牠似乎對你產生了信任。",
          ],
          result: "你獲得了小狐狸的信任！",
        });
      }
    }, 500);
  });
};

export default function ExplorePage() {
  const [eventData, setEventData] = useState(null);       // 一般或戰鬥事件資料
  const [battleData, setBattleData] = useState(null);     // 戰鬥資料
  const [showBattle, setShowBattle] = useState(false);    // 是否顯示戰鬥動畫
  const [isExploring, setIsExploring] = useState(false);  // 按鈕鎖定狀態
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // 目前顯示到第幾段文字
  const [showResult, setShowResult] = useState(false);    // 是否顯示結果卡
  const [battleFinished, setBattleFinished] = useState(false); // 戰鬥是否結束

  const handleExplore = async () => {
    setIsExploring(true);
    const mockEvent = await mockApiFetch();  // 模擬 API 資料
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

  const handleScreenClick = () => {
    if (!eventData) return;

    if (eventData.type === "normal") {
      if (currentTextIndex < eventData.texts.length - 1) {
        setCurrentTextIndex((prev) => prev + 1);
      } else if (!showResult) {
        setShowResult(true); // 顯示結果卡
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
    <ExploreLayout>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          px: 2,
        }}
        onClick={eventData ? handleScreenClick : undefined}
      >
        {eventData && (
          <>
            {/* 一般事件：文字逐段顯示 */}
            {eventData.type === "normal" && !showResult && (
              <Typography variant="body1" sx={{ fontSize: "1.2rem", p: 2 }}>
                {eventData.texts[currentTextIndex]}
              </Typography>
            )}

            {/* 戰鬥動畫播放 */}
            {eventData.type === "battle" && showBattle && battleData && (
              <BattleAnimation
                data={battleData}
                onFinish={() => {
                  setShowBattle(false);
                  setShowResult(true); // 播完戰鬥動畫才顯示結果卡
                  setBattleFinished(true); // 標記為戰鬥完成
                }}
              />
            )}
          </>
        )}

        {/* 顯示結果卡（一般事件或戰鬥事件） */}
        {((eventData?.type === "normal" && showResult) ||
          (eventData?.type === "battle" && showResult && battleFinished)) && (
            <ExploreResultCard message={eventData.result || "戰鬥結束！你獲得了獎勳！"} />
          )}
      </Box>

      <ExploreButton
        onClick={handleExplore}
        disabled={isExploring || !!eventData || showBattle}
      />
    </ExploreLayout>
  );
}
