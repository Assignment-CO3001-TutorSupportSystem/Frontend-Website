import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const mockData = [
  {
    id: 1,
    name: "Lê Đình Thuận",
    khoa: "KH & KTMT",
    hocvi: "ĐA hướng",
    chuyenmon: "CNPM",
    sobuoi: 3,
  },
];

const ConsultationTable = () => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead sx={{ bgcolor: "#eceff1" }}>
        <TableRow>
          <TableCell>STT</TableCell>
          <TableCell>Giảng viên</TableCell>
          <TableCell>Khoa</TableCell>
          <TableCell>Học vị</TableCell>
          <TableCell>Chuyên môn</TableCell>
          <TableCell>Số buổi tư vấn</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mockData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.khoa}</TableCell>
            <TableCell>{row.hocvi}</TableCell>
            <TableCell>{row.chuyenmon}</TableCell>
            <TableCell>{row.sobuoi}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ConsultationTable;
