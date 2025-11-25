// src/components/Pagination.jsx

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const handleChange = (event, value) => {
    onPageChange(value);   // 👈 gọi về component cha
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}  // tổng số trang
        page={currentPage}  // trang đang chọn
        onChange={handleChange}
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
}
