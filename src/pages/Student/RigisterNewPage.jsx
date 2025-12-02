// import React, { useState } from "react";
// import { Box, Typography, Tabs, Tab } from "@mui/material";
// import ConsultationTable from "../../components/Tables/ConsultationTable"
// import RegisteredTable from "../../components/Tables/RegisteredTable";

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";



// const RegisterNewPage = () => {
//   // Tab 0 = Đăng ký mới, Tab 1 = Đã đăng ký
//   const [tabIndex, setTabIndex] = useState(0);

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#002554" }}>
//         Đăng ký buổi tư vấn
//       </Typography>

//       {/* <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{
//           bgcolor: "#00173D",  
//           borderRadius: "50px",
//           width: isSidebarOpen ? "80%" : "100%",
//           transition: "0.3s",
//           "& .MuiTab-root": { textTransform: "none" },
//         }}
//       >
//         <Tab
//           label="Đăng ký mới"
//           sx={{
//             color: "white",
//             "&.Mui-selected": {
//               color: "#F8A435",
//             },
//           }}
//         />
//         <Tab
//           label="Đã đăng ký"
//           sx={{
//             color: "white",
//             "&.Mui-selected": {
//               color: "#F8A435",
//             },
//           }}
//         />
//       </Tabs> */}
//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{
//           bgcolor: "#00173D",
//           borderRadius: "50px",
//           // width: isSidebarOpen ? "5%" : "25%",
//           transition: "0.3s",
//           padding: "4px",
//           minHeight: "45px",
//           display: "inline-flex",
//           "& .MuiTabs-indicator": { display: "none" }, // Ẩn gạch underline
//         }}
//       >
//         <Tab
//           icon={<EditCalendarIcon sx={{ fontSize: 18 }} />}
//           iconPosition="start"
//           label="Đăng ký mới"
//           sx={{
//             textTransform: "none",
//             borderRadius: "50px",
//             minHeight: "35px",
//             px: 3,
//             backgroundColor: tabIndex === 0 ? "#FFFFFF" : "transparent",
//             color: tabIndex === 0 ? "#00173D" : "#FFFFFF",
//             fontWeight: 600,
//             "&:hover": {
//               backgroundColor: tabIndex === 0 ? "#FFFFFF" : "rgba(255,255,255,0.1)",
//             },
//           }}
//         />

//         <Tab
//           icon={<AssignmentTurnedInIcon sx={{ fontSize: 18 }} />}
//           iconPosition="start"
//           label="Đã đăng ký"
//           sx={{
//             textTransform: "none",
//             borderRadius: "50px",
//             minHeight: "35px",
//             px: 3,
//             backgroundColor: tabIndex === 1 ? "#FFFFFF" : "transparent",
//             color: tabIndex === 1 ? "#00173D" : "#FFFFFF",
//             fontWeight: 600,
//             "&:hover": {
//               backgroundColor: tabIndex === 1 ? "#FFFFFF" : "rgba(255,255,255,0.1)",
//             },
//           }}
//         />
//       </Tabs>


//       {/* Hiển thị bảng theo tab */}
//       {tabIndex === 0 ? <ConsultationTable /> : <RegisteredTable />}
//     </Box>
//   );
// };

// export default RegisterNewPage;


import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ConsultationTable from "../../components/Tables/ConsultationTable";
import RegisteredTable from "../../components/Tables/RegisteredTable";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SearchIcon from "@mui/icons-material/Search";

const RegisterNewPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#002554" }}>
        Đăng ký buổi tư vấn
      </Typography>

      {/* ====== TABS + SEARCH BAR TRÊN CÙNG ====== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* TABS bên trái */}
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          sx={{
            bgcolor: "#00173D",
            borderRadius: "50px",
            padding: "4px",
            minHeight: "45px",
            "& .MuiTabs-indicator": { display: "none" },
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
            }}
          />
        </Tabs>

        {/* SEARCH BAR bên phải — chỉ hiện khi tabIndex = 0 */}
        {tabIndex === 0 && (
          <Box sx={{  ml: 0.5, flexGrow: 0.5, maxWidth: "350px", }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  paddingRight: "8px",
                  "& fieldset": { borderColor: "#d0d7de" },
                  "&:hover fieldset": { borderColor: "#b5bcc5" },
                },
                backgroundColor: "#fff",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        backgroundColor: "#0A1D50",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        "&:hover": { backgroundColor: "#0d2a6d" },
                      }}
                    >
                      <SearchIcon sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Box>

      {/* CONTENT */}
      {tabIndex === 0 ? (
        <ConsultationTable searchValue={searchValue} />
      ) : (
        <RegisteredTable />
      )}
    </Box>
  );
};

export default RegisterNewPage;
