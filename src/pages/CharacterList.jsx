import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard/CharacterCard";
import styles from "./CharacterList.module.css";
import TeamEditor from "../components/TeamEditor";
import { Typography } from "@mui/material";

function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/character/list")
      .then((response) => {
        setCharacters(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setCharacters([]);
      });
  }, []);

  return (
    <div>
      <TeamEditor />

      <Typography variant="h6">所有角色</Typography>
      <div className={styles.gridContainer}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            name={char.name}
            level={char.level}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterListPage;
