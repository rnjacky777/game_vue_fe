import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from "@mui/material";

export default function NpcModal({ open, onClose, npcs, onSelectNpc }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>選擇一位 NPC</DialogTitle>
      <List>
        {npcs.map((npc) => (
          <ListItemButton key={npc.id} onClick={() => onSelectNpc(npc)}>
            <ListItemText primary={npc.name} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}
