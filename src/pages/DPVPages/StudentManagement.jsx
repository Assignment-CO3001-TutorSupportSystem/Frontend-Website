import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import CustomButton from "../../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "../../components/Pagination.jsx";

// Example/mock data for the table
const sampleStudents = [
  {
    id: "2311234",
    name: "Tran Pick Mink",
    email: "nv.a@example.com",
    tutor: "Tutor 1",
    department: "Khoa hoc va Ky thuat May tinh",
  },
  {
    id: "2311235",
    name: "Trần Thị B",
    email: "tt.b@example.com",
    tutor: "Tutor 2",
    department: "Xay dung",
  },
  {
    id: "2311236",
    name: "Lê Văn C",
    email: "lv.c@example.com",
    tutor: "Tutor 1",
    department: "Co khi",
  },
  {
    id: "2311237",
    name: "Nguyen Thi Kieu Mink",
    email: "pt.d@example.com",
    tutor: "Tutor 3",
    department: "Dien - dien tu",
  },
  {
    id: "2311238",
    name: "Loan Nguyễn",
    email: "loan@example.com",
    tutor: "Tutor 2",
    department: "Kỹ thuật Hóa học",
  },
  {
    id: "2311239",
    name: "Minh",
    email: "minh@example.com",
    tutor: "Tutor 1",
    department: "Khoa học và Kỹ thuật Máy tính",
  },
  {
    id: "2311240",
    name: "Hồ Thị Minh Thu",
    email: "thu@example.com",
    tutor: "Tutor 3",
    department: "Địa chất",
  },
];

const StudentManagement = () => {
  const [page, setPage] = useState(0);
  const pageSize = 5; // items per page
  const totalPages = Math.max(1, Math.ceil(sampleStudents.length / pageSize));

  const pagedStudents = sampleStudents.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Quản lý sinh viên
        </Typography>

        {/* dropdown list */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Box component="span" sx={{ mr: 1 }}>
            Đang hiển thị danh sách sinh viên của
          </Box>
          <Box component="span">
            <select style={{ padding: "4px 8px", borderRadius: 6 }}>
              <option value="all">Tất cả</option>
              <option value="tutor1">Tutor 1</option>
              <option value="tutor2">Tutor 2</option>
              <option value="tutor3">Tutor 3</option>
            </select>
          </Box>
        </Box>

        {/* search row */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <TextField
            placeholder="Tìm kiếm sinh viên..."
            variant="outlined"
            size="small"
            sx={{
              width: "20rem",
              "& .MuiOutlinedInput-root": {
                height: "2.5rem",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "0 10px",
                fontSize: "16px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ ml: "auto" }}>
            <CustomButton
              sx={{
                width: "10rem",
                height: "2.5rem",
                borderRadius: "11px",
                fontSize: "12px",
              }}
              icon={<AddIcon />}
            >
              Thêm sinh viên
            </CustomButton>
          </Box>
        </Box>

        {/* Students table (4 columns) */}
        <Box sx={{ mt: 4 }}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "none",
              borderRadius: 1,
            }}
          >
            <Table
              size="small"
              sx={{ "& td, & th": { borderBottom: "1px dotted #dbdbdbff" } }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>MSSV</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Họ và tên</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Khoa</TableCell>
                  <TableCell
                    sx={{ fontWeight: 700 }}
                    align="center"
                  ></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pagedStudents.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.department}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          aria-label="view"
                          sx={{ borderRadius: 1 }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>

                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#f4a9a0",
                            color: "#000",
                            "&:hover": { bgcolor: "#f08f86" },
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            padding: "6px 12px",
                          }}
                        >
                          Xóa
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination controls inside table container */}
            <Box sx={{ px: 2, py: 1 }}>
              <Pagination
                onPrevious={() => setPage((p) => Math.max(0, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disablePrevious={page === 0}
                disableNext={page >= totalPages - 1}
              />
            </Box>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentManagement;
