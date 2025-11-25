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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import CustomButton from "../../components/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Chip from '@mui/material/Chip';
import Pagination from "../../components/Pagination.jsx";
import { STUDENTS } from "../../data/studentData.js";
// Example/mock data for the table
// const sampleStudents = [
//   {
//     id: "2311234",
//     name: "Tran Pick Mink",
//     email: "nv.a@example.com",
//     tutor: "Tutor 1",
//     department: "Khoa hoc va Ky thuat May tinh",
//   },
//   {
//     id: "2311235",
//     name: "Trần Thị B",
//     email: "tt.b@example.com",
//     tutor: "Tutor 2",
//     department: "Xay dung",
//   },
//   {
//     id: "2311236",
//     name: "Lê Văn C",
//     email: "lv.c@example.com",
//     tutor: "Tutor 1",
//     department: "Co khi",
//   },
//   {
//     id: "2311237",
//     name: "Nguyen Thi Kieu Mink",
//     email: "pt.d@example.com",
//     tutor: "Tutor 3",
//     department: "Dien - dien tu",
//   },
//   {
//     id: "2311238",
//     name: "Loan Nguyễn",
//     email: "loan@example.com",
//     tutor: "Tutor 2",
//     department: "Kỹ thuật Hóa học",
//   },
//   {
//     id: "2311239",
//     name: "Minh",
//     email: "minh@example.com",
//     tutor: "Tutor 1",
//     department: "Khoa học và Kỹ thuật Máy tính",
//   },
//   {
//     id: "2311240",
//     name: "Hồ Thị Minh Thu",
//     email: "thu@example.com",
//     tutor: "Tutor 3",
//     department: "Địa chất",
//   },
// ];

const StudentManagement = () => {
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // keep students in local state so UI actions update immediately
  const [students, setStudents] = useState(STUDENTS.map(s => ({ ...s, active: s.active ?? true })));
  const pageSize = 5; // items per page

  // list of unique tutors for the selector
  const tutors = Array.from(new Set(students.map((s) => s.tutor))).sort();

  // filtered students based on selected tutor and search term
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const byTutor = selectedTutor === "all" ? students : students.filter((s) => s.tutor === selectedTutor);
  const filteredStudents =
    normalizedSearch === ""
      ? byTutor
      : byTutor.filter((s) => {
          const hay = `${s.name} ${s.id} ${s.email ?? ""} ${s.department ?? ""}`.toLowerCase();
          return hay.includes(normalizedSearch);
        });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

  const start = (page - 1) * pageSize;
  const pagedStudents = filteredStudents.slice(start, start + pageSize);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Quản lý sinh viên
        </Typography>

        {/* dropdown list */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Box component="span" sx={{ mr: 1 }}>
            Đang hiển thị danh sách sinh viên của
          </Box>
          <Box component="span">
            <select
              value={selectedTutor}
              onChange={(e) => {
                setSelectedTutor(e.target.value);
                setPage(1);
              }}
              style={{ padding: "4px 8px", borderRadius: 6 }}
            >
              <option value="all">Tất cả</option>
              {tutors.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Box>
        </Box> */}

        {/* search row */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <TextField
            placeholder="Tìm kiếm sinh viên..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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

          {/* <Box sx={{ ml: "auto" }}>
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
          </Box> */}
        </Box>

        {/* Students table (4 columns) */}
        <Box sx={{ mt: 4 }}>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
        
              borderRadius: 1,
            }}
          >
            <Table
              size="small"
              sx={{ "& td, & th": { borderBottom: "1px dotted #7fcfe6" } }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>MSSV</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Họ và tên</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Khoa</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
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
                    <TableCell>
                      {s.active ? 
                        <Chip label="Đang kích hoạt" color="success" variant="outlined" size="small" /> : 
                        <Chip label="Không kích hoạt" color="error" variant="outlined" size="small" />
                      }
                    </TableCell>
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
                          onClick={() => setSelectedStudent(s)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>

                        

                        {/* <Button
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
                        </Button> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

              {/* Pagination controls inside table container */}
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
            
          </TableContainer>
            {/* Student detail dialog */}
            <Dialog
              open={Boolean(selectedStudent)}
              onClose={() => setSelectedStudent(null)}
              maxWidth="md"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  overflow: "hidden",
                },
              }}
            >
              <DialogTitle sx={{ textAlign: "center", fontWeight: 800, fontSize: 28, py: 3 }}>
                Thông tin sinh viên
              </DialogTitle>

              <DialogContent sx={{ bgcolor: "none", pt: 4, pb: 2 }}>
                <Grid container spacing={2} sx={{ px: 4 }}>
                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography sx={{ fontWeight: 600 }}>Họ và tên</Typography>
                      <Typography sx={{ fontWeight: 600 }}>MSSV</Typography>
                      <Typography sx={{ fontWeight: 600 }}>Khoa</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography sx={{ color: "#8a8a8a" }}>{selectedStudent?.name ?? "-"}</Typography>
                      <Typography sx={{ color: "#8a8a8a" }}>{selectedStudent?.id ?? "-"}</Typography>
                      <Typography sx={{ color: "#8a8a8a" }}>{selectedStudent?.department ?? "Không có"}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Email</Typography>
                        <Typography sx={{ color: "#8a8a8a", mt: 1 }}>{selectedStudent?.email ?? "-"}</Typography>
                      </Box>
                  
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions sx={{ px: 6, pb: 4 }}>
                
                <Box sx={{ flex: 1 }} />
                {/* Activation toggle placed inside dialog */}
                <Button
                  variant={selectedStudent?.active ? "outlined" : "contained"}
                  color={selectedStudent?.active ? "success" : "warning"}
                  onClick={() => {
                    if (!selectedStudent) return;
                    setStudents((prev) =>
                      prev.map((st) =>
                        st.id === selectedStudent.id ? { ...st, active: !st.active } : st
                      )
                    );
                    setSelectedStudent((prev) => (prev ? { ...prev, active: !prev.active } : prev));
                  }}
                  sx={{
                    bgcolor: selectedStudent?.active ? "#0fb51dff" : "#647a66ff", // active / inactive
                    color: selectedStudent?.active ? "#000" : "#fff",
                    '&:hover': {
                      bgcolor: selectedStudent?.active ? "#35ee44ff" : "#9faba0ff"
                    },
                    borderRadius: 5
                  }}
                >
                  {selectedStudent?.active ? 'Đang kích hoạt' : 'Kích hoạt'}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => setSelectedStudent(null)}
                  sx={{
                    bgcolor: "#b71c1c",
                    color: "#fff",
                    px: 5,
                    py: 0.7,
                    borderRadius: 5,
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    '&:hover': { bgcolor: '#a31515' }
                  }}
                >
                  Cancel
                </Button>
                
              </DialogActions>
            </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentManagement;
