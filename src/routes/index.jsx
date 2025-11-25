import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutBeforeLogin from "../layouts/LayoutBeforeLogin";
import ProtectedRoute from "../components/ProtectedRoute";

// Import Pages
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import TutorPage from "../pages/TutorPage/TutorPage";
import StudentList from "../pages/TutorPage/StudentList.jsx";
// import RegisterConsultation from "../pages/TutorPage/RegisterConsultation.jsx";
import TutorManagement from "../pages/DPVPages/TutorManagement.jsx";
import Management from "../pages/DPVPages/Management.jsx";
import StudentManagement from "../pages/DPVPages/StudentManagement.jsx";
import SessionManagement from "../pages/DPVPages/SessionManagement.jsx";
import RegisterNewPage from "../pages/Student/RigisterNewPage.jsx";
import AccProfile from "../pages/AccountSetting/AccProfile.jsx";
import AccSetting from "../pages/AccountSetting/AccSetting.jsx";
import TutorDetail from "../pages/Admin/TutorDetail.jsx";
import ViewSessions from "../pages/Student/ViewSessions";
import { ViewDocuments, DocumentDetail } from "../pages/Student/ViewDocuments";
import TutorPendingList from "../pages/DPVPages/TutorPendingList.jsx";

const NotFound = () => <h2>404 - Không tìm thấy trang</h2>;

const router = createBrowserRouter([
  // --- NHÓM 1: Các trang ĐỘC LẬP (Không có Layout chung) ---
  {
    path: "/login",
    element: <Login />,
  },

  // --- NHÓM 2: Các trang dùng LayoutBeforeLogin PUBLIC ROUTE---
  {
    path: "/",
    element: <LayoutBeforeLogin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  // --- NHÓM 3: Các trang dùng Layout Private Routes(Cần Login)---
  {
    // Bọc ProtectedRoute
    element: <ProtectedRoute />,
    children: [
      {
        // Layout (Chỉ render khi đã qua cửa bảo vệ)
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
          // Các trang con dùng chung Layout
          { path: "/home", element: <HomePage /> },
          { path: "/tutorPage", element: <TutorPage /> },
          { path: "/studentList", element: <StudentList /> },
          { path: "/management", element: <Management /> },
          { path: "/studentManagement", element: <StudentManagement /> },
          { path: "/SessionManagement", element: <SessionManagement /> },
          { path: "/AccSetting", element: <AccSetting /> },
          { path: "/tutorManagement", element: <TutorManagement /> },
          { path: "/tutorDetail/:sessionId", element: <TutorDetail /> },
          { path: "/tutorPendingList", element: <TutorPendingList /> },

          { path: "/sessions", element: <ViewSessions /> },
          { path: "/documents", element: <ViewDocuments /> },
          { path: "/documents/:id", element: <DocumentDetail /> },
          { path: "/register", element: <RegisterNewPage /> },
          { path: "/registered", element: <RegisterNewPage /> },
          // .... thêm routes cho các trang mới
        ],
      },
    ],
  },

  // --- Catch all (404) ---
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
