import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import RegisterButton from "../Buttons/RegisterButton"; 


  const AvailableSessions = ({ tutor }) => {
    if (!tutor) return null;

    // Dữ liệu mẫu có thêm tutorName
    const sessions = [
      // 🟦 Lê Đình Thuận – Buổi 1
      {
        id: 1,
        tutorName: "Lê Đình Thuận",
        nhom: "MT01",
        soLuong: "5/20",
        noiDung: "Hướng dẫn NCKH",
        hinhThuc: "Trực tiếp",
        ngay: "4/11/2025",
        gio: "13:00",
        phong: "CS1-H6-201",
        lichDangKy: "27/10/2025 - 2/11/2025",
      },
      // 🟦 Buổi 2
      {
        id: 2,
        tutorName: "Lê Đình Thuận",
        nhom: "MT02",
        soLuong: "10/25",
        noiDung: "Định hướng chuyên ngành",
        hinhThuc: "Online",
        ngay: "5/11/2025",
        gio: "09:00",
        phong: "Google Meet",
        lichDangKy: "28/10/2025 - 3/11/2025",
      },
      // 🟦 Buổi 3
      {
        id: 4,
        tutorName: "Lê Đình Thuận",
        nhom: "MT03",
        soLuong: "7/20",
        noiDung: "Tư vấn đồ án tốt nghiệp",
        hinhThuc: "Trực tiếp",
        ngay: "7/11/2025",
        gio: "15:00",
        phong: "CS1-H3-105",
        lichDangKy: "30/10/2025 - 5/11/2025",
      },

      // 🟩 Nguyễn Thị Minh – Buổi 1
      {
        id: 3,
        tutorName: "Nguyễn Thị Minh",
        nhom: "HM01",
        soLuong: "8/20",
        noiDung: "Tư vấn vật liệu mới",
        hinhThuc: "Trực tiếp",
        ngay: "6/11/2025",
        gio: "15:30",
        phong: "CS2-H2-105",
        lichDangKy: "29/10/2025 - 4/11/2025",
      },
      // 🟩 Buổi 2
      {
        id: 5,
        tutorName: "Nguyễn Thị Minh",
        nhom: "HM02",
        soLuong: "6/25",
        noiDung: "Hướng dẫn nghiên cứu chuyên sâu",
        hinhThuc: "Online",
        ngay: "8/11/2025",
        gio: "10:00",
        phong: "Zoom",
        lichDangKy: "30/10/2025 - 6/11/2025",
      },
    ];


    // Lọc buổi tư vấn theo đúng tutor đang được chọn
    const filteredSessions = sessions.filter(
      (s) => s.tutorName === tutor.name
    );

    // Nếu không có dữ liệu thì báo
    if (filteredSessions.length === 0)
      return <div>Không có buổi tư vấn khả dụng cho giảng viên này.</div>;

    // Hàm xử lý đăng ký
    const handleRegister = (session) => {
      alert(`Đăng ký thành công buổi tư vấn ${session.nhom}!`);
    };

    return (
      <Paper elevation={2} sx={{ borderRadius: "10px", padding: 2, backgroundColor: "#F8F9FB" }}>
        <Table>
          <TableHead sx={{ background: "#00173D" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nhóm lớp</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sĩ số</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nội dung</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Hình thức</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ngày</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Giờ</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phòng học</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Lịch đăng ký</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.nhom}</TableCell>
                <TableCell>{session.soLuong}</TableCell>
                <TableCell>{session.noiDung}</TableCell>
                <TableCell>{session.hinhThuc}</TableCell>
                <TableCell>{session.ngay}</TableCell>
                <TableCell>{session.gio}</TableCell>
                <TableCell>{session.phong}</TableCell>
                <TableCell>{session.lichDangKy}</TableCell>
                <TableCell>
                  <RegisterButton onClick={() => handleRegister(session)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  export default AvailableSessions;
