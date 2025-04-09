import { Button } from "@mui/material";

export default function ExploreButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{ width: "100%", maxWidth: 200 }}
    >
      探索
    </Button>
  );
}
