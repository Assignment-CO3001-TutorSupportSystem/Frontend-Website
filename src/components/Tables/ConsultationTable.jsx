import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Button,
  Box
} from "@mui/material";
import AvailableSessions from "../../components/Tables/AvailableSessions";

const ConsultationTable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleRowClick = (tutor) => {
    setSelectedTutor(tutor);
    setOpenPopup(true);
  };

  // ===== PHÂN TRANG CUSTOM =====
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Dữ liệu mẫu
  const data = [
    { id: 1, name: "Lê Đình Thuận", khoa: "KH & KTMT", hocvi: "ThS", chuyenmon: "Công nghệ phần mềm", soBuoi: 3 },
    { id: 2, name: "Nguyễn Thị Minh", khoa: "Công nghệ Hóa học", hocvi: "ThS", chuyenmon: "Vật liệu mới", soBuoi: 2 },
    { id: 3, name: "Phạm Văn Long", khoa: "Điện - Điện tử", hocvi: "TS", chuyenmon: "Tự động hóa", soBuoi: 4 },
    { id: 4, name: "Trần Thị Hồng", khoa: "Xây dựng", hocvi: "ThS", chuyenmon: "Cơ sở hạ tầng", soBuoi: 1 },
    { id: 5, name: "Đỗ Quang Huy", khoa: "Cơ khí & Động lực", hocvi: "TS", chuyenmon: "Thiết bị năng lượng", soBuoi: 5 },
    { id: 6, name: "Lê Thị Phương", khoa: "Khoa học & Kỹ thuật Máy tính", hocvi: "ThS", chuyenmon: "Trí tuệ nhân tạo", soBuoi: 3 },
    { id: 7, name: "Vũ Minh Tuấn", khoa: "Hệ thống Công nghiệp", hocvi: "ThS", chuyenmon: "Quản lý sản xuất", soBuoi: 2 },
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Paper elevation={1} sx={{ borderRadius: "10px", overflow: "hidden", mt: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fb" }}>
            <TableRow>
              <TableCell><b>STT</b></TableCell>
              <TableCell><b>Giảng viên</b></TableCell>
              <TableCell><b>Khoa</b></TableCell>
              <TableCell><b>Học vị</b></TableCell>
              <TableCell><b>Chuyên môn</b></TableCell>
              <TableCell><b>Số buổi tư vấn</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row)}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e9ecef" } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.khoa}</TableCell>
                <TableCell>{row.hocvi}</TableCell>
                <TableCell>{row.chuyenmon}</TableCell>
                <TableCell>{row.soBuoi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ==== CUSTOM PAGINATION (Giống hình bạn gửi) ==== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
          }}
        >
          <Button
            variant="outlined"
            disabled={page === 0}
            onClick={handlePrevious}
            sx={{
              borderRadius: "6px",
              fontWeight: "bold",
              color: "#002554",
              borderColor: "#9fb3c8",
              "&:hover": { borderColor: "#6b89a8" },
            }}
          >
            PREVIOUS
          </Button>

          <Button
            variant="outlined"
            disabled={page >= totalPages - 1}
            onClick={handleNext}
            sx={{
              borderRadius: "6px",
              fontWeight: "bold",
              color: "#002554",
              borderColor: "#9fb3c8",
              "&:hover": { borderColor: "#6b89a8" },
            }}
          >
            NEXT
          </Button>
        </Box>
      </Paper>

      {/* Popup hiện lịch tư vấn */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 2
          }}
        >
          <span style={{ margin: "auto" }}>Các buổi tư vấn khả dụng</span>

          <button
            onClick={() => setOpenPopup(false)}
            style={{
              minWidth: "32px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "auto"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          >
            ✕
          </button>
        </DialogTitle>

        <DialogContent>
          <AvailableSessions tutor={selectedTutor} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsultationTable;
