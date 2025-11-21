// src/pages/TutorPage/RegisterConsultationContent.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

import Button from "../../component/Button.jsx";
import Textfill from "../../component/Textfill.jsx";
import Calendar from "../../component/Calendar.jsx";

const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY"); // dùng dayjs format
};

const RegisterConsultation = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: dayjs(),
    timeSlot: "",
    duration: "",
    quantity: "",
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
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
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Địa điểm</Typography>
              <Textfill
                value={form.location}
                onChange={handleFieldChange("location")}
                placeholder="Ví dụ: H6-301"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Ngày mở</Typography>

              <Box onClick={() => setCalendarOpen((o) => !o)} sx={{ cursor: "pointer" }}>
                <Textfill value={formatDate(form.date)} readOnly />
              </Box>

              {calendarOpen && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
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

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              width={140}
              height={45}
              style={{
                borderRadius: 999,
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
