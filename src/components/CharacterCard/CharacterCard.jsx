import React from "react";
import styles from "./CharacterCard.module.css";
import { Card, CardContent, Typography } from "@mui/material";

const CharacterCard = ({ name, level }) => {
  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.card}>
        <CardContent>
          <Typography className={styles.title} variant="h6">
            {name}
          </Typography>
          <Typography className={styles.level} variant="body2">
            Level: {level}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterCard;
