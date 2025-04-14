import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

export default function MapButton({ onClick }) {
  return (
    <Tooltip title="選擇地圖">
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <MapIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
}
