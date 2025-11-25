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

const USERS = [
    {
      email: "admin@gmail.com",
      password: "123",
      role: "admin",
      name: "Quản Trị Viên",
      status: "Đang hoạt động",
    },
    {
      email: "staff@gmail.com",
      password: "123",
      role: "staff",
      name: "Nhân Viên",
      status: "Tạm ngưng hoạt động",
    },
    {email: "teacher@gmail.com", password: "123", 
      role: "teacher", name: "Teacher", status: "Đang hoạt động" },
    { 
      email: "tutor@gmail.com",
      password: "123", role: "tutor", name: "Tutor", 
      department: "Quản lí công nghiệp", status: "Đang hoạt động" },
    {
      email: "student@gmail.com",
      password: "123",
      role: "student",
      name: "Kiều Tấn Anh Minh",
      ID: "2312065",
      phone: "0123456789",
      department: "Khoa học máy tính",
      status: "Đang hoạt động",
    },
    {
      email: "studentB@gmail.com",
      password: "123",
      role: "student",
      name: "Student B",
      department: "Kĩ thuật máy tính",
      status: "Tạm ngưng hoạt động",
    },
];
// const userInfo = localStorage.getItem("user");
const userInfo = USERS[4]; // hard code for testing

const AccountSetting = () => {
  // const [form, setForm] = useState({
  //   title: "Kiều Tấn Anh Minh",
  //   location: "",
  //   date: dayjs(),
  //   timeSlot: "",
  //   duration: "",
  //   quantity: "2312065",
  //   email: "abc@hcmut.edu.vn",
  //   phone: "012345678",
  // });
  const [form, setForm] = useState({...userInfo});
  const fields = [
    { label: "Họ và tên", field: "name" },
    { label: "ID", field: "ID" },
    { label: "Email", field: "email" },
    { label: "Vai trò", field: "role" },
    { label: "Số điện thoại", field: "phone" },
    { label: "Trạng thái", field: "status" },
  ];
  if (form.role === "student" || form.role === "teacher") {
    fields.push({ label: "Khoa / Bộ môn", field: "department" });
  }
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
                            <Box sx={{ maxWidth: 720, mx: "auto" }}>
                <Grid container spacing={3}>
                  {Array.from({ length: Math.ceil(fields.length / 2) }).map((_, rowIdx) => {
                    const left = fields[rowIdx * 2];
                    const right = fields[rowIdx * 2 + 1];
                    return (
                      <Grid container item spacing={2} alignItems="center" key={rowIdx}>
                        {/* left column */}
                        <Grid item xs={12} md={6}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} md={4}>
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: 18,
                                  width: "100%",
                                  textAlign: { xs: "left" },
                                  pr: { md: 2 },
                                }}
                              >
                                {left.label}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <Box sx={{ width: "100%" }}>
                                <Textfill value={form[left.field] ?? ""} onChange={handleFieldChange(left.field)} fullWidth />
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* right column (may be undefined for odd count) */}
                        {right ? (
                          <Grid item xs={12} md={6}>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={12} md={4}>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    fontSize: 18,
                                    width: "100%",
                                    textAlign: { xs: "left" },
                                    pr: { md: 2 },
                                  }}
                                >
                                  {right.label}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <Box sx={{ width: "100%" }}>
                                  <Textfill value={form[right.field] ?? ""} onChange={handleFieldChange(right.field)} fullWidth />
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid item xs={12} md={6} />
                        )}
                      </Grid>
                    );
                  })}
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