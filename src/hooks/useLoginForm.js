// src/hooks/useLoginForm.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook xử lý logic login:
 * - Quản lý state email, password
 * - Toggle show/hide password
 * - Validate email
 * - Xử lý sự kiện enter
 * - Gọi API login và điều hướng
 */
export const useLoginForm = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // State form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State toggle show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Validate email cơ bản
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Xử lý đăng nhập
  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Email không hợp lệ!", "warning");
      return;
    }

    const res = await login(email, password);

    if (!res.success) {
      showToast(res.message, "error");
      return;
    }

    showToast("Đăng nhập thành công! Chào mừng bạn trở lại.", "success");
    navigate("/home");
  };

  // Xử lý nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
    handleKeyDown,
  };
};
