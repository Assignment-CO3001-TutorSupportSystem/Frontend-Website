import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Tạo State để lưu input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Thêm state hiện/ẩn mật khẩu cho UX tốt hơn
  const [showPassword, setShowPassword] = useState(false);

  // Validate email cơ bản
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Hàm xử lý Đăng nhập
  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Email không hợp lệ!", "warning");
      return;
    }

    const res = await login(email, password);

    if (!res.success) {
      showToast(res.message, "error");
      return;
    }

    showToast("Đăng nhập thành công! Chào mừng bạn trở lại.", "success");
    navigate("/home");
  };

  // Xử lý khi nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: "15%",
        background: "url('/images/loginhcmut.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          position: "relative",
          width: "33vw",
          maxWidth: 1000,
          borderRadius: 4,
          mr: "5%",
          overflow: "hidden",
          backgroundImage: "rgba(255, 255, 255, 0.95)",
          bgcolor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "80vh",
        }}
      >
        {/* Right Side: Login Form */}
        <Box
          sx={{
            ml: "7%",
            width: "86%",
            p: "1%",
            borderRadius: { xs: 4, md: "32px 0 0 32px" },
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#001F3F" mb={1}>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Please enter your login details to login
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              variant="outlined"
              // Gắn state vào
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              // Gắn state vào
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                bgcolor: "#001F3F",
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                py: 1.5,
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 4px 12px rgba(13, 71, 161, 0.4)",
                "&:hover": {
                  bgcolor: "#1a487cff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(13, 71, 161, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
