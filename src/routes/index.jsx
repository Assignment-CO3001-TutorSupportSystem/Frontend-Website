import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutBeforeLogin from "../layouts/LayoutBeforeLogin";
import ProtectedRoute from "../components/ProtectedRoute";

// Import Pages
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import TutorPage from "../pages/TutorPage/TutorPage";
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
