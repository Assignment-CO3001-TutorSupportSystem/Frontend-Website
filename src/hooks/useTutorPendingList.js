import { useState } from "react";
import { TUTOR_PENDING_REQUESTS as REQUESTS } from "../data/tutorPendingData.js";

export const useTutorPendingList = () => {
  const ITEMS_PER_PAGE = 7;

  // --- Khai báo State ---

  // Quản lý trang hiện tại
  const [page, setPage] = useState(1);

  // --- Logic Xử lý Dữ liệu ---

  // Tính toán tổng số trang dựa trên tổng số request và số item mỗi trang
  const totalPages = Math.max(1, Math.ceil(REQUESTS.length / ITEMS_PER_PAGE));

  // Tính vị trí bắt đầu của dữ liệu cho trang hiện tại
  const start = (page - 1) * ITEMS_PER_PAGE;

  // Cắt mảng dữ liệu để lấy danh sách hiển thị cho trang hiện tại
  const pagedRequests = REQUESTS.slice(start, start + ITEMS_PER_PAGE);

  // --- Các hàm xử lý sự kiện (Handlers) ---

  // Xử lý sự kiện thay đổi trang
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Trả về dữ liệu và các hàm để UI sử dụng
  return {
    page,
    totalPages,
    pagedRequests,
    handlePageChange,
  };
};
