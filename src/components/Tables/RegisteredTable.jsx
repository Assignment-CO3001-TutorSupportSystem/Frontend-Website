

import React, { useState } from "react";
import {
  Button,
  Box,
  Modal,
  Typography,
  Paper
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",          // popup to ra
  maxWidth: "1000px",    // tối đa 1000px
  maxHeight: "80vh",     // chiếm tối đa 80% chiều cao màn hình
  overflowY: "auto",     // nếu nội dung quá dài sẽ có scroll
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "14px",
  p: 3,
};


const RegisteredTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  // ⭐ Giả lập danh sách buổi tư vấn khác của Tutor
  const tutorSessions = {
  "Lê Đình Thuận": [
    {
      group: "MT01",
      size: "5/20",
      topic: "Hướng dẫn NCKH",
      type: "Trực tiếp",
      date: "4/11/2025",
      time: "13:00",
      room: "CS1-H6-201",
      register: "27/10/2025 - 2/11/2025"
    },

    {
      group: "MT03",
      size: "7/20",
      topic: "Tư vấn đồ án tốt nghiệp",
      type: "Trực tiếp",
      date: "7/11/2025",
      time: "15:00",
      room: "CS1-H3-105",
      register: "30/10/2025 - 5/11/2025"
    }
  ]
};


  const handleOpen = (tutorName) => {
    setSelectedTutor(tutorName);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        mt: 3,
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
                  "&:hover": { backgroundColor: "#ADD6E4" },
                }}
                onClick={() => handleOpen("Lê Đình Thuận")}
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
                  "&:hover": { backgroundColor: "#E78575" },
                }}
              >
                Xóa
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ⭐ MODAL CHUYỂN BUỔI TƯ VẤN ⭐ */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={style}>
          
          {/* Nút X đóng popup */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Các buổi tư vấn khác của {selectedTutor}
            </Typography>

            <Button
              onClick={() => setOpen(false)}
              sx={{
                minWidth: "32px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" }
              }}
            >
              ✕
            </Button>
          </Box>

          {/* Bảng hiển thị danh sách */}
          <Box sx={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px"
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#00173D", color: "white", height: "45px" }}>
                  <th style={{ padding: "8px" }}>Nhóm lớp</th>
                  <th style={{ padding: "8px" }}>Sĩ số</th>
                  <th style={{ padding: "8px" }}>Nội dung</th>
                  <th style={{ padding: "8px" }}>Hình thức</th>
                  <th style={{ padding: "8px" }}>Ngày</th>
                  <th style={{ padding: "8px" }}>Giờ</th>
                  <th style={{ padding: "8px" }}>Phòng học</th>
                  <th style={{ padding: "8px" }}>Lịch đăng ký</th>
                  <th style={{ padding: "8px" }}>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {selectedTutor &&
                  tutorSessions[selectedTutor]?.map((s, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: "#ffffff",
                        height: "50px",
                        borderBottom: "1px solid #e0e0e0"
                      }}
                    >
                      <td style={{ padding: "8px" }}>{s.group}</td>
                      <td style={{ padding: "8px" }}>{s.size}</td>
                      <td style={{ padding: "8px" }}>{s.topic}</td>
                      <td style={{ padding: "8px" }}>{s.type}</td>
                      <td style={{ padding: "8px" }}>{s.date}</td>
                      <td style={{ padding: "8px" }}>{s.time}</td>
                      <td style={{ padding: "8px" }}>{s.room}</td>
                      <td style={{ padding: "8px" }}>{s.register}</td>

                      <td style={{ padding: "8px", textAlign: "center" }}>
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#ADD6E4",
                            borderRadius: "6px",
                            "&:hover": { backgroundColor: "#29B6F6" }
                          }}
                        >
                          Chọn
                        </Button>
                      </td>
                    </tr>
                  ))}

                {(!selectedTutor || tutorSessions[selectedTutor]?.length === 0) && (
                  <tr>
                    <td colSpan="9" style={{ padding: "15px", textAlign: "center" }}>
                      Không có buổi tư vấn nào khác.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RegisteredTable;
