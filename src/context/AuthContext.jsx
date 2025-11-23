import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Khởi tạo Context
const AuthContext = createContext(null);

// 2. Mock Data (Giả lập Database của Backend)
async function mockLoginAPI(email, password) {
  const USERS = [
    {
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
      name: "Quản Trị Viên",
    },
    {
      email: "staff@gmail.com",
      password: "123",
      role: "staff",
      name: "Nhân Viên",
    },
    { email: "tutor@gmail.com", password: "123", role: "tutor", name: "Tutor" },
    {
      email: "student@gmail.com",
      password: "123",
      role: "student",
      name: "Student",
    },
  ];

  const foundUser = USERS.find((u) => u.email === email);

  if (!foundUser || foundUser.password !== password) {
    return { success: false, message: "Email hoặc mật khẩu không chính xác!" };
  }

  // Không trả password ra ngoài
  const safeUser = {
    email: foundUser.email,
    role: foundUser.role,
    name: foundUser.name,
  };

  return { success: true, user: safeUser };
}

export const AuthProvider = ({ children }) => {
  // 3. State lưu trữ thông tin user hiện tại
  // null = chưa login, Object = đã login
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. Persistence (Giữ trạng thái khi F5 / Refresh trang)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ===== LOGIN =====
  const login = async (email, password) => {
    // Tìm user trong mảng MOCK_USERS
    const res = await mockLoginAPI(email, password);

    if (!res.success) {
      return res;
    }

    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));

    return { success: true };
  };

  // 6. Hàm Logout
  const logout = () => {
    setUser(null); // Xóa state
    localStorage.removeItem("user"); // Xóa khỏi storage
  };

  // ===== Role Helpers =====
  const hasRole = (roles) => {
    if (!user) return false;
    if (!Array.isArray(roles)) roles = [roles];
    return roles.includes(user.role);
  };

  const isAdmin = () => hasRole("admin");
  const isStaff = () => hasRole("staff");
  const isTutor = () => hasRole("tutor");
  const isStudent = () => hasRole("student");

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasRole,
        isAdmin,
        isStaff,
        isTutor,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 8. Custom Hook để dùng nhanh ở các component khác
export const useAuth = () => {
  return useContext(AuthContext);
};
