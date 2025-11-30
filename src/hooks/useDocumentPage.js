import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOCUMENTS } from "../data/DocumentData.js";
import { filterDocuments, paginate } from "../utils/documentUtils.js";

export const useDocumentPage = () => {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 9;

  // --- Khai báo State ---

  // Quan ly tu khoa tim kiem
  const [search, setSearch] = useState("");

  // Quan ly trang hien tai
  const [page, setPage] = useState(1);

  // Quan ly trang thai hien thi khung loc
  const [showFilter, setShowFilter] = useState(false);

  // Quan ly gia tri loc theo linh vuc
  const [fieldFilter, setFieldFilter] = useState("");

  // --- Logic Xu ly Du lieu ---

  // Loc danh sach tai lieu dua tren tu khoa va linh vuc
  const filtered = filterDocuments(DOCUMENTS, search, fieldFilter);

  // Phan trang cho ket qua da loc
  // Tra ve danh sach tai lieu cua trang hien tai va tong so trang
  const { paginated, totalPages } = paginate(filtered, page, ITEMS_PER_PAGE);

  // --- Cac ham xu ly su kien (Handlers) ---

  // Bat tat trang thai hien thi khung loc
  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Xu ly khi thay doi tu khoa tim kiem
  // Reset ve trang 1 khi nguoi dung tim kiem
  const handleSearchChange = (eventOrValue) => {
    const value = eventOrValue?.target
      ? eventOrValue.target.value
      : eventOrValue;
    setSearch(value);
    setPage(1);
  };

  // Xu ly khi thay doi bo loc linh vuc
  // Reset ve trang 1 khi thay doi bo loc
  const handleFieldChange = (event) => {
    setFieldFilter(event.target.value);
    setPage(1);
  };

  // Chuyen sang trang ke tiep (khong vuot qua tong so trang)
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Quay ve trang truoc do (khong nho hon 1)
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));

  // Dieu huong den trang chi tiet tai lieu
  const handleRowClick = (id) => {
    navigate(`/documents/${id}`);
  };

  // Tra ve du lieu va cac ham de UI su dung
  return {
    search,
    page,
    totalPages,
    showFilter,
    fieldFilter,
    paginated, // Danh sach tai lieu da phan trang
    toggleFilter,
    handleSearchChange,
    handleFieldChange,
    handleNext,
    handlePrev,
    handleRowClick,
  };
};
