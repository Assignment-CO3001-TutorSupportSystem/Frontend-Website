import React from "react";
import { Button, Box } from "@mui/material";

const RegisteredTable = () => (
  <Box
    sx={{
      width: "100%",
      overflowX: "auto",
      mt: 3, // ⭐ Tạo khoảng cách với Tabs
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "10px",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "15px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#eceff1",
            height: "50px",
          }}
        >
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Nhóm lớp</th>
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Giảng viên</th>
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Nội dung</th>
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Ngày</th>
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Giờ</th>
          <th style={{ padding: "12px 16px", textAlign: "left" }}>Phòng học</th>
          <th style={{ padding: "12px 16px", textAlign: "center" }}>Hành động</th>
        </tr>
      </thead>

      <tbody>
        <tr
          style={{
            backgroundColor: "#ffffff",
            height: "56px",
            borderBottom: "1px solid #E0E0E0",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fbfd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          <td style={{ padding: "12px 16px" }}>MT02</td>
          <td style={{ padding: "12px 16px" }}>Lê Đình Thuận</td>
          <td style={{ padding: "12px 16px" }}>
            Hướng dẫn luận văn tốt nghiệp CNPM
          </td>
          <td style={{ padding: "12px 16px" }}>5/11/2025</td>
          <td style={{ padding: "12px 16px" }}>9:00 AM</td>
          <td style={{ padding: "12px 16px", fontWeight: 600 }}>Online</td>
          <td style={{ padding: "12px 16px", textAlign: "center" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                mr: 1,
                backgroundColor: "#C2E8F8",
                color: "black",
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#ADD6E4" }
              }}
            >
              Chuyển
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#F09889",
                color: "black",
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#E78575" }
              }}
            >
              Xóa
            </Button>

          </td>
        </tr>
      </tbody>
    </table>
  </Box>
);

export default RegisteredTable;
