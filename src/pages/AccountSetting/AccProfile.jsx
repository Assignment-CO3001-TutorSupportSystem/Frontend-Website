import React, { useState } from "react";
import { Box, Paper, Typography, Grid, Avatar } from "@mui/material";
import Button from "../../components/Button.jsx";
import Textfill from "../../components/Textfill.jsx";
import { useNavigate } from "react-router-dom";
const AccountProfile = () => {
  const [user, setUser] = useState({
    name: "Anh Minh",
    role: "Điều phối viên",
    username: "Anh Minh",
    avatar: "", // you can replace with an image URL
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setUser((prev) => ({ ...prev, [field]: e.target.value }));

  const handleViewDetails = () => {
    // replace with navigation or modal logic
    console.log("View details for", user);
    navigate("/accSetting");
  };
  return (
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: { xs: "left", md: "center" },
            flex: 1,
          }}
        >
          Quản lí tài khoản
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          bgcolor: "#ffffff",
          p: 3,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {/* left spacing to simulate sidebar area */}
            <Grid item xs={0} md={3} />

            {/* Center column: profile card, then label + input + button stacked vertically */}
            <Grid item xs={12} md={6}>
              {/* Profile card */}
              <Box
                sx={{
                  bgcolor: "#071a2a",
                  color: "#fff",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  width: "100%",
                  maxWidth: 760,
                  mx: "auto",
                }}
              >
                <Avatar
                  src={user.avatar || undefined}
                  sx={{ width: 92, height: 92, borderRadius: 2 }}
                >
                  {user.name?.[0]}
                </Avatar>

                <Box>
                  <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                    {user.name}
                  </Typography>
                  <Typography sx={{ opacity: 0.8, mt: 1 }}>{user.role}</Typography>
                </Box>
              </Box>

              {/* Stacked Username label + input + button under the profile card */}
              <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <Typography sx={{ fontWeight: 800, fontSize: 20 }}>Username</Typography>

                <Textfill
                  value={user.username}
                  onChange={handleChange("username")}
                  fullWidth
                  disabled
                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Button
                    onClick={handleViewDetails}
                    width={260}
                    height={56}
                    style={{
                      borderRadius: 16,
                      backgroundColor: "#002554",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    Xem thông tin chi tiết
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* right spacing */}
            <Grid item xs={0} md={3} />
          </Grid>
        </Box>
        </Paper>
    </Box>
  );
};
export default AccountProfile;