// src/pages/TutorPage/RegisterConsultationContent.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";

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
    date: new Date(),
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
    setCalendarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form: ", form);
  };

  return (
    // 🔹 NỀN NGOÀI: xám nhạt, bo tròn, padding 4
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: { xs: "left", md: "center" },
            flex: 1,
          }}
        >
          Đăng ký mở buổi tư vấn
        </Typography>

        {/* pill bên phải tương tự CNPM_123, bạn đổi text tuỳ ý */}
        <Box
          sx={{
            bgcolor: "#002554",
            color: "white",
            px: 3,
            py: 0.7,
            borderRadius: 999,
            fontWeight: 600,
            ml: 2,
            whiteSpace: "nowrap",
          }}
        >
          Tutor
        </Box>
      </Box>

      {/* 🔹 CARD CHÍNH: dùng Paper giống card bảng của StudentList */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          bgcolor: "#ffffff",
          p: 3,
          maxWidth: 1100,
          mx: "auto",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        {/* Gói form ở giữa, tương tự width bảng */}
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
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

              {calendarOpen && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Calendar value={form.date} onChange={handleDateChange} />
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

          {/* Nút đăng ký – style giống nút Filter/Pagination */}
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
