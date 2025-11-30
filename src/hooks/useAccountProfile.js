import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAccountProfile = () => {
  const navigate = useNavigate();

  // Khoi tao state user tu localStorage
  // Su dung lazy initialization de chi doc localStorage mot lan khi mount
  const [user, setUser] = useState(() => {
    const storedUserStr = localStorage.getItem("user");
    const storeInfo = storedUserStr ? JSON.parse(storedUserStr) : null;
    return { ...storeInfo };
  });

  // Ham xu ly thay doi du lieu trong state user
  // Tra ve mot ham callback nhan su kien event
  const handleChange = (field) => (e) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Ham dieu huong den trang chi tiet cai dat tai khoan
  const handleViewDetails = () => {
    navigate("/accSetting");
  };

  return {
    user,
    handleChange,
    handleViewDetails,
  };
};
