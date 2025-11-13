import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import Button from "../../components/Button.jsx";
import Searchbar from "../../components/Searchbar.jsx";
import Pagination from "../../components/Pagination.jsx";

const MOCK_STUDENTS = [
  {
    name: "John",
    mssv: "1234561",
    email: "john@gmail.com",
    country: "Việt Nam",
  },
  {
    name: "Doe",
    mssv: "1234562",
    email: "doe@gmail.com",
    country: "Singapore",
  },
  { name: "Sam", mssv: "1234563", email: "sam@gmail.com", country: "Việt Nam" },
  {
    name: "Kumar",
    mssv: "1234564",
    email: "kumar@gmail.com",
    country: "Việt Nam",
  },
  {
    name: "Sanjay",
    mssv: "1234565",
    email: "sanjay@gmail.com",
    country: "Australia",
  },
];

const ITEMS_PER_PAGE = 5;

const StudentList = ({ students = MOCK_STUDENTS }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSearchChange = (eOrValue) => {
    const value = eOrValue?.target?.value ?? eOrValue ?? "";
    setSearch(value);
    setPage(1);
  };

  return (
    // nền xám nhạt bo tròn như hình
    <Box
      sx={{
        bgcolor: "#f1f1f1",
        borderRadius: 4,
        p: 4,
      }}
    >
      {/* tiêu đề + mã lớp */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", flex: 1 }}
        >
          Danh sách sinh viên
        </Typography>

        <Box
          sx={{
            bgcolor: "#c9a46b",
            color: "white",
            px: 3,
            py: 0.7,
            borderRadius: 999,
            fontWeight: 600,
            ml: 2,
            whiteSpace: "nowrap",
          }}
        >
          CNPM_123
        </Box>
      </Box>

      {/* search + filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Searchbar
            placeholder="Tìm kiếm sinh viên..."
            value={search}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      {/* card bảng */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "#ffffff",
        }}
      >
        {/* header bảng – vàng nhạt */}
        <Box
          sx={{
            bgcolor: "#f4e7cf",
            px: 3,
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "30%", fontWeight: 600 }}>Họ và tên</Box>
            <Box sx={{ width: "15%", fontWeight: 600 }}>MSSV</Box>
            <Box sx={{ width: "35%", fontWeight: 600 }}>Email</Box>
            <Box sx={{ width: "20%", fontWeight: 600 }}>Quốc gia</Box>
          </Box>
        </Box>

        {/* body bảng */}
        <Box sx={{ px: 1 }}>
          <Table size="small">
            <TableBody>
              {paginated.map((st, idx) => (
                <TableRow key={idx}>
                  <TableCell width="30%">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar>{st.name[0]}</Avatar>
                      <Typography>{st.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell width="15%">{st.mssv}</TableCell>
                  <TableCell width="35%">{st.email}</TableCell>
                  <TableCell width="20%">{st.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination – dùng component của bạn */}
        <Box sx={{ px: 3, py: 1.5 }}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentList;
