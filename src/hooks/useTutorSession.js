// src/hooks/useTutorSession.js
import { useState, useMemo } from "react";
import { useSessions } from "../context/SessionContext";

/**
 * Custom Hook quản lý toàn bộ logic:
 * - Lọc theo tutorId hoặc tutorName
 * - Lọc theo trạng thái + địa điểm (filter popup)
 * - Lọc theo search text
 * - Phân trang
 * - Xử lý thay đổi tìm kiếm
 * - Xóa toàn bộ filter
 */
export const useTutorSession = (tutorId, tutorName, ITEMS_PER_PAGE = 7) => {
  const { sessions } = useSessions();

  // State search input
  const [search, setSearch] = useState("");

  // State phân trang
  const [page, setPage] = useState(1);

  // Filter popup state
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  /**
   * Lọc dữ liệu theo tutorId hoặc tutorName
   */
  const tutorFiltered = useMemo(() => {
    let data = sessions;
    if (tutorId) return data.filter((s) => s.tutorId === tutorId);
    if (tutorName) return data.filter((s) => s.tutorName === tutorName);
    return data;
  }, [sessions, tutorId, tutorName]);

  /**
   * Lọc theo filter popup (trạng thái + địa điểm)
   */
  const popupFiltered = useMemo(() => {
    let data = tutorFiltered;

    if (statusFilter) {
      data = data.filter((s) => s.status === statusFilter);
    }

    if (locationFilter.trim()) {
      const loc = locationFilter.toLowerCase();
      data = data.filter((s) => s.location.toLowerCase().includes(loc));
    }

    return data;
  }, [tutorFiltered, statusFilter, locationFilter]);

  /**
   * Lọc theo thanh search (chủ đề / địa điểm / thời gian)
   */
  const finalFiltered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return popupFiltered.filter(
      (s) =>
        s.topic.toLowerCase().includes(searchLower) ||
        s.location.toLowerCase().includes(searchLower) ||
        s.time.toLowerCase().includes(searchLower)
    );
  }, [popupFiltered, search]);

  /**
   * Tính toán phân trang
   */
  const totalPages = Math.max(
    1,
    Math.ceil(finalFiltered.length / ITEMS_PER_PAGE)
  );
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = finalFiltered.slice(start, start + ITEMS_PER_PAGE);

  /**
   * Khi gõ search → reset về trang 1
   */
  const handleSearchChange = (eOrValue) => {
    const value = eOrValue?.target?.value ?? eOrValue ?? "";
    setSearch(value);
    setPage(1);
  };

  /**
   * Xóa toàn bộ filter popup
   */
  const clearFilter = () => {
    setStatusFilter("");
    setLocationFilter("");
  };

  return {
    search,
    setSearch,
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
  };
};
