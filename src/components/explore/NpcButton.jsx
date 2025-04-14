import { Button } from "@mui/material";

export default function NpcButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
      與 NPC 對話
    </Button>
  );
}
