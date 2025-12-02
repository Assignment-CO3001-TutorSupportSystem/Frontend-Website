// src/components/dashboard/RecentTransactions.jsx
import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Box,
  TablePagination,
} from "@mui/material";

export default function RecentTransactions({ data }) {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Số lượng phiên họp tham gia
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>mssv</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tên</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Ngày tham gia</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Số lượng phiên học</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.datetime}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Paper>
  );
}
