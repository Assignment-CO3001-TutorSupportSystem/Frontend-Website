import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import { Box, CssBaseline, Drawer } from "@mui/material";
import Header from "../components/Header.jsx";
import SidebarContent from "../components/SidebarContent.jsx";
import Footer from "../components/Footer.jsx";

const drawerWidth = 260;
const headerHeight = "64px";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      <Header onMenuClick={handleSidebarToggle} />

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: headerHeight }}>
        {/* SIDEBAR */}
        <Drawer
          variant="persistent"
          open={isSidebarOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              top: headerHeight,
              height: `calc(100vh - ${headerHeight})`,
              borderRight: "none",
            },
          }}
        >
          <SidebarContent />
        </Drawer>

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

            // Logic đẩy nội dung (Push content)
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            marginLeft: `-${drawerWidth}px`,
            ...(isSidebarOpen && {
              transition: (theme) =>
                theme.transitions.create("margin", {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              marginLeft: 0,
            }),
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
