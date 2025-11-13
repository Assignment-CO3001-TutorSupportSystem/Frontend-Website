import React, { useState, isValidElement, cloneElement } from "react";
import { Box, CssBaseline, Drawer } from "@mui/material";
import Header from "./Header.jsx";
import SidebarContent from "./SidebarContent.jsx";
import Footer from "./Footer.jsx";

const drawerWidth = 260; // Độ rộng Sidebar
const headerHeight = "64px"; // Chiều cao Header (mặc định của MUI)

function Layout({ children, user, menuItems }) {
  // 1. Đổi tên state, bắt đầu với trạng thái Mở (true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. Đổi tên hàm Bật/Tắt
  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  const drawerContent = <SidebarContent user={user} menuItems={menuItems} />;
  // 2. (CHÚ THÍCH) TẠO 'children' VỚI PROP MỚI
  // Chúng ta "nhân bản" component 'children' (là HomePage)
  // và "tiêm" prop 'isSidebarOpen' vào nó.
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      // Truyền state 'isSidebarOpen' vào 'HomePage'
      return cloneElement(child, { isSidebarOpen: isSidebarOpen });
    }
    return child;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* 1. HEADER (Fixed, full-width) */}
      {/* Nó sẽ gọi hàm handleSidebarToggle khi nhấn burger */}
      <Header onMenuClick={handleSidebarToggle} />

      {/* 2. VÙNG NỘI DUNG CHÍNH (Bên dưới Header) */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: headerHeight, // Bắt đầu sau khi Header kết thúc
        }}
      >
        {/* 3. SIDEBAR (ĐÃ CHỈNH SỬA) */}
        {/* Chỉ còn 1 Drawer duy nhất */}
        <Drawer
          variant="persistent" // Đổi thành 'persistent' để có thể Bật/Tắt
          open={isSidebarOpen} // Trạng thái Mở/Đóng được điều khiển bằng state
          sx={{
            // Bỏ display responsive
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
          {drawerContent}
        </Drawer>

        {/* 5. KHUNG CHỨA (Nội dung trang + Footer) - ĐÃ CHỈNH SỬA */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f9fa",
            overflow: "auto",

            // 4. Thêm logic "ĐẨY" (PUSH) nội dung
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            marginLeft: `-${drawerWidth}px`, // Mặc định, lùi nội dung vào

            // Khi Sidebar Mở (isSidebarOpen = true)
            ...(isSidebarOpen && {
              transition: (theme) =>
                theme.transitions.create("margin", {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              marginLeft: 0, // Đẩy nội dung trở lại vị trí 0
            }),
          }}
        >
          {/* 5a. NỘI DUNG TRANG */}
          <Box
            sx={{
              flexGrow: 1,
              padding: isSidebarOpen ? 3 : 0,
              // Thêm hiệu ứng transition cho mượt
              transition: (theme) =>
                theme.transitions.create("padding", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              ...(isSidebarOpen && {
                transition: (theme) =>
                  theme.transitions.create("padding", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }),
            }}
          >
            {childrenWithProps}
          </Box>
          {/* 5b. FOOTER */}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
