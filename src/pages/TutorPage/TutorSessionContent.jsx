// src/pages/.../TutorSessionContent.jsx
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
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import Button from "../../components/Button.jsx";
import Pagination from "../../components/Pagination.jsx";
import Searchbar from "../../components/Searchbar.jsx";
import { useSessions } from "../../context/SessionContext.jsx";

const ITEMS_PER_PAGE = 7;

const TutorSessionContent = ({ tutorId, tutorName }) => {
  const { sessions } = useSessions(); // 👉 lấy data từ context
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // FILTER POPUP
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(""); // "Còn nhận" | "Full" | ""
  const [locationFilter, setLocationFilter] = useState("");

  // 1️⃣ Lọc theo tutor
  let data = sessions;

  if (tutorId) {
    data = data.filter((s) => s.tutorId === tutorId);
  } else if (tutorName) {
    data = data.filter((s) => s.tutorName === tutorName);
  }

  // 2️⃣ Lọc theo filter popup
  if (statusFilter) {
    data = data.filter((s) => s.status === statusFilter);
  }
  if (locationFilter.trim()) {
    const locLower = locationFilter.toLowerCase();
    data = data.filter((s) => s.location.toLowerCase().includes(locLower));
  }

  // 3️⃣ Lọc theo ô search (chủ đề / địa điểm / thời gian)
  const searchLower = search.toLowerCase();
  const filtered = data.filter(
    (s) =>
      s.topic.toLowerCase().includes(searchLower) ||
      s.location.toLowerCase().includes(searchLower) ||
      s.time.toLowerCase().includes(searchLower)
  );

  // 4️⃣ Phân trang
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSearchChange = (eOrValue) => {
    const value = eOrValue?.target?.value ?? eOrValue ?? "";
    setSearch(value);
    setPage(1);
  };

  const clearFilter = () => {
    setStatusFilter("");
    setLocationFilter("");
  };

  return (
    <Box sx={{ bgcolor: "#e7f0f4", borderRadius: 4, p: 3 }}>
      {/* card lớn: search + bảng */}
      <Box sx={{ bgcolor: "#dfecef", borderRadius: 4, p: 3 }}>
        {/* Hàng search + filter */}
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
              placeholder="Tìm buổi tư vấn..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 999,
                  bgcolor: "white",
                  px: 1,
                },
              }}
            />
          </Box>

          <Button onClick={() => setFilterOpen(true)}>
            <FilterListIcon style={{ marginRight: 4 }} />
            Filter
          </Button>
        </Box>

        {/* card chứa bảng */}
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
          {/* header bảng */}
          <Box
            sx={{
              bgcolor: "#002554",
              color: "white",
              px: 3,
              py: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Danh sách các buổi tư vấn
              {tutorName ? ` của ${tutorName}` : ""}
            </Typography>
          </Box>

          {/* bảng */}
          <Box sx={{ px: 3, py: 1 }}>
            <Table size="small">
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
                {paginated.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.topic}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.registered}/{row.maxStudents}
                    </TableCell>
                  </TableRow>
                ))}

                {paginated.length === 0 && (
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
              py: 1,
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
              onPageChange={setPage}
            />
          </Box>
        </Paper>
      </Box>

      {/* POPUP FILTER */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Lọc buổi tư vấn</DialogTitle>
        <DialogContent dividers>
          <TextField
            select
            fullWidth
            label="Trạng thái"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="Còn nhận">Còn nhận</MenuItem>
            <MenuItem value="Full">Full</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Địa điểm (chứa...)"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={clearFilter}>
            Xóa lọc
          </Button>
          <Button onClick={() => setFilterOpen(false)}>Áp dụng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutorSessionContent;
