import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import { Person, Assignment, MoreHoriz, Settings, Explore } from "@mui/icons-material";
import { getAuthToken } from "../services/auth";
import { useNavigate, Link, Outlet } from "react-router-dom";  // 用於路由切換


const GameInterface = () => {
  const [selectedTab, setSelectedTab] = useState("character");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) navigate("/login");
    else setUser({ username: "User123" });
  }, [navigate]);

  if (!user) return <div>正在載入...</div>;

  const getHeaderTitle = () => {
    const pathTitles = {
      "/game/explore": "探索頁面",
      "/game/": "探索頁面",
      "/game/settings": "設定頁面",
    };

    return pathTitles[location.pathname] || "遊戲主頁";
  };

  return (
    <div className="game-container">
      <header className="header">{getHeaderTitle()}</header> {/* 動態顯示標題 */}
      <div className="content">
        <Outlet />
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
          to="explore" // 定義路由
        />
        <BottomNavigationAction
          label="探險2"
          value="Explore"
          icon={<MoreHoriz />}
          component={Link} // 用 Link 來實現路由切換
          to="explore" // 定義路由
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
