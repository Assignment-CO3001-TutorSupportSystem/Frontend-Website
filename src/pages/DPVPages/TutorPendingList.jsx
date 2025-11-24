// src/pages/Admin/TutorPendingList.jsx
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
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import Button from "../../components/Button.jsx";
import Pagination from "../../components/Pagination.jsx";
import {
  TUTOR_PENDING_REQUESTS as REQUESTS,
} from "../../data/tutorPendingData.js";   // ✅ BẬT LẠI IMPORT
const ITEMS_PER_PAGE = 7;

export default function TutorPendingList({ onBack }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(REQUESTS.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const data = REQUESTS.slice(start, start + ITEMS_PER_PAGE);

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#002554", flex: 1 }}
          >
            Danh sách chờ duyệt
          </Typography>

          {onBack && (
            <Button
              variant="secondary"
              width={100}
              height={36}
              onClick={onBack}
            >
              Quay lại
            </Button>
          )}
        </Box>

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
              bgcolor: "#FFFFFF",
              px: 3,
              py: 1.5,
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Yêu cầu đăng ký tutor
            </Typography>
          </Box>

          <Box sx={{ px: 3, py: 1, overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Thời gian gửi đăng ký
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Họ và tên</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Chuyên môn</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Xem
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Duyệt
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Từ chối
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((r, index) => (
                  <TableRow key={index}>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.subject}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="success" width={100} height={36}>
                        Duyệt
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="danger" width={100} height={36}>
                        Từ chối
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có yêu cầu nào.
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
