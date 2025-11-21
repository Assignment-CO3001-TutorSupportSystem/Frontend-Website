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

export default App;
