import React from "react";
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

// Giữ lại các icon imports của bạn...
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// ... (các icon khác)
import SettingsIcon from "@mui/icons-material/Settings"; 

/**
 * Component SidebarContent
 *
 * Chỉ hiển thị nội dung bên trong Sidebar (Avatar, danh sách menu).
 * Component này không chứa logic Drawer, nó nhận dữ liệu qua props.
 *
 * @param {object} props
 * @param {object} props.user - Thông tin user (VD: { name: "Anh Minh", id: "A0001", avatarUrl: "/avatar.png" })
 * @param {Array<object>} props.menuItems - Mảng các mục menu (VD: [{ text: "Trang chủ", icon: <HomeIcon /> }])
 */
const SidebarContent = ({ user, menuItems }) => {
  
  return (
    // Box này sẽ được đặt bên trong <Drawer> của Layout
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Đảm bảo chiếm toàn bộ chiều cao
        backgroundColor: "#001F3F", // Màu nền từ file gốc
        color: "#fff",
      }}
    >
      {/* 1. TÁI SỬ DỤNG: Hiển thị thông tin user từ props */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "2vh",
          paddingTop: "4vh", // Thêm chút đệm
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: "5vw", // 15% chiều rộng viewport
            height: "5vw", // giữ tỉ lệ vuông
            maxWidth: 80, // không vượt quá 80px
            maxHeight: 80,
            mb: 1,
            bgcolor: "#1976d2",
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user.name} {/* Lấy từ prop */}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          {user.id} {/* Lấy từ prop */}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

      {/* 2. TÁI SỬ DỤNG: Hiển thị danh sách menu từ props */}
      <List sx={{ padding: "0 12px" }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ margin: "6px 0" }}>
            <ListItemButton
              sx={{
                color: "white",
                borderRadius: "8px",
                // Logic cho item được chọn (ví dụ)
                ...(item.isActive && {
                  backgroundColor: "#87CEEB",
                  color: "#001F3F",
                  "&:hover": { backgroundColor: "#87CEEB" },
                }),
                "&:hover": {
                  backgroundColor: "rgba(135, 206, 235, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarContent;
