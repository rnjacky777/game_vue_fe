import { useState } from "react";
import ExploreLayout from "../components/ExploreLayout/ExploreLayout";
import ExploreResultCard from "../components/ExploreResultCard/ExploreResultCard";
import ExploreButton from "../components/ExploreButton/ExploreButton";

const eventScripts = [
  ["你發現了一個寶箱。", "你打開寶箱，獲得了稀有道具！"],
  ["你遭遇了一隻怪物。", "你準備好進入戰鬥！"],
  ["你撿到了一些金幣。"],
  ["你中了陷阱，失去了一些生命值。"],
  ["你遇到了一位神秘商人。", "他看起來願意交易。"],
  ["你獲得了短暫的力量提升效果！"],
];

function ExplorePage() {
  const [currentEvent, setCurrentEvent] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isExploring, setIsExploring] = useState(false); // 控制按鈕是否可用

  const handleExplore = () => {
    const randomEvent = eventScripts[Math.floor(Math.random() * eventScripts.length)];
    setCurrentEvent(randomEvent);
    setCurrentLineIndex(0);
    setShowResult(true);
    setIsExploring(true); // 禁止再次探索
  };

  const handleNextLine = () => {
    if (!showResult) return;

    if (currentLineIndex < currentEvent.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      setShowResult(false);
      setCurrentEvent([]);
      setCurrentLineIndex(0);
      setIsExploring(false); // 啟用探索按鈕
    }
  };

  return (
    <ExploreLayout>
      <div
        style={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
        onClick={handleNextLine}
      >
        {showResult && <ExploreResultCard message={currentEvent[currentLineIndex]} />}
      </div>
      <ExploreButton onClick={handleExplore} disabled={isExploring} />
    </ExploreLayout>
  );
}

export default ExplorePage;
