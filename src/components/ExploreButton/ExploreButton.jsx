import { Button } from "@mui/material";

export default function ExploreButton({ onClick,disabled  }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 200,
        maxWidth: 240,
        height: 64,
        fontSize: "1.25rem",
        padding: "12px 24px",
        borderRadius: "12px",
      }}
    >
      探索
    </Button>
  );
}
