import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import { Box, CssBaseline, Drawer } from "@mui/material";
import Footer from "../components/Footer.jsx";
import HeaderBeforeLogin from "../components/HeaderBeforeLogin.jsx";

const drawerWidth = 260;
const headerHeight = "64px";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <HeaderBeforeLogin />

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: headerHeight }}>
        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f9fa",
            overflow: "auto",
            minHeight: `calc(100vh - ${headerHeight})`,
          }}
        >
          {/* VÙNG NỘI DUNG THAY ĐỔI */}
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Outlet context={{ isSidebarOpen }} />
          </Box>

          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
