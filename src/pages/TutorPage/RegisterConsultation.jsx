// src/pages/TutorPage/RegisterConsultation.jsx
import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import Textfill from "../../components/Textfill";
import Calendar from "../../components/Calendar";
import Button from "../../components/Button";
import { formatDate } from "../../utils/date";

import { useRegisterConsultation } from "../../hooks/useRegisterConsultation";

const RegisterConsultation = () => {
  const {
    form,
    submitting,
    calendarOpen,
    setCalendarOpen,
    handleFieldChange,
    handleDateChange,
    handleSubmit,
  } = useRegisterConsultation();

  return (
    <Box sx={{ bgcolor: "#e7f0f4", borderRadius: 4, p: 4 }}>
      {/* Header */}
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
          }}
        >
          Tutor
        </Box>
      </Box>

      {/* Card Form */}
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
            {/* Chủ đề */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Chủ đề buổi tư vấn</Typography>
              <Textfill
                value={form.title}
                onChange={handleFieldChange("title")}
                placeholder="Nhập chủ đề"
              />
            </Grid>

            {/* Khung giờ */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Khung giờ</Typography>
              <Textfill
                value={form.timeSlot}
                onChange={handleFieldChange("timeSlot")}
                placeholder="Ví dụ: 07:00"
              />
            </Grid>

            {/* Thời lượng */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Thời gian diễn ra</Typography>
              <Textfill
                value={form.duration}
                onChange={handleFieldChange("duration")}
                placeholder="Ví dụ: 120 phút"
              />
            </Grid>

            {/* Địa điểm */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Địa điểm</Typography>
              <Textfill
                value={form.location}
                onChange={handleFieldChange("location")}
                placeholder="Ví dụ: H6-301"
              />
            </Grid>

            {/* Ngày mở */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Ngày mở</Typography>

              <Box
                onClick={() => setCalendarOpen((o) => !o)}
                sx={{ cursor: "pointer" }}
              >
                <Textfill value={formatDate(form.date)} readOnly />
              </Box>

              {calendarOpen && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Calendar value={form.date} onChange={handleDateChange} />
                </Box>
              )}
            </Grid>

            {/* Số lượng */}
            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Số lượng</Typography>
              <Textfill
                value={form.quantity}
                type="number"
                onChange={handleFieldChange("quantity")}
                placeholder="Ví dụ: 40"
              />
            </Grid>
          </Grid>

          {/* Nút Submit */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              width={140}
              height={45}
              disabled={submitting}
              style={{
                borderRadius: 999,
                backgroundColor: "#006571",
                color: "#ffffff",
                fontWeight: 600,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Đang lưu..." : "Đăng ký"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterConsultation;
