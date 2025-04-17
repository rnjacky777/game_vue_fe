import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard/CharacterCard";
import styles from "./CharacterList.module.css";
function CharacterListPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/character/list")
      .then((response) => {
        // 假設 response.data 是陣列，若無則為空陣列
        setCharacters(response.data || []); 
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setCharacters([]); // 如果出錯則將 characters 設為空陣列
      });
  }, []);

  return (
    <div className={styles.gridContainer}>
      {characters.map((char) => (
        <CharacterCard key={char.id} name={char.name} level={char.level} />
      ))}
    </div>
  );
}

export default CharacterListPage;
