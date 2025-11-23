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
  InputAdornment,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import Button from "../../components/Button.jsx";
import Pagination from "../../components/Pagination.jsx";
import Searchbar from "../../components/Searchbar.jsx";

const MOCK_SESSIONS = [
  {
    time: "07:00 15/10/2025",
    tutor: "Kiều Minh",
    place: "H2-111",
    quantity: 3,
  },
  { time: "10:00 15/10/2025", tutor: "Minh", place: "H2-310", quantity: 4 },
  {
    time: "13:30 15/10/2025",
    tutor: "Hồ Thị Minh Thu",
    place: "H1-205",
    quantity: 2,
  },
  { time: "15:30 15/10/2025", tutor: "Frieren", place: "Online", quantity: 2 },
  { time: "09:30 16/10/2025", tutor: "Frieren", place: "Online", quantity: 2 },
  { time: "13:30 16/10/2025", tutor: "Frieren", place: "Online", quantity: 2 },
  { time: "15:30 16/10/2025", tutor: "Frieren", place: "Online", quantity: 2 },
];

const ITEMS_PER_PAGE = 7;

const TutorSessionContent = ({ sessions = MOCK_SESSIONS }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = sessions.filter((s) =>
    s.tutor.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // tuỳ Searchbar của bạn, mình minh hoạ 2 cách xài:
  // nếu Searchbar trả event:
  // nếu Searchbar trả thẳng value:

  const handleSearchChange = (eOrValue) => {
    if (eOrValue && eOrValue.target) {
      setSearch(eOrValue.target.value);
    } else {
      setSearch(eOrValue || "");
    }
    setPage(1);
  };

  return (
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 3,
      }}
    >
      {/* card lớn: search + bảng */}
      <Box
        sx={{
          bgcolor: "#dfecef",
          borderRadius: 4,
          p: 3,
        }}
      >
        {/* Hàng search + filter + chuông + setting */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2.5,
          }}
        >
          {/* Nếu Searchbar của bạn đã dùng MUI bên trong thì xài nó ở đây */}
          <Box sx={{ flex: 1 }}>
            <Searchbar
              placeholder="Tìm tutor..."
              value={search}
              onChange={handleSearchChange}
              // nếu Searchbar chỉ là TextField wrapper, có thể truyền thêm InputProps:
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

          {/* Nếu Searchbar hiện tại không nhận InputProps, bạn có thể dùng tạm TextField + bỏ Searchbar đi:
              <TextField ... /> 
             – nhưng mình giữ Searchbar cho đúng yêu cầu bạn.
          */}

          <Button>
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
            </Typography>
          </Box>

          {/* bảng */}
          <Box sx={{ px: 3, py: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Thời gian</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tutor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Địa điểm</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.tutor}</TableCell>
                    <TableCell>{row.place}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination – xài component của bạn */}
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

            {/* Nếu Pagination của bạn là dạng nút Previous / Next */}
            {/* <Box sx={{ display: "flex", gap: 1 }}>
                <Pagination/>
            </Box> */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Pagination />
            </Box>

            {/* Hoặc nếu Pagination.jsx của bạn là dạng số trang: */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TutorSessionContent;
