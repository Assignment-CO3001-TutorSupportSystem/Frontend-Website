import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
// Import các icon bạn cần cho Header
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const HeaderBeforeLogin = () => {
  const navigate = useNavigate();
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
        {/* Logo Bách Khoa (Ví dụ) */}
        <Box
          component="img"
          src="/images/logo.png" // Bạn cần đặt logo vào thư mục /public
          sx={{
            width: 40,
            height: 35,
            borderRadius: 1, // Bo góc nhẹ (tùy chọn)
            display: { xs: "none", sm: "block" }, // Ẩn logo trên di động
            objectFit: "contain", // Giữ tỷ lệ hình ảnh
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
        <Box sx={{ flexGrow: 1 }} /> {/* Đẩy các icon sang phải */}
        {/* Các icon bên phải */}
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Button
          variant="h6"
          component="div"
          onClick={() => navigate("/login")}
          sx={{
            ml: 3,
            bgcolor: "#ffffffff",
            color: "black",
            fontWeight: "bold",
            borderRadius: 3,
            py: 0.7,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              color: "white",
              bgcolor: "#120f25ff",
            },
          }}
        >
          Đăng nhập
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBeforeLogin;
