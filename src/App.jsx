// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Layout from "./components/Layout.jsx";
// // import TutorPage from "./pages/TutorPage.jsx"; // Tạm thời không dùng
// import HomePage from "./pages/HomePage.jsx"; // 1. Import trang chủ
// import TutorPage from "./pages/TutorPage/TutorPage.jsx";
// import StudentList from "./pages/TutorPage/StudentList.jsx";
// import RegisterConsultation from "./pages/TutorPage/RegisterConsultation.jsx";
// import LoginPage from "./pages/Login.jsx";
// import Management from "./pages/DPVPages/Management.jsx";
// import StudentManagement from "./pages/DPVPages/StudentManagement.jsx";
// import SessionManagement from "./pages/DPVPages/SessionManagement.jsx";
// import RegisterNewPage from "./pages/Student/RigisterNewPage.jsx";
// import AccProfile from "./pages/AccountSetting/AccProfile.jsx";
// import AccSetting from "./pages/AccountSetting/AccSetting.jsx";
// import TutorDetail from "./pages/Admin/TutorDetail.jsx";

// // Import các icon bạn cần cho menu
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PeopleIcon from "@mui/icons-material/People";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import SettingsIcon from "@mui/icons-material/Settings";

// // (Các icon khác nếu bạn muốn thêm vào menu)
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// import "./App.css";

// function App() {
//   // 2. Đặt trang chủ làm trang active
//   const [activeMenu, setActiveMenu] = useState("/");

//   const menuWithActiveState = menuItemsData.map((item) => ({
//     ...item,
//     isActive: item.route === activeMenu,
//   }));

//   // Bạn có thể lấy thông tin user từ đây
//   const userInfo = {
//     name: "tutor", // Hoặc "Ngọc Huyền"
//     id: "sinh viên", // Hoặc "A0001"
//     avatarUrl: "/avatar.png", // Dùng avatar.png trong /public
//   };
import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import router from "./routes"; // Nó sẽ tự động tìm file index.js trong thư mục routes

const App = () => {
  return (
    // 1. Bọc AuthProvider ở ngoài cùng để toàn bộ ứng dụng truy cập được user state
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
};

// );

//     // <Layout user={userInfo} menuItems={menuWithActiveState}>
//     //   {/* <HomePage /> */}
//       // <TutorPage />
//     //<StudentList />

//     //</Layout>
//     //<LoginPage />
//   )
// }

// function App() {
//   const user = { name: "Ngọc Huyền", role: "sinh viên" };
//   const menuItems = [
//     { path: "/dang-ky-moi", label: "Đăng ký buổi tư vấn" },
//     { path: "/da-dang-ky", label: "Buổi tư vấn của tôi" },
//     // thêm các mục khác
//   ];

//   return (
//     <Router>
//       <Layout user={user} menuItems={menuItems}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dang-ky-moi" />} />
//           <Route path="/dang-ky-moi" element={<RegisterNewPage />} />
//           <Route path="/da-dang-ky" element={<RegisteredPage />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

export default App;
