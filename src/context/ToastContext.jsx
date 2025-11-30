import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

// 1. Tạo Context
const ToastContext = createContext(null);

// 2. Tạo Provider
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  /**
   * Hàm kích hoạt thông báo
   * @param {string} msg - Nội dung thông báo
   * @param {string} type - Loại thông báo ('success', 'error', 'info', 'warning')
   */
  const showToast = useCallback((msg, type = "info") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  }, []);

  // Hàm đóng thông báo
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* --- PHẦN GIAO DIỆN THÔNG BÁO --- */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// 3. Custom Hook để dùng nhanh
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast phải được sử dụng bên trong ToastProvider");
  }
  return context;
};
