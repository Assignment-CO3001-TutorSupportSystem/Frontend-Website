// src/pages/TutorDetail.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import Pagination from "../../components/Pagination.jsx";

// >>> HARD CODE THÔNG TIN Ở ĐÂY <<<
const TUTOR_DETAIL = {
  id: "999999",
  name: "Loan Nguyễn",
  email: "loan@hcmut.edu.vn",
  gender: "Nữ",
  phone: "0987654321",
  subject: "Giải tích 1",
};

const SESSIONS = [
  {
    time: "07:00 15/10/25",
    topic: "Kiều Minh",
    location: "H6-111",
    quantity: 3,
  },
  {
    time: "10:00 15/10/25",
    topic: "Minh",
    location: "H2-810",
    quantity: 4,
  },
  {
    time: "15:00 15/10/25",
    topic: "Hồ Thị Minh Thu",
    location: "H1-703",
    quantity: 1,
  },
  { time: "15:30 15/10/25", topic: "Frieren", location: "Online", quantity: 2 },
  { time: "17:00 15/10/25", topic: "Frieren", location: "Online", quantity: 2 },
];

const ITEMS_PER_PAGE = 5;

export default function TutorDetail() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(SESSIONS.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const data = SESSIONS.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* CARD: Thông tin cá nhân */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 3,
            bgcolor: "#F5F5F5",
          }}
        >
          <Box
            sx={{
              bgcolor: "#002554",
              color: "white",
              px: 3,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Thông tin cá nhân</Typography>
          </Box>

          <Box sx={{ px: 3, py: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#FF7043",
                  fontSize: 32,
                }}
              >
                {TUTOR_DETAIL.name[0]}
              </Avatar>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  columnGap: 4,
                  rowGap: 1,
                  flex: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>Mã số:</strong> {TUTOR_DETAIL.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {TUTOR_DETAIL.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Giới tính:</strong> {TUTOR_DETAIL.gender}
                </Typography>
                <Typography variant="body2">
                  <strong>Số điện thoại:</strong> {TUTOR_DETAIL.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Chuyên môn:</strong> {TUTOR_DETAIL.subject}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* CARD: Các buổi tư vấn */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              bgcolor: "#002554",
              color: "white",
              px: 3,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Các buổi tư vấn</Typography>
          </Box>

          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Chuyên đề</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Địa điểm</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.topic}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell>{s.quantity}</TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Chưa có buổi tư vấn nào.
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
}
