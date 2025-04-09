import { Box } from "@mui/material";

export default function ExploreLayout({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      minHeight="80vh"
      padding={2}
    >
      {children}
    </Box>
  );
}
