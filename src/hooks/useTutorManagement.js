// src/pages/Admin/TutorManagement/useTutorManagement.js
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TUTOR_SESSIONS } from "../data/tutorData.js";

const ITEMS_PER_PAGE = 7;

/**
 * Hook quản lý toàn bộ logic cho trang Quản lý Tutor
 * - Xử lý tìm kiếm
 * - Lọc và phân trang dữ liệu
 * - Điều khiển điều hướng
 */
export function useTutorManagement() {
  const navigate = useNavigate();

  // -------------------------------
  // STATE
  // -------------------------------

  /** search: giá trị ô tìm kiếm */
  const [search, setSearch] = useState("");

  /** page: trang hiện tại */
  const [page, setPage] = useState(1);

  // -------------------------------
  // HANDLERS
  // -------------------------------

  /**
   * handleSearchChange:
   * - Cập nhật giá trị tìm kiếm
   * - Reset về trang đầu tiên
   */
  const handleSearchChange = (e) => {
    const value = e.target.value ?? "";
    setSearch(value);
    setPage(1);
  };

  // -------------------------------
  // FILTER LOGIC
  // -------------------------------

  /** searchLower: chuẩn hóa về chữ thường để tìm kiếm không phân biệt hoa/thường */
  const searchLower = search.toLowerCase();

  /**
   * filtered:
   * - Lọc danh sách session theo tên tutor hoặc chủ đề
   */
  const filtered = useMemo(() => {
    return TUTOR_SESSIONS.filter(
      (s) =>
        s.tutorName.toLowerCase().includes(searchLower) ||
        s.topic.toLowerCase().includes(searchLower)
    );
  }, [search]);

  // -------------------------------
  // PAGINATION LOGIC
  // -------------------------------

  /** totalPages: tổng số trang */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  /** start: index bắt đầu của từng trang */
  const start = (page - 1) * ITEMS_PER_PAGE;

  /** data: dữ liệu sau khi cắt theo trang */
  const data = useMemo(
    () => filtered.slice(start, start + ITEMS_PER_PAGE),
    [filtered, page]
  );

  // -------------------------------
  // EXPOSE API
  // -------------------------------
  return {
    // data
    data,
    page,
    totalPages,
    search,

    // handlers
    setPage,
    handleSearchChange,

    // navigation
    navigateToPending: () => navigate("/tutorPendingList"),
    navigateToDetail: (id) => navigate(`/tutorDetail/${id}`),
  };
}
