import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import ConsultationTable from "../../components/Tables/ConsultationTable"
import RegisteredTable from "../../components/Tables/RegisteredTable";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";



const RegisterNewPage = () => {
  // Tab 0 = Đăng ký mới, Tab 1 = Đã đăng ký
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#002554" }}>
        Đăng ký buổi tư vấn
      </Typography>

      {/* <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{
          bgcolor: "#00173D",  
          borderRadius: "50px",
          width: isSidebarOpen ? "80%" : "100%",
          transition: "0.3s",
          "& .MuiTab-root": { textTransform: "none" },
        }}
      >
        <Tab
          label="Đăng ký mới"
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "#F8A435",
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
      </Tabs> */}
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{
          bgcolor: "#00173D",
          borderRadius: "50px",
          // width: isSidebarOpen ? "5%" : "25%",
          transition: "0.3s",
          padding: "4px",
          minHeight: "45px",
          display: "inline-flex",
          "& .MuiTabs-indicator": { display: "none" }, // Ẩn gạch underline
        }}
      >
        <Tab
          icon={<EditCalendarIcon sx={{ fontSize: 18 }} />}
          iconPosition="start"
          label="Đăng ký mới"
          sx={{
            textTransform: "none",
            borderRadius: "50px",
            minHeight: "35px",
            px: 3,
            backgroundColor: tabIndex === 0 ? "#FFFFFF" : "transparent",
            color: tabIndex === 0 ? "#00173D" : "#FFFFFF",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: tabIndex === 0 ? "#FFFFFF" : "rgba(255,255,255,0.1)",
            },
          }}
        />

        <Tab
          icon={<AssignmentTurnedInIcon sx={{ fontSize: 18 }} />}
          iconPosition="start"
          label="Đã đăng ký"
          sx={{
            textTransform: "none",
            borderRadius: "50px",
            minHeight: "35px",
            px: 3,
            backgroundColor: tabIndex === 1 ? "#FFFFFF" : "transparent",
            color: tabIndex === 1 ? "#00173D" : "#FFFFFF",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: tabIndex === 1 ? "#FFFFFF" : "rgba(255,255,255,0.1)",
            },
          }}
        />
      </Tabs>


      {/* Hiển thị bảng theo tab */}
      {tabIndex === 0 ? <ConsultationTable /> : <RegisteredTable />}
    </Box>
  );
};

export default RegisterNewPage;
