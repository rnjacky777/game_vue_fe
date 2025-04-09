import { useState } from "react";
import ExploreLayout from "../components/ExploreLayout/ExploreLayout";
import ExploreResultCard from "../components/ExploreResultCard/ExploreResultCard";
import ExploreButton from "../components/ExploreButton/ExploreButton";

const events = [
  "你發現了一個寶箱，獲得了稀有道具！",
  "你遭遇了一隻怪物，準備戰鬥！",
  "你撿到了一些金幣。",
  "你中了陷阱，失去了一些生命值。",
  "你遇到了一位神秘商人。",
  "你獲得了短暫的力量提升效果！",
];

function ExplorePage() {
  const [eventMessage, setEventMessage] = useState("尚未探索，請點擊探索按鈕");

  const handleExplore = () => {
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setEventMessage(randomEvent);
  };

  return (
    <ExploreLayout>
      <div style={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ExploreResultCard message={eventMessage} />
      </div>
      <ExploreButton onClick={handleExplore} />
    </ExploreLayout>
  );
}

export default ExplorePage;
