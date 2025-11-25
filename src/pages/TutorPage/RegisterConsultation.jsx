// src/pages/TutorPage/RegisterConsultation.jsx
import React, { useState } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

import Button from "../../components/Button.jsx";
import Textfill from "../../components/Textfill.jsx";
import Calendar from "../../components/Calendar.jsx";

import { useNavigate } from "react-router-dom";
import { useSessions } from "../../context/SessionContext.jsx";

// Format ngày hiển thị trong ô input
const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
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
  const [submitting, setSubmitting] = useState(false);

  const { addSession } = useSessions();
  const navigate = useNavigate();

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (newDate) => {
    setForm((prev) => ({ ...prev, date: newDate }));
    setCalendarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Validate đơn giản
    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.timeSlot.trim() ||
      !form.duration.trim() ||
      !form.quantity
    ) {
      alert("Vui lòng nhập đầy đủ thông tin buổi tư vấn.");
      return;
    }

    setSubmitting(true);

    // 2️⃣ Tạo session mới (demo: cố định tutor Trần Thị B - T002)
    const newSession = {
      id: `S_NEW_${Date.now()}`, // id tạm thời
      tutorId: "T002",
      tutorName: "Trần Thị B",
      topic: form.title,
      subject: "Vật lý đại cương",
      status: "Còn nhận",
      time: `${form.timeSlot} ${formatDate(form.date)}`,
      location: form.location,
      maxStudents: Number(form.quantity),
      registered: 0,
    };

    // 3️⃣ Thêm vào context (sẽ hiện trên màn hình tutor)
    addSession(newSession);

    // 4️⃣ Thông báo + chuyển về list buổi tư vấn của tutor
    alert("Đăng ký buổi tư vấn thành công!");
    navigate("/tutor/T002/sessions");

    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 4,
      }}
    >
      {/* Header: tiêu đề + pill "Tutor" */}
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

      {/* CARD FORM */}
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
              <Typography sx={{ mb: 0.8 }}>Chủ đề buổi tư vấn</Typography>
              <Textfill
                value={form.title}
                onChange={handleFieldChange("title")}
                placeholder="Nhập chủ đề"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ mb: 0.8 }}>Khung giờ</Typography>
              <Textfill
                value={form.timeSlot}
                onChange={handleFieldChange("timeSlot")}
                placeholder="Ví dụ: 07:00"
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

              <Box
                onClick={() => setCalendarOpen((o) => !o)}
                sx={{ cursor: "pointer" }}
              >
                <Textfill value={formatDate(form.date)} readOnly />
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

          {/* Nút submit */}
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
