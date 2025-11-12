import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const menuItems = [
    { text: "Trang chủ", icon: <HomeIcon /> },
    { text: "Đăng ký buổi tư vấn", icon: <EventAvailableIcon /> },
    { text: "Buổi tư vấn của tôi", icon: <EventNoteIcon /> },
    { text: "Lịch", icon: <CalendarMonthIcon /> },
    { text: "Tài liệu", icon: <DescriptionIcon /> },
    { text: "Cài đặt", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          backgroundColor: "#001F3F",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Avatar
          src="/avatar.png"
          sx={{ width: 64, height: 64, mb: 1, bgcolor: "#1976d2" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Minh Thu
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          tutor
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "#87CEEB", color: "#001F3F" },
                m: "6px 12px",
                borderRadius: "8px",
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;