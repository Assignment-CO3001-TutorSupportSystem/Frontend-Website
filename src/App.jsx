import React, { useState } from "react";
import Layout from "./components/Layout.jsx";
// import TutorPage from "./pages/TutorPage.jsx"; // Tạm thời không dùng
import HomePage from "./pages/HomePage.jsx"; // 1. Import trang chủ
import TutorPage from "./pages/TutorPage/TutorPage.jsx";
import StudentList from "./pages/TutorPage/StudentList.jsx";
import RegisterConsultation from "./pages/TutorPage/RegisterConsultation.jsx";
import TutorStudentManagementPage from "./pages/Admin/TutorStudentPage.jsx";
import LoginPage from "./pages/Login.jsx";
import AccountSetting from "./pages/AccountSetting/AccSetting.jsx";
import AccountProfile from "./pages/AccountSetting/AccProfile.jsx";
// Import các icon bạn cần cho menu
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
// (Các icon khác nếu bạn muốn thêm vào menu)
import AssignmentIcon from "@mui/icons-material/Assignment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import "./App.css"
// Cập nhật lại menu items cho giống hình
const menuItemsData = [
  { text: "Trang chủ", icon: <HomeIcon />, route: "/" },
  { text: "Đăng ký buổi tư vấn", icon: <AssignmentIcon />, route: "/register" },
  { text: "Buổi tư vấn của tôi", icon: <EventNoteIcon />, route: "/sessions" },
  { text: "Lịch", icon: <CalendarMonthIcon />, route: "/calendar" },
  { text: "Tài liệu", icon: <LibraryBooksIcon />, route: "/documents" },
  { text: "Cài đặt", icon: <SettingsIcon />, route: "/settings" },
];

function App() {
  // 2. Đặt trang chủ làm trang active
  const [activeMenu, setActiveMenu] = useState("/");

  const menuWithActiveState = menuItemsData.map((item) => ({
    ...item,
    isActive: item.route === activeMenu,
  }));

  // Bạn có thể lấy thông tin user từ đây
  const userInfo = {
    name: "tutor", // Hoặc "Ngọc Huyền"
    id: "sinh viên", // Hoặc "A0001"
    avatarUrl: "/avatar.png", // Dùng avatar.png trong /public
  };

  return (
    <Layout user={userInfo} menuItems={menuWithActiveState}>
      {/* <HomePage /> */}
      {/* <TutorPage />
      <StudentList /> */}
      {/* <RegisterConsultation /> */}
      <AccountSetting />
      {/* <AccountProfile /> */}
      {/* <TutorStudentManagementPage /> */}
    </Layout>
  );
}

export default App;
