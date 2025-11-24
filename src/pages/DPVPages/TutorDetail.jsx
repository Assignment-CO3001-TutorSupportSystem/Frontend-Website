// src/pages/Admin/TutorDetail.jsx
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
import { useParams } from "react-router-dom";

import Pagination from "../../components/Pagination.jsx";
import Button from "../../components/Button.jsx";
import { TUTORS, TUTOR_SESSIONS } from "../../data/tutorData.js";

const ITEMS_PER_PAGE = 5;

export default function TutorDetail() {
  const { sessionId } = useParams();

  // Tìm buổi tư vấn hiện tại
  const currentSession =
    TUTOR_SESSIONS.find((s) => s.id === sessionId) || TUTOR_SESSIONS[0];

  // Tìm tutor tương ứng
  const tutor =
    TUTORS.find((t) => t.id === currentSession.tutorId) || {
      id: "",
      name: currentSession.tutorName,
      email: "",
      gender: "",
      phone: "",
      subject: currentSession.subject,
    };

  // Các buổi tư vấn khác của cùng tutor
  const sessionsOfTutor = TUTOR_SESSIONS.filter(
    (s) => s.tutorId === tutor.id
  );

  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(sessionsOfTutor.length / ITEMS_PER_PAGE)
  );
  const start = (page - 1) * ITEMS_PER_PAGE;
  const data = sessionsOfTutor.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Tiêu đề */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#002554", flex: 1 }}
          >
            Thông tin chi tiết buổi tư vấn
          </Typography>
        </Box>

        {/* CARD: Thông tin cá nhân tutor */}
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
            <Typography sx={{ fontWeight: 600 }}>Thông tin tutor</Typography>
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
                {tutor.name?.[0] ?? "T"}
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

        {/* CARD: Thông tin buổi tư vấn hiện tại */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 3,
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
            <Typography sx={{ fontWeight: 600 }}>
              Thông tin buổi tư vấn
            </Typography>
          </Box>

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
                <strong>Số lượng:</strong>{" "}
                {currentSession.registered}/{currentSession.maxStudents}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* CARD: Các buổi tư vấn khác của tutor */}
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
            <Typography sx={{ fontWeight: 600 }}>
              Các buổi tư vấn khác của {tutor.name}
            </Typography>
          </Box>

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
                {data.map((s) => (
                  <TableRow
                    key={s.id}
                    selected={s.id === currentSession.id}
                  >
                    <TableCell>{s.time}</TableCell>
                    <TableCell>{s.topic}</TableCell>
                    <TableCell>{s.location}</TableCell>
                    <TableCell>{s.status}</TableCell>
                    <TableCell>
                      {s.registered}/{s.maxStudents}
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Chưa có buổi tư vấn nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

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
