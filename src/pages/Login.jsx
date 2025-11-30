import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useLoginForm } from "../hooks/useLoginForm";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
    handleKeyDown,
  } = useLoginForm();

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
          bgcolor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "80vh",
        }}
      >
        <Box
          sx={{
            ml: "7%",
            width: "86%",
            p: "1%",
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
            {/* Input Email */}
            <TextField
              fullWidth
              placeholder="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "& fieldset": { border: "none" },
                },
              }}
            />

            {/* Input Password */}
            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "& fieldset": { border: "none" },
                },
              }}
            />

            {/* Login Button */}
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
