// src/pages/TutorPage/RegisterConsultationContent.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";

// 💡 CHỈNH LẠI PATH CHO ĐÚNG VỚI PROJECT CỦA BẠN
import Button from "../../component/Button.jsx";
import Textfill from "../../component/Textfill.jsx";
import Calendar from "../../component/Calendar.jsx";

const formatDate = (date) => {
  if (!(date instanceof Date)) return "";
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const RegisterConsultation = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: new Date(), // 
    timeSlot: "",
    duration: "",
    quantity: "",
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleFieldChange = (field) => (eOrValue) => {
    const value = eOrValue?.target?.value ?? eOrValue ?? "";
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (newDate) => {
    setForm((prev) => ({ ...prev, date: newDate }));
    setCalendarOpen(false); // chọn ngày xong tự đóng lịch
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form: ", form);
    // TODO: call API nếu cần
  };

  return (
    <Box sx={{ bgcolor: "#e7f0f4", borderRadius: 4, p: 3 }}>
      <Paper
        elevation={0}
        sx={{ bgcolor: "#dfecef", borderRadius: 4, p: 4 }}
        component="form"
        onSubmit={handleSubmit}
      >
        {/* tiêu đề giữa */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
        >
          Đăng ký mở buổi tư vấn
        </Typography>

        {/* Gói form ở giữa, không quá rộng */}
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          {/* 3 cột × 2 hàng */}
          <Grid container spacing={3}>
            {/* Hàng 1 */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Tên buổi tư vấn</Typography>
              <Textfill
                value={form.title}
                onChange={handleFieldChange("title")}
                placeholder="Nhập tên buổi tư vấn"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Khung giờ</Typography>
              <Textfill
                value={form.timeSlot}
                onChange={handleFieldChange("timeSlot")}
                placeholder="Ví dụ: 7:00"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Thời gian diễn ra</Typography>
              <Textfill
                value={form.duration}
                onChange={handleFieldChange("duration")}
                placeholder="Ví dụ: 120 phút"
              />
            </Grid>

            {/* Hàng 2 */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Địa điểm</Typography>
              <Textfill
                value={form.location}
                onChange={handleFieldChange("location")}
                placeholder="Ví dụ: H6-301"
              />
            </Grid>

            {/* Ngày mở + calendar toggle */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Ngày mở</Typography>

              {/* Ô hiển thị ngày */}
              <Box
                onClick={() => setCalendarOpen((open) => !open)}
                sx={{ cursor: "pointer" }}
              >
                <Textfill
                  value={formatDate(form.date)}
                  onChange={() => {}}
                  readOnly
                />
              </Box>

              {/* Calendar nằm trong flow → trang kéo xuống bình thường */}
              {calendarOpen && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Calendar
                    value={form.date}
                    onChange={handleDateChange}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Số lượng</Typography>
              <Textfill
                value={form.quantity}
                onChange={handleFieldChange("quantity")}
                type="number"
                placeholder="Ví dụ: 40"
              />
            </Grid>
          </Grid>

          {/* Nút đăng ký */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              style={{
                borderRadius: 999,
                padding: "10px 26px",
                backgroundColor: "#006571",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Đăng ký
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterConsultation;