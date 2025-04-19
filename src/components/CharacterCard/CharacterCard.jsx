import React from "react";
import styles from "./CharacterCard.module.css";
import { Card, CardContent, Typography } from "@mui/material";

const CharacterCard = ({ name, level, onClick }) => {
  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <Card className={styles.card} >
        <CardContent className={styles.content}>
          <Typography className={styles.title} variant="h6">
            {name}
          </Typography>
          <Typography className={styles.level} variant="body2">
            Lv {level}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCard;
