import { Button } from "@mui/material";

export default function ExploreButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 200,
        maxWidth: 240,
        height: 60,
        fontSize: "1.2rem"
      }}
    >
      探索
    </Button>
  );
}
