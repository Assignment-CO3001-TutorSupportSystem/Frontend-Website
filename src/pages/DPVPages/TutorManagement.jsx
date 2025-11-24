// src/pages/Admin/TutorManagement.jsx
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
  IconButton,
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button.jsx";
import Searchbar from "../../components/Searchbar.jsx";
import Pagination from "../../components/Pagination.jsx";
import {
  TUTOR_SESSIONS,
} from "../../data/tutorData.js";

const ITEMS_PER_PAGE = 7;

export default function TutorManagement() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value ?? "";
    setSearch(value);
    setPage(1);
  };

  const searchLower = search.toLowerCase();

  // Lọc theo Họ tên + Chủ đề
  const filtered = TUTOR_SESSIONS.filter(
    (s) =>
      s.tutorName.toLowerCase().includes(searchLower) ||
      s.topic.toLowerCase().includes(searchLower)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const data = filtered.slice(start, start + ITEMS_PER_PAGE);

  const renderStatusChip = (status) => {
    const isFull = status === "Full";
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          minWidth: 90,
          bgcolor: isFull ? "#ECEFF1" : "#E8F5E9",
          color: isFull ? "#455A64" : "#2E7D32",
          fontWeight: 600,
        }}
      />
    );
  };

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Tiêu đề */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 3, color: "#002554" }}
        >
          Quản lý tutor
        </Typography>

        {/* Thanh công cụ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Button variant="secondary" width={90} height={40}>
            Xóa
          </Button>

          <Box sx={{ ml: "auto", display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ minWidth: 260, maxWidth: 360 }}>
              <Searchbar
                placeholder="Tìm kiếm theo tên hoặc chủ đề..."
                value={search}
                onChange={handleSearchChange}
              />
            </Box>

            <Box
              sx={{
                bgcolor: "#002554",
                color: "white",
                px: 2.5,
                py: 1.2,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate("/tutorPendingList")}
            >
              <DescriptionOutlinedIcon fontSize="small" />
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Danh sách chờ duyệt
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Card bảng */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#F5F8FB",
          }}
        >
          {/* Header tối */}
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Các buổi tư vấn của tutor
            </Typography>
          </Box>

          {/* Bảng */}
          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Họ tên</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Chủ đề</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Môn học</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Xem
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.tutorName}</TableCell>
                    <TableCell>{s.topic}</TableCell>
                    <TableCell>{s.subject}</TableCell>
                    <TableCell>{renderStatusChip(s.status)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/tutorDetail/${s.id}`)}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Không có buổi tư vấn nào.
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
