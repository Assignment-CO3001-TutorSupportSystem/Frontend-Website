// ...existing code...
import React, { useState } from "react";
import { Box, Paper, Typography, Grid, Avatar } from "@mui/material";
import dayjs from "dayjs";

// 💡 CHỈNH LẠI PATH CHO ĐÚNG VỚI PROJECT CỦA BẠN
import Button from "../../components/Button.jsx";
import Textfill from "../../components/Textfill.jsx";
import Calendar from "../../components/Calendar.jsx";

const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

const AccountSetting = () => {
  const [form, setForm] = useState({
    title: "Kiều Tấn Anh Minh",
    location: "",
    date: dayjs(),
    timeSlot: "",
    duration: "",
    quantity: "2312065",
    email: "abc@hcmut.edu.vn",
    phone: "012345678",
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
          Quản lí tài khoản
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
          maxWidth: 1200,
          mx: "auto",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto", position: "relative" }}>
          {/* layout: small left gap (sidebar area) | main centered column (button + fields) | right profile card */}
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={0} md={2} />

            {/* main column: keep inputs in a single vertical column, labels left, inputs right */}
            <Grid item xs={12} md={6}>
              {/* place the update button above the form, aligned left within main column */}
              <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-start" }}>
                <Button
                  width={220}
                  height={56}
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#002554",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  Cập nhật thông tin
                </Button>
              </Box>

              {/* fields block: limit width so inputs appear centered in content area */}
              <Box sx={{ maxWidth: 720, mx: "auto" }}>
                <Grid container spacing={3} direction="column">
                  {[
                    { label: "Họ và tên", field: "title" },
                    { label: "ID", field: "quantity" },
                    { label: "Email", field: "email" },
                    { label: "Số điện thoại", field: "phone" },
                  ].map((f) => (
                    <Grid container item spacing={2} alignItems="center" key={f.field}>
                      <Grid item xs={12} md={4} width={160}>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: 18,
                            width: "100%",
                            textAlign: { xs: "left"},
                            pr: { md: 2 },
                          }}
                        >
                          {f.label}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <Box sx={{ width: "100%" }}>
                          <Textfill value={form[f.field]} onChange={handleFieldChange(f.field)} fullWidth />
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* right column: profile card at top-right */}
            <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "flex-end", position: { xs: "relative", md: "absolute"}, right: {md: 18}, top: {md: 5} }}>
              <Box
                sx={{
                  bgcolor: "#071a2a",
                  color: "#fff",
                  borderRadius: 3,
                  p: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: 320,
                }}
              >
                <Avatar sx={{ width: 64, height: 64, borderRadius: 2 }}>K</Avatar>
                <Box>
                  <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Anh Minh</Typography>
                  <Typography sx={{ opacity: 0.8, mt: 0.5 }}>Điều phối viên</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* save button aligned with main inputs (to the right side of main column) */}
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
              Lưu
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountSetting;
// ...existing code...