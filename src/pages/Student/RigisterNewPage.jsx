import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ConsultationTable from "../../components/ConsultationTable";
import RegisteredTable from "../../components/RegisteredTable";

const RegisterNewPage = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Điều hướng tab theo URL
  const currentTab = location.pathname === "/da-dang-ky" ? 1 : 0;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Đăng ký buổi tư vấn
      </Typography>

      <Tabs
        value={currentTab}
        onChange={(e, v) => navigate(v === 0 ? "/dang-ky-moi" : "/da-dang-ky")}
        sx={{
          bgcolor: "#00173D",
          borderRadius: "50px",
          width: isSidebarOpen ? "80%" : "100%",
          transition: "0.3s",
          "& .MuiTab-root": { textTransform: "none"},
        }}
      >
        <Tab
          label="Đăng ký mới"
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#F8A435", // màu vàng
            },
          }}
        />
        <Tab
          label="Đã đăng ký"
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#F8A435",
            },
          }}
        />

      </Tabs>

      {/* Hiển thị bảng theo tab */}
      {currentTab === 0 ? <ConsultationTable /> : <RegisteredTable />}
    </Box>
  );
};


export default RegisterNewPage;
