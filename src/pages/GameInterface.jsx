import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Person, Assignment, MoreHoriz, Settings, Explore } from "@mui/icons-material";
import { getAuthToken } from "../services/auth";
import { useNavigate, Routes, Route, Link } from "react-router-dom";  // 用於路由切換
import SettingPage from "./Settings"
import EmptyPage from "./empty"

const events = [
  "你發現了一個寶箱，獲得了稀有道具！",
  "你遭遇了一隻怪物，準備戰鬥！",
  "你撿到了一些金幣。",
  "你中了陷阱，失去了一些生命值。",
  "你遇到了一位神秘商人。",
  "你獲得了短暫的力量提升效果！",
];

const GameInterface = () => {
  const [selectedTab, setSelectedTab] = useState("character");
  const [eventMessage, setEventMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) navigate("/login");
    else setUser({ username: "User123" });
  }, [navigate]);

  if (!user) return <div>正在載入...</div>;

  const getHeaderTitle = () => {
    if (location.pathname === "/game") {
      return "遊戲介面";
    } else if (location.pathname === "/game/settings") {
      return "設置";
    } else if (location.pathname === "/game/Character") {
      return "角色選擇";
    }
    return "尚未完成";
  };

  const handleExplore = () => {
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setEventMessage(randomEvent);
  };

  return (
    <div className="game-container">
      <header className="header">{getHeaderTitle()}</header> {/* 動態顯示標題 */}

      <div className="content">
        <Routes>
          <Route path="settings" element={<SettingPage />} />
          <Route path="empty" element={<EmptyPage />} />
          <Route path="/" element={
            <>
              {eventMessage && (
                <Card className="event-card">
                  <CardContent>
                    <Typography variant="h6">探索結果</Typography>
                    <Typography variant="body1" className="mt-2">{eventMessage}</Typography>
                  </CardContent>
                </Card>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleExplore}
                className="explore-button"
              >
                探索
              </Button>
            </>
          } />
        </Routes>
      </div>

      <BottomNavigation
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        className="navbar"
        showLabels
      >
        <BottomNavigationAction
          label="角色"
          value="character"
          icon={<Person />}
          component={Link} // 用 Link 來實現路由切換
          to="empty" // 定義路由
        />
        <BottomNavigationAction
          label="任務"
          value="quest"
          icon={<Assignment />}
          component={Link} // 用 Link 來實現路由切換
          to="empty" // 定義路由
        />
        <BottomNavigationAction
          label="探險"
          value="Explore"
          icon={<Explore />}
          component={Link} // 用 Link 來實現路由切換
          to="" // 定義路由
        />
        <BottomNavigationAction
          label="按鍵2"
          value="button2"
          icon={<MoreHoriz />}
          component={Link} // 用 Link 來實現路由切換
          to="empty" // 定義路由
        />
        <BottomNavigationAction
          label="設定"
          value="settings"
          icon={<Settings />}
          component={Link} // 用 Link 來實現路由切換
          to="settings" // 定義路由
        />
      </BottomNavigation>
    </div>
  );
};

export default GameInterface;
