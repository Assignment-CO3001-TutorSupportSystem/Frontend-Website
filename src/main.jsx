import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // File css gốc của bạn

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Tạo một theme cơ bản (bạn có thể tùy chỉnh sau)
const theme = createTheme({
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif", // Dùng font từ file index.css
  },
  palette: {
    // Bạn có thể định nghĩa màu sắc chung ở đây
    primary: {
      main: "#001F3F",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline chuẩn hóa CSS cho trình duyệt */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
