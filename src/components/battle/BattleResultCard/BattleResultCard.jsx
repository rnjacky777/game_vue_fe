import { Card, CardContent, Typography } from "@mui/material";

export default function BattleResultCard({ result, rewards, onClose }) {
  return (
    <Card onClick={onClose} sx={{ padding: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h6">
          戰鬥結果：{result === "win" ? "勝利 🎉" : "失敗 😢"}
        </Typography>
        <Typography>獲得金幣：{rewards.gold}</Typography>
        <Typography>獲得經驗：{rewards.exp}</Typography>
        <Typography>
          道具：
          {rewards.items.map((item) => `${item.name} (${item.rarity})`).join("，")}
        </Typography>
      </CardContent>
    </Card>
  );
}
