// ExploreResultCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

export default function ExploreResultCard({ message }) {
  return (
    <Card sx={{ maxWidth: 400, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          結果：
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
