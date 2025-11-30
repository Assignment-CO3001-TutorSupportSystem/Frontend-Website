import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Pagination from "../../components/Pagination.jsx";
import { useStudentManagement } from "../../hooks/useStudentManagement.js";

export default function StudentManagement() {
  const {
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    selectedStudent,
    openStudentDetail,
    closeStudentDetail,
    toggleStudentActive,

    pagedStudents,
    totalPages,
  } = useStudentManagement();

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Quản lý sinh viên
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", mt: 3 }}>
        <TextField
          placeholder="Tìm kiếm sinh viên..."
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "20rem",
            "& .MuiOutlinedInput-root": {
              height: "2.5rem",
              borderRadius: "8px",
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>MSSV</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Họ và tên</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Khoa</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedStudents.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.department}</TableCell>

                <TableCell>
                  {s.active ? (
                    <Chip
                      label="Đang kích hoạt"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      label="Không kích hoạt"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </TableCell>

                <TableCell align="center">
                  <IconButton size="small" onClick={() => openStudentDetail(s)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            Trang {page}/{totalPages}
          </Typography>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Box>
      </TableContainer>

      {/* Student Detail Dialog */}
      <Dialog
        open={Boolean(selectedStudent)}
        onClose={closeStudentDetail}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 700, fontSize: 26 }}
        >
          Thông tin sinh viên
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography fontWeight={600}>Họ và tên</Typography>
              <Typography fontWeight={600}>MSSV</Typography>
              <Typography fontWeight={600}>Khoa</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>{selectedStudent?.name}</Typography>
              <Typography>{selectedStudent?.id}</Typography>
              <Typography>{selectedStudent?.department ?? "-"}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography fontWeight={600}>Email</Typography>
              <Typography sx={{ mt: 1 }}>
                {selectedStudent?.email ?? "-"}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ pb: 3, px: 4 }}>
          <Button
            variant={selectedStudent?.active ? "outlined" : "contained"}
            onClick={toggleStudentActive}
          >
            {selectedStudent?.active ? "Đang kích hoạt" : "Kích hoạt"}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={closeStudentDetail}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
