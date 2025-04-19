import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Assignment, MoreHoriz, Settings, Explore, Group } from "@mui/icons-material";
import { useNavigate, Link, Outlet } from "react-router-dom";
import GameContainer from "../components/common/GameContainer/GameContainer";
import { useUser } from "../context/UserContext";
import styles from "./GameInterface.module.css";
const GameInterface = () => {
  const [selectedTab, setSelectedTab] = useState("character");
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token)
    if (!token) {
      navigate("/login");
    } else {
      axios.get("http://127.0.0.1:8000/api/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUser(res.data); // 重新設回 user
      })
      .catch((err) => {
        console.error(err)
        sessionStorage.removeItem("token");
        navigate("/login");
      });
    }
  }, [navigate]);
  

  if (!useUser()) return <div>正在載入...</div>;
  
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
      <div className={styles.gameInterfaceContent}>
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
