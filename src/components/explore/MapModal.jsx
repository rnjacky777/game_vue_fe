import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Grid2 } from "@mui/material";

const mockMaps = [
  { id: "forest", name: "幽靜森林" },
  { id: "cave", name: "黑暗洞窟" },
  { id: "ruins", name: "遺跡古城" },
  // 你之後可以改成從 props 或 API 拿資料
];

export default function MapModal({ open,currentMap, onSelectMap, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>選擇探索地點</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          {mockMaps.map((map) => (
            <Grid2 xs={6} key={map.id}>
              <Button
                variant={map.id === currentMap ? "contained" : "outlined"}
                fullWidth
                onClick={() => {
                  onSelectMap(map.id);
                  onClose(); // 選擇後自動關閉 Modal
                }}
              >
                {map.name}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
}
