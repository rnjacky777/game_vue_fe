import { Card, CardContent, Typography } from "@mui/material";
import styles from "./ExploreResultCard.module.css";
export default function ExploreResultCard({ message }) {
  return (
    <Card className={styles.eventCard}>
      <CardContent>
        <Typography variant="h6">探索結果</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{message}</Typography>
      </CardContent>
    </Card>
  );
}
