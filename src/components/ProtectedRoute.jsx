import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * @param {Array} allowedRoles - Danh sách các role được phép truy cập (VD: ['admin'])
 */

const ProtectedRoute = ({ allowedRoles }) => {
  // 1. Lấy thông tin user từ Context
  const { user } = useAuth();

  // 2. KIỂM TRA 1: Người dùng đã đăng nhập chưa?
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. KIỂM TRA 2: Người dùng có đúng quyền (Role) không?
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Nếu role của user không nằm trong danh sách cho phép
    alert("Bạn không có quyền truy cập trang này!");
    // Đá về trang chủ (hoặc trang 403 Forbidden tùy bạn)
    return <Navigate to="/" replace />;
  }

  // 4. THÀNH CÔNG: Nếu thỏa mãn tất cả, hiển thị nội dung bên trong (Child Routes)
  return <Outlet />;
};

export default ProtectedRoute;
