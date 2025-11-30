// UI component: chỉ hiển thị layout + gọi hook lấy logic
import React from "react";
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

import Pagination from "../../components/Pagination";
import useTutorDetail from "../../hooks/useTutorDetail";

export default function TutorDetail() {
  // Lấy dữ liệu từ custom hook
  const {
    tutor,
    currentSession,
    paginatedSessions,
    page,
    totalPages,
    setPage,
  } = useTutorDetail();

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* ----------------- TIÊU ĐỀ TRANG ----------------- */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#002554", flex: 1 }}
          >
            Thông tin chi tiết buổi tư vấn
          </Typography>
        </Box>

        {/* ----------------- THẺ: THÔNG TIN TUTOR ----------------- */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 3,
            bgcolor: "#F5F5F5",
          }}
        >
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>Thông tin tutor</Typography>
          </Box>

          {/* Avatar + thông tin cá nhân */}
          <Box sx={{ px: 3, py: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                sx={{ width: 80, height: 80, bgcolor: "#FF7043", fontSize: 32 }}
              >
                {tutor.name?.[0] ?? "T"}
              </Avatar>

              {/* Grid thông tin */}
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
                  <strong>Mã tutor:</strong> {tutor.id || "—"}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {tutor.email || "—"}
                </Typography>
                <Typography variant="body2">
                  <strong>Giới tính:</strong> {tutor.gender || "—"}
                </Typography>
                <Typography variant="body2">
                  <strong>Số điện thoại:</strong> {tutor.phone || "—"}
                </Typography>
                <Typography variant="body2">
                  <strong>Chuyên môn:</strong> {tutor.subject || "—"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* ----------------- THẺ: THÔNG TIN BUỔI TƯ VẤN ----------------- */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 3,
            bgcolor: "#FFFFFF",
          }}
        >
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Thông tin buổi tư vấn
            </Typography>
          </Box>

          {/* Chi tiết buổi tư vấn */}
          <Box sx={{ px: 3, py: 2 }}>
            <Box sx={{ display: "grid", rowGap: 1.2 }}>
              <Typography variant="body2">
                <strong>Chủ đề:</strong> {currentSession.topic}
              </Typography>
              <Typography variant="body2">
                <strong>Môn học:</strong> {currentSession.subject}
              </Typography>
              <Typography variant="body2">
                <strong>Thời gian:</strong> {currentSession.time}
              </Typography>
              <Typography variant="body2">
                <strong>Địa điểm:</strong> {currentSession.location}
              </Typography>
              <Typography variant="body2">
                <strong>Trạng thái:</strong> {currentSession.status}
              </Typography>
              <Typography variant="body2">
                <strong>Số lượng:</strong> {currentSession.registered}/
                {currentSession.maxStudents}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* ----------------- THẺ: CÁC BUỔI KHÁC CỦA TUTOR ----------------- */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            flexDirection: "column",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Các buổi tư vấn khác của {tutor.name}
            </Typography>
          </Box>

          {/* Bảng danh sách buổi tư vấn */}
          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Chủ đề</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Địa điểm</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Số lượng</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedSessions.map((s) => (
                  <TableRow key={s.id} selected={s.id === currentSession.id}>
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.topic}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell>{s.status}</TableCell>
                    <TableCell>
                      {s.registered}/{s.maxStudents}
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedSessions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Chưa có buổi tư vấn nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Phân trang */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ color: "#607189" }}>
              Trang {page}/{totalPages}
            </Typography>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
