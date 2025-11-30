import { useState, useMemo } from "react";
import { STUDENTS } from "../data/studentData.js";

/**
 * Custom hook quản lý toàn bộ logic của trang StudentManagement
 */
export const useStudentManagement = () => {
  // --- State ---
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // giữ danh sách sinh viên trong local state để thao tác UI
  const [students, setStudents] = useState(
    STUDENTS.map((s) => ({ ...s, active: s.active ?? true }))
  );

  const pageSize = 5;

  /**
   * Tạo danh sách giảng viên (unique) từ dữ liệu
   */
  const tutors = useMemo(() => {
    return Array.from(new Set(students.map((s) => s.tutor))).sort();
  }, [students]);

  /**
   * Chuẩn hoá từ khoá tìm kiếm
   */
  const normalizedSearch = searchTerm.trim().toLowerCase();

  /**
   * Lọc sinh viên theo từ khóa tìm kiếm
   */
  const filteredStudents = useMemo(() => {
    if (!normalizedSearch) return students;

    return students.filter((s) => {
      const hay = `${s.name} ${s.id} ${s.email ?? ""} ${
        s.department ?? ""
      }`.toLowerCase();
      return hay.includes(normalizedSearch);
    });
  }, [students, normalizedSearch]);

  /**
   * Tính tổng số trang sau khi filter
   */
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

  /**
   * Lấy danh sách sinh viên hiển thị theo số trang
   */
  const pagedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page]);

  /**
   * Mở dialog xem thông tin sinh viên
   */
  const openStudentDetail = (student) => setSelectedStudent(student);

  /**
   * Đóng dialog
   */
  const closeStudentDetail = () => setSelectedStudent(null);

  /**
   * Toggle trạng thái active của 1 sinh viên
   */
  const toggleStudentActive = () => {
    if (!selectedStudent) return;

    setStudents((prev) =>
      prev.map((st) =>
        st.id === selectedStudent.id ? { ...st, active: !st.active } : st
      )
    );

    // cập nhật realtime trong dialog
    setSelectedStudent((prev) =>
      prev ? { ...prev, active: !prev.active } : prev
    );
  };

  return {
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    selectedStudent,
    openStudentDetail,
    closeStudentDetail,
    toggleStudentActive,

    pagedStudents,
    totalPages,
    tutors,
  };
};
