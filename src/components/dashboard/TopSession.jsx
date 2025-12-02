// src/components/dashboard/TopCategories.jsx
import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

export default function TopSession({ data }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Phiên học có nhiều lượt tham gia
      </Typography>

      <List>
        {data.map((c, i) => (
          <ListItem key={c.name} sx={{ py: 1 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#97adeaff" }}>{i + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={c.name} secondary={`${c.points}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
