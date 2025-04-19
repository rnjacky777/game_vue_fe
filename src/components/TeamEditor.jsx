import React, { useEffect, useState } from "react";
import styles from "./TeamEditor.module.css";
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from "axios";
import CharacterCard from "../components/CharacterCard/CharacterCard";

const TeamEditor = () => {
  const [characters, setCharacters] = useState([]);
  const [originalTeam, setOriginalTeam] = useState([]);
  const [team, setTeam] = useState(Array(6).fill(null));
  const [editingIndex, setEditingIndex] = useState(null);

  // 判斷是否有變更
  const hasChanges = JSON.stringify(team) !== JSON.stringify(originalTeam);

  useEffect(() => {
    // 取得隊伍資料
    axios.get("http://127.0.0.1:8000/api/team").then(res => {
      setOriginalTeam(res.data);
      setTeam(res.data);
    });

    // 取得角色列表
    axios.get("http://127.0.0.1:8000/api/character/list").then(res => {
      setCharacters(res.data);
    });
  }, []);

  const handleConfirmUpdate = () => {
    axios.put("http://127.0.0.1:8000/api/team", team)
      .then(() => {
        setOriginalTeam(team);
        alert("隊伍已更新！");
      })
      .catch(() => {
        alert("更新失敗");
      });
  };

  const handleSelectCharacter = (char) => {
    const newTeam = [...team];
    newTeam[editingIndex] = char;
    setTeam(newTeam);
    setEditingIndex(null);
  };

  const handleRemoveFromTeam = (index) => {
    const newTeam = [...team];
    newTeam[index] = null;
    setTeam(newTeam);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>隊伍編輯</Typography>
      <div className={styles.teamContainer}>
        {team.map((member, idx) => (
          <Card
            key={idx}
            className={styles.TeamEditCard}
            onClick={() => setEditingIndex(idx)}
          >
            <CardContent sx={{ p: 1 }}>
              {member ? (
                <>
                  <Typography variant="body2" noWrap>{member.name}</Typography>
                  <Typography variant="caption">Lv {member.level}</Typography>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromTeam(idx);
                    }}
                  >
                    移除
                  </Button>
                </>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  點此選擇角色
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={styles.confirmButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={!hasChanges}
          onClick={handleConfirmUpdate}
        >
          確認更新隊伍
        </Button>
      </div>

      <Dialog open={editingIndex !== null} onClose={() => setEditingIndex(null)} fullWidth>
        <DialogTitle>選擇角色</DialogTitle>
        <DialogContent className={styles.gridContainer}>
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              name={char.name}
              level={char.level}
              onClick={() => handleSelectCharacter(char)}
            />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamEditor;
