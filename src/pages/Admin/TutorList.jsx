// src/pages/TutorList.jsx
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
  Checkbox,
  IconButton,
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import Button from "../../components/Button.jsx";
import Searchbar from "../../components/Searchbar.jsx";
import Pagination from "../../components/Pagination.jsx";

// >>> CHỈNH SỬA DỮ LIỆU Ở ĐÂY <<<
const TUTORS = [
  { name: "Loan Nguyễn", subject: "Giải tích 1", status: "Còn nhận" },
  { name: "Nguyễn Loan", subject: "Vật lý 1", status: "Còn nhận" },
  { name: "Lona Nguyễn", subject: "Giải tích 2", status: "Full" },
  { name: "Alibaba", subject: "Công nghệ phần mềm", status: "Full" },
  { name: "Alibaba", subject: "Hệ cơ sở dữ liệu", status: "Còn nhận" },
  { name: "Alibaba", subject: "Nguyên lý ngôn ngữ lập trình", status: "Full" },
  { name: "Alibaba", subject: "Hóa đại cương", status: "Còn nhận" },
];

const ITEMS_PER_PAGE = 7;

export default function TutorList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (e) => {
    const value = e.target.value ?? "";
    setSearch(value);
    setPage(1);
  };

  // Lọc + phân trang đơn giản
  const filtered = TUTORS.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
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
                placeholder="Tìm kiếm tutor..."
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
              Danh sách tutor
            </Typography>
          </Box>

          {/* Bảng */}
          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell sx={{ fontWeight: 600 }}>Họ tên</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Môn học</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Xem
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell>{renderStatusChip(t.status)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Không có tutor nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination giống StudentList */}
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

            {/* Nếu Pagination.jsx chưa nhận props, bạn có thể tạm thay bằng Pagination của MUI */}
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
