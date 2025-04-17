import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Grid2 } from "@mui/material";
import { useUser } from "../../context/UserContext";


export default function MapModal({ open, maps = [], onSelectMap, onClose }) {
  const { user, updateCurrentMap } = useUser();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>選擇探索地點</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          {maps.map((map) => (
            <Grid2 xs={6} key={map.id}>
              <Button
                variant={map.id === user.current_map_id ? "contained" : "outlined"}
                fullWidth
                onClick={() => {
                  onSelectMap(map.id);        // 傳出選取的 map id
                  updateCurrentMap(map.id);   // 更新 user 狀態
                  onClose();                  // 關閉 modal
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