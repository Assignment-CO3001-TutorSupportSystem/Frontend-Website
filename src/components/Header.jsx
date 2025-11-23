import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
// Import các icon bạn cần cho Header
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

/**
 * Component Header (AppBar)
 *
 * @param {object} props
 * @param {function} props.onMenuClick - Hàm callback để gọi khi nhấn nút 'burger' menu (để bật/tắt Sidebar)
 */
const Header = ({ onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Luôn ở trên Sidebar
        backgroundColor: "#001F3F", // Màu xanh đậm
        color: "#fff",
      }}
    >
      <Toolbar>
        {/* Nút 'burger' để bật/tắt Sidebar */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick} // Gọi hàm từ props
          sx={{ mr: 2 }} // Hiển thị trên tất cả kích thước màn hình
        >
          <MenuIcon />
        </IconButton>
        {/* Logo Bách Khoa (Ví dụ) */}
        <Box
          component="img"
          src="/images/logo.png" // Bạn cần đặt logo vào thư mục /public
          sx={{
            width: 40,
            height: 35,
            mr: 1.5,
            borderRadius: 1, // Bo góc nhẹ (tùy chọn)
            display: { xs: "none", sm: "block" }, // Ẩn logo trên di động
            objectFit: "contain", // Giữ tỷ lệ hình ảnh
          }}
        />
        {/* Các mục điều hướng */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
        >
          Tư vấn
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ ml: 3, opacity: 0.7, fontSize: "1rem" }}
        >
          Điều khiển
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* Đẩy các icon sang phải */}
        {/* Các icon bên phải */}
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton color="inherit">
          <PersonOutlineIcon />
        </IconButton>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
