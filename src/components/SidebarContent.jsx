import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { MENUS } from "../data/mockSiderbar";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";

const SidebarContent = () => {
  const { user } = useAuth();
  const location = useLocation(); // Hook để biết đường dẫn hiện tại (URL)

  if (!user) return null; // Nếu chưa có user (chưa login)

  // 1. Lấy menu dựa trên role của user (admin, tutor, student...)
  const menuItems = MENUS[user.role] || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#001F3F",
        color: "#fff",
      }}
    >
      {/* ------ THÔNG TIN USER ------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "2vh",
          paddingTop: "4vh",
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: "5vw",
            height: "5vw",
            maxWidth: 80,
            maxHeight: 80,
            mb: 1,
            bgcolor: "#1976d2",
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user.name}
        </Typography>

        <Typography variant="role" sx={{ color: "rgba(255,255,255,0.7)" }}>
          {user.role}
        </Typography>

        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
          {user.id}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

      {/* ------ DANH SÁCH MENU ------- */}
      <List sx={{ padding: "0 12px" }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.route;

          return (
            <ListItem key={index} disablePadding sx={{ margin: "6px 0" }}>
              <ListItemButton
                /* Tích hợp react router vào MUI button */
                component={NavLink}
                to={item.route}
                /* Style Dynamic: Thay đổi dựa trên isActive */
                sx={{
                  color: "white",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#87CEEB" : "transparent",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    backgroundColor: isActive
                      ? "#87CEEB"
                      : "rgba(135, 206, 235, 0.15)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarContent;
