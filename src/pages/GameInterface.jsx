import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Assignment, MoreHoriz, Settings, Explore, Group } from "@mui/icons-material";
import { getAuthToken } from "../services/auth";
import { useNavigate, Link, Outlet } from "react-router-dom";
import GameContainer from "../components/GameContainer/GameContainer";


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
      "/game/character_list": "角色列表",
    };

    return pathTitles[location.pathname] || "遊戲主頁";
  };

  return (
    <GameContainer>
      <header className="header">{getHeaderTitle()}</header>
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
          label="角色列表"
          value="character_list"
          icon={<Group />}
          component={Link}
          to="character_list"
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
      </GameContainer>
  );
};

export default GameInterface;
