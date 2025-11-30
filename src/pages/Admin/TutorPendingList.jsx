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
  IconButton,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import Button from "../../components/Button.jsx";
import Pagination from "../../components/Pagination.jsx";
import { useTutorPendingList } from "../../hooks/useTutorPendingList";

export default function TutorPendingList({ onBack }) {
  // Lấy dữ liệu và các hàm xử lý từ Hook
  const { page, totalPages, pagedRequests, handlePageChange } =
    useTutorPendingList();

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        {/* Header + nút quay lại */}
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

          {/* Hiển thị nút quay lại nếu có prop onBack */}
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

        {/* Khung bảng danh sách */}
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
          {/* Header của phần bảng */}
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

          {/* Bảng danh sách */}
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
                {/* Render dữ liệu đã được phân trang từ Hook */}
                {pagedRequests.map((r, index) => (
                  <TableRow key={index}>
                    <TableCell>{r.time}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.subject}</TableCell>

                    {/* Nút xem chi tiết */}
                    <TableCell align="center">
                      <IconButton size="small">
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>

                    {/* Nút duyệt */}
                    <TableCell align="center">
                      <Button variant="success" width={100} height={36}>
                        Duyệt
                      </Button>
                    </TableCell>

                    {/* Nút từ chối */}
                    <TableCell align="center">
                      <Button variant="danger" width={100} height={36}>
                        Từ chối
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Hiển thị thông báo khi không có dữ liệu */}
                {pagedRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có yêu cầu nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Footer phân trang */}
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
              onPageChange={handlePageChange}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
