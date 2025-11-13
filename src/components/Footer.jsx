import React from "react";
import { Box, Typography } from "@mui/material";
// Xóa 'useTheme' và 'useMediaQuery' vì không cần nữa

// Xóa 'drawerWidth' và logic 'isSmallScreen'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#343a40",
        color: "#ccc",
        p: 3,
        fontSize: "0.85rem",
        width: "100%", // Footer sẽ luôn rộng 100% BÊN TRONG khung chứa nó
        // XÓA BỎ các prop 'width' và 'ml' responsive ở đây
      }}
    >
      {/* Nội dung text của Footer giữ nguyên */}
      <Typography variant="body2" gutterBottom>
        <strong>Tổ kỹ thuật / Technician</strong>
      </Typography>
      <Typography variant="body2">Email : ddthu@hcmut.edu.vn</Typography>
      {/* ... (phần còn lại của nội dung footer) ... */}
      <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
        (For HCMUT account, please contact to : Data and Information Technology
        Center)
      </Typography>
      <Typography variant="body2">Email : di-cntt@hcmut.edu.vn</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Quý Thầy/Cô chưa có tài khoản (hoặc quên mật khẩu) nhà trường vui lòng
        liên hệ Trung tâm Dữ liệu & Công nghệ Thông tin, phòng 109 nhà A5 để
        được hỗ trợ.
      </Typography>
      <Typography variant="body2">
        ĐT (Tel.) : (84-8) 38647256 – 7200
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 3,
          pt: 2,
          borderTop: "1px solid #555",
          color: "#fff",
        }}
      >
        Copyright 2007-2023 BKEL - Phát triển dựa trên Moodle
      </Typography>
    </Box>
  );
};

export default Footer;
