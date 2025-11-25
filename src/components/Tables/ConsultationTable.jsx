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
} from "@mui/material";
import AvailableSessions from "../../components/Tables/AvailableSessions";

const ConsultationTable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleRowClick = (tutor) => {
    setSelectedTutor(tutor);
    setOpenPopup(true);
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


  return (
    <>
      <Paper elevation={1} sx={{ borderRadius: "10px", overflow: "hidden" , mt: 1}}>
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
            {data.map((row) => (
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
      </Paper>

      {/* Popup hiện lịch tư vấn */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          Các buổi tư vấn khả dụng
        </DialogTitle>
        <DialogContent>
          <AvailableSessions tutor={selectedTutor} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsultationTable;
