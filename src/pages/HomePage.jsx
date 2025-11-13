import React from "react";
import { Box, Paper } from "@mui/material";

const HomePage = ({ isSidebarOpen }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        borderRadius: isSidebarOpen ? 2 : 0,
        // Thêm hiệu ứng transition cho mượt
        transition: (theme) =>
          theme.transitions.create("border-radius", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(isSidebarOpen && {
          transition: (theme) =>
            theme.transitions.create("border-radius", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <img
        src="/images/slbk.jpg"
        alt="Trường Đại học Bách Khoa"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </Paper>
  );
};

export default HomePage;
