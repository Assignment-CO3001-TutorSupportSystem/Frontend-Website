import React from "react";
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

import { useTutorSession } from "../../hooks/useTutorSession";

const ITEMS_PER_PAGE = 7;

const TutorSessionContent = ({ tutorId, tutorName }) => {
  // 👉 Hook xử lý logic lọc + tìm kiếm + phân trang
  const {
    search,
    page,
    setPage,
    filterOpen,
    setFilterOpen,
    statusFilter,
    setStatusFilter,
    locationFilter,
    setLocationFilter,
    handleSearchChange,
    clearFilter,
    totalPages,
    paginated,
  } = useTutorSession(tutorId, tutorName, ITEMS_PER_PAGE);

  return (
    <Box sx={{ bgcolor: "#e7f0f4", borderRadius: 4, p: 3 }}>
      {/* card lớn chứa search + bảng */}
      <Box sx={{ bgcolor: "#e7f0f4", borderRadius: 4, p: 3 }}>
        {/* 🔍 Hàng search + filter */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
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
                sx: { borderRadius: 999, bgcolor: "white", px: 1 },
              }}
            />
          </Box>

          <Button width={80} height={40} onClick={() => setFilterOpen(true)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <FilterListIcon sx={{ fontSize: 20 }} />
              <span>Lọc</span>
            </Box>
          </Button>
        </Box>

        {/* 📄 Bảng danh sách session */}
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
          {/* Header bảng */}
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Danh sách các buổi tư vấn
              {tutorName ? ` của ${tutorName}` : ""}
            </Typography>
          </Box>

          {/* Bảng */}
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

          {/* 🔢 Pagination */}
          <Box
            sx={{
              px: 3,
              py: 1,
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

      {/* 🧰 Popup Filter */}
      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Lọc buổi tư vấn</DialogTitle>

        <DialogContent dividers>
          {/* Trạng thái */}
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

          {/* Địa điểm */}
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
