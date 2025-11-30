import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { USERS } from "../data/AccSettingData";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

/**
 * Utility format date to DD/MM/YYYY
 */
const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

/**
 * Custom hook quản lý toàn bộ logic xử lý thông tin người dùng
 * - Load user info từ localStorage / AuthContext
 * - Đồng bộ dữ liệu khi user thay đổi
 * - Quản lý form state
 * - Validate & lưu dữ liệu
 */
export const useAccountSetting = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [form, setForm] = useState({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  /**
   * Lấy thông tin người dùng theo độ ưu tiên:
   * 1. localStorage.user_info
   * 2. AuthContext.user → tìm trong USERS
   * 3. AuthContext.user trực tiếp
   */
  const resolveUserInfo = () => {
    const saved = localStorage.getItem("user_info");
    if (saved) return JSON.parse(saved);

    if (user && Array.isArray(USERS)) {
      const found = USERS.find((u) => u.email === user.email);
      return (
        found || {
          email: user.email,
          name: user.name,
          role: user.role,
        }
      );
    }
    return {};
  };

  /**
   * Effect: đồng bộ form khi:
   * - user thay đổi (login/logout)
   * - user_info trong localStorage đổi (tab khác cập nhật)
   */
  useEffect(() => {
    setForm(resolveUserInfo());

    const onStorage = (e) => {
      if (e.key === "user_info") {
        setForm(resolveUserInfo());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  /**
   * Xử lý khi người dùng thay đổi textfield
   * field → Tên thuộc tính trong form
   */
  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /**
   * Xử lý khi người dùng chọn ngày mới trong Calendar
   */
  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, date }));
    setCalendarOpen(false);
  };

  /**
   * Hàm cập nhật thông tin người dùng
   * - Kiểm tra dữ liệu
   * - Lưu vào localStorage.user_info
   * - Cập nhật mảng USERS (demo dataset)
   */
  const updateInfo = (e) => {
    e?.preventDefault();

    // Validation
    if (!form.name || !form.email) {
      showToast("Vui lòng nhập Họ tên và Email.", "warning");
      return;
    }

    try {
      const updatedUser = { ...form };
      let storedUser = JSON.parse(localStorage.getItem("user_info") || "{}");

      // Check if nothing changed
      if (JSON.stringify(updatedUser) === JSON.stringify(storedUser)) {
        showToast("Không có thay đổi để cập nhật.", "info");
        return;
      }

      // Save new info
      localStorage.setItem("user_info", JSON.stringify(updatedUser));

      // Update demo USERS data
      const idx = USERS.findIndex((u) => u.email === storedUser.email);
      if (idx !== -1) {
        USERS[idx] = { ...USERS[idx], ...updatedUser };
      }

      showToast("Cập nhật thông tin thành công.", "success");
    } catch (err) {
      showToast("Cập nhật thất bại. Vui lòng thử lại.", "error");
    }
  };

  return {
    form,
    calendarOpen,
    setCalendarOpen,
    handleFieldChange,
    handleDateChange,
    updateInfo,
  };
};
