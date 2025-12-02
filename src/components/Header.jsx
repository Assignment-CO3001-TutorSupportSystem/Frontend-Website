import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
// Import các icon bạn cần cho Header
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

/**
 * Component Header (AppBar)
 *
 * @param {object} props
 * @param {function} props.onMenuClick - Hàm callback để gọi khi nhấn nút 'burger' menu (để bật/tắt Sidebar)
 */
const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    showToast("Đăng xuất thành công! Tạm biệt.", "success");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#001F3F",
        color: "#fff",
      }}
    >
      <Toolbar>
        {/* Nút 'burger' để bật/tắt Sidebar */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {/* Logo Bách Khoa (Ví dụ) */}
        <Box
          component="img"
          src="/images/logo.png"
          sx={{
            width: 40,
            height: 35,
            mr: 1.5,
            borderRadius: 1,
            display: { xs: "none", sm: "block" },
            objectFit: "contain",
          }}
        />
        {/* Các mục điều hướng */}
        <Typography
          variant="h6"
          component="div"
          sx={{ ml: 3, fontWeight: "bold", fontSize: "1rem" }}
        >
          Tư vấn
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ ml: 3, fontWeight: "bold", fontSize: "1rem" }}
        >
          Điều khiển
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* Các icon bên phải */}
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
