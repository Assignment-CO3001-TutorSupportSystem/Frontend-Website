// ...existing code...
import React, { useState } from "react";
import { Box, Paper, Typography, Grid, Avatar } from "@mui/material";
import dayjs from "dayjs";
import { USERS } from "../../data/AccSettingData.js";
// 💡 CHỈNH LẠI PATH CHO ĐÚNG VỚI PROJECT CỦA BẠN
import Button from "../../components/Button.jsx";
import Textfill from "../../components/Textfill.jsx";
import Calendar from "../../components/Calendar.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};
let storedUserStr = localStorage.getItem("user");

const storeInfo = storedUserStr ? JSON.parse(storedUserStr) : null;

// safe lookup (USERS might be undefined or not contain the email)
let userInfo = Array.isArray(USERS) && storeInfo?.email
  ? USERS.find((u) => u.email === storeInfo.email)
  : undefined;
if (localStorage.getItem("user_info") !== null) {
  userInfo = JSON.parse(localStorage.getItem("user_info"));
}
const AccountSetting = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({...userInfo});
  const fields = [
    { label: "Họ và tên", field: "name" },
    { label: "ID", field: "id" },
    { label: "Email", field: "email" },
    { label: "Vai trò", field: "role" },
    { label: "Số điện thoại", field: "phone" },
    { label: "Trạng thái", field: "status" },
  ];
  if (form.role === "student" || form.role === "teacher") {
    fields.push({ label: "Khoa", field: "department" });
  }
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (newDate) => {
    setForm((prev) => ({ ...prev, date: newDate }));
    setCalendarOpen(false);
  };

  const updateInfo = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form || !form.name || !form.email) {
      showToast("Vui lòng nhập Họ tên và Email.", "warning");
      return;
    }

    try {
      // Update localStorage user (persistence for this demo app)
      const updatedUser = { ...form };
      if (userInfo && JSON.stringify(updatedUser) === JSON.stringify(userInfo)) {
        showToast("Không có thay đổi để cập nhật.", "info");
        return;
      }

      localStorage.setItem("user_info", JSON.stringify(updatedUser));

      // If USERS array exists in-memory, update the matching entry (best-effort)
      if (Array.isArray(USERS) && userInfo?.email) {
        const idx = USERS.findIndex((u) => u.email === userInfo.email);
        if (idx !== -1) {
          USERS[idx] = { ...USERS[idx], ...updatedUser };
        }
      }

      showToast("Cập nhật thông tin thành công.", "success");
    } catch (err) {
      console.error("Failed to save account info:", err);
      showToast("Cập nhật thất bại. Vui lòng thử lại.", "error");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 2,
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

      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          bgcolor: "#ffffff",
          p: 2,
          maxWidth: 1200,
          mx: "auto",
        }}
        component="form"
        onSubmit={updateInfo}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto", position: "relative" }}>
          {/* layout: small left gap (sidebar area) | main centered column (button + fields) | right profile card */}
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} container justifyContent="center">

            {/* main column: keep inputs in a single vertical column, labels left, inputs right */}
            <Grid item xs={12} md={8} lg={6}>
              {/* place the update button above the form, aligned left within main column */}
              {/* <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-start" }}>
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
              </Box> */}

              {/* fields block: limit width so inputs appear centered in content area */}
              <Box sx={{ maxWidth: 900, mx: "auto" }}>
                <Grid container spacing={3}>
                  {(() => {
                    const mid = Math.ceil(fields.length / 2);
                    const leftFields = fields.slice(0, mid);
                    const rightFields = fields.slice(mid);
                    return (
                      <>
                        <Grid item xs={12} md={6}>
                          {leftFields.map((f) => (
                            <Grid container alignItems="center" spacing={2} key={f.field} sx={{ mb: 2 }}>
                              <Grid item xs={12} md={4}>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: 18,
                                    // width: "100%",
                                    width: 120,
                                    textAlign: { xs: "left" },
                                    pr: { md: 2 },
                                  }}
                                >
                                  {f.label}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={8} >
                                <Box sx={{ width: "100%" }}>
                                  <Textfill value={form[f.field] ?? ""} onChange={handleFieldChange(f.field)} fullWidth />
                                </Box>
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                        <Grid item xs={12} md={6} px={2}>
                          {rightFields.map((f) => (
                            <Grid container alignItems="center" spacing={2} key={f.field} sx={{ mb: 2 }}>
                              <Grid item xs={12} md={4}>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: 18,
                                    // width: "100%",
                                    width: 140,
                                    textAlign: { xs: "left" },
                                    pr: { md: 2 },
                                  }}
                                >
                                  {f.label}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <Box sx={{ width: "100%" }}>
                                  <Textfill value={form[f.field] ?? ""} onChange={handleFieldChange(f.field)} fullWidth />
                                </Box>
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    );
                  })()}
                </Grid>
              </Box>
            </Grid>

            {/* right column: profile card at top-right */}
            {/* <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "flex-end", position: { xs: "relative", md: "absolute"}, right: {md: 18}, top: {md: 5} }}>
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
            </Grid> */}
            </Grid>
          </Grid>

          {/* save button aligned with main inputs (to the right side of main column) */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              width={200}
              height={45}
              onClick={updateInfo}
              style={{
                borderRadius: 999,
                backgroundColor: "#006571",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Cập nhật thông tin
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountSetting;
// ...existing code...