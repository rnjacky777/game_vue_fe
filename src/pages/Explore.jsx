import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";


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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="80vh"
      padding={2}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1} // 這讓 Card 垂直居中
        width="100%"
      >
        {eventMessage && (
          <Card className="event-card" sx={{ width: "100%", maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6">探索結果</Typography>
              <Typography variant="body1" className="mt-2">{eventMessage}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExplore}
        className="explore-button"
        sx={{ width: "100%", maxWidth: 200 }}
      >
        探索
      </Button>
    </Box>

  );
}
export default ExplorePage;