// ExploreLayout.jsx
import { Box } from "@mui/material";

export default function ExploreLayout({ onClick, children }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 2,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
