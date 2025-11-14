// src/pages/StudentList.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
} from "@mui/material";

import Searchbar from "../../component/Searchbar.jsx";
import Pagination from "../../component/Pagination.jsx";

const MOCK_STUDENTS = [
  { name: "John",  mssv: "1234561", email: "john@gmail.com",  country: "Việt Nam" },
  { name: "Doe",   mssv: "1234562", email: "doe@gmail.com",   country: "Singapore" },
  { name: "Sam",   mssv: "1234563", email: "sam@gmail.com",   country: "Việt Nam" },
  { name: "Kumar", mssv: "1234564", email: "kumar@gmail.com", country: "Việt Nam" },
  { name: "Sanjay",mssv: "1234565", email: "sanjay@gmail.com",country: "Australia" },
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
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Hàng trên: CNPM_123 bên trái, ô search bên phải */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Tag CNPM_123 bên trái */}
          <Box
            sx={{
              bgcolor: "#002554",
              color: "white",
              px: 3,
              py: 1,
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 16,
              whiteSpace: "nowrap",
            }}
          >
            CNPM_123
          </Box>

          {/* Searchbar bên phải */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 420,
              minWidth: 260,
              ml: "auto",
            }}
          >
            <Searchbar
              placeholder="Tìm kiếm sinh viên..."
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>

        {/* Card bảng sinh viên */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f5f8fb",
          }}
        >
          {/* Thanh dài màu xanh đậm: tiêu đề danh sách */}
          <Box
            sx={{
              bgcolor: "#002554",
              color: "white",
              px: 3,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Danh sách sinh viên
            </Typography>
          </Box>

          {/* Bảng dữ liệu */}
          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table
              size="small"
              sx={{
                minWidth: 720, // tránh bị bóp quá nhỏ
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Họ và tên</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>MSSV</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quốc gia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((st, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar>{st.name[0]}</Avatar>
                        <Typography>{st.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{st.mssv}</TableCell>
                    <TableCell>{st.email}</TableCell>
                    <TableCell>{st.country}</TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography align="center">
                        Không tìm thấy sinh viên nào.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#607189" }}>
              Trang {page}/{totalPages}
            </Typography>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default StudentList;
