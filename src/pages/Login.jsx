import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";

const LoginPage = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-end", // đẩy sang phải
        alignItems: "center", // căn giữa dọc
        pr: "15%", // padding-right = 5%
        background: "url('/images/loginhcmut.jpg')",
        backgroundSize: "cover", // hình phủ toàn bộ container
        backgroundPosition: "center", // căn giữa hình
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
          bgcolor: "rgba(255, 255, 255, 0.3)", // nền bán trong suốt
          backdropFilter: "blur(10px)", // blur nền phía sau
          WebkitBackdropFilter: "blur(10px)", // cho Safari
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4, // bo góc như Paper
                  bgcolor: "rgba(255, 255, 255, 0.3)", // nền bán trong suốt
                  backdropFilter: "blur(10px)", // blur nền phía sau
                  WebkitBackdropFilter: "blur(10px)", // hỗ trợ Safari
                  border: "1px solid rgba(255, 255, 255, 0.5)", // optional: viền nhẹ
                  "& fieldset": {
                    border: "none", // bỏ viền mặc định nếu muốn
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // label nổi bật trên nền
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4, // bo góc như Paper
                  bgcolor: "rgba(255, 255, 255, 0.3)", // nền bán trong suốt
                  backdropFilter: "blur(10px)", // blur nền phía sau
                  WebkitBackdropFilter: "blur(10px)", // hỗ trợ Safari
                  border: "1px solid rgba(255, 255, 255, 0.5)", // optional: viền nhẹ
                  "& fieldset": {
                    border: "none", // bỏ viền mặc định nếu muốn
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // label nổi bật trên nền
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
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
