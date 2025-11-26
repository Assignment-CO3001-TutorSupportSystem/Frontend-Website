// src/pages/TutorPage/TutorSchedule.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { TUTOR_SESSIONS } from "../../data/tutorData.js";

dayjs.extend(customParseFormat);

// Tạm cố định tutor hiện tại là Trần Thị B (T002)
const CURRENT_TUTOR_ID = "T002";

const TutorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // 1️⃣ Gom các buổi tư vấn theo ngày cho tutor hiện tại
  const sessionsByDate = useMemo(() => {
    const map = {};

    const sessionsForTutor = TUTOR_SESSIONS.filter(
      (s) => s.tutorId === CURRENT_TUTOR_ID
    );

    sessionsForTutor.forEach((s) => {
      // "07:00 15/10/2025"
      const parsed = dayjs(s.time, "HH:mm DD/MM/YYYY");
      if (!parsed.isValid()) return;

      const key = parsed.format("YYYY-MM-DD");
      if (!map[key]) map[key] = [];
      map[key].push({ ...s, parsedTime: parsed });
    });

    // Sort buổi trong cùng 1 ngày theo giờ
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => a.parsedTime.valueOf() - b.parsedTime.valueOf());
    });

    return map;
  }, []);

  const selectedKey = selectedDate.format("YYYY-MM-DD");
  const sessionsForSelectedDay = sessionsByDate[selectedKey] || [];

  // 2️⃣ Custom từng ô ngày
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    if (!day || !dayjs.isDayjs(day)) {
      return <PickersDay {...props} />;
    }

    const key = day.format("YYYY-MM-DD");
    const hasSessions = !!sessionsByDate[key];
    const isToday = day.isSame(dayjs(), "day");

    return (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          ...(hasSessions && {
            border: "2px solid #00838f",
            borderRadius: "50%",
            fontWeight: 700,
          }),
          ...(isToday && {
            "&.MuiPickersDay-root": {
              border: "1px dashed #90caf9",
            },
          }),
          ...(other.sx || {}),
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 40%, #e8f5e9 100%)",
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1180px",
          mx: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 0.8, color: "#102a43" }}
          >
            Lịch tư vấn của tôi
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Xem và quản lý các buổi tư vấn theo lịch hằng ngày.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {/* Cột trái: Calendar */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 2.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>Lịch buổi tư vấn</Typography>
                <Chip
                  size="small"
                  variant="outlined"
                  label="Chọn ngày để xem chi tiết"
                  sx={{ fontSize: 12 }}
                />
              </Box>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue ? newValue.startOf("day") : dayjs());
                  }}
                  slots={{ day: CustomDay }}
                  sx={{
                    "& .MuiPickersDay-root": {
                      fontWeight: 500,
                    },
                    "& .Mui-selected": {
                      bgcolor: "#00838f !important",
                      color: "#fff",
                    },
                  }}
                />
              </LocalizationProvider>

              <Typography
                variant="body2"
                sx={{ mt: 1.5, color: "text.secondary", fontStyle: "italic" }}
              >
                * Những ngày có buổi tư vấn sẽ được khoanh tròn.
              </Typography>
            </Paper>
          </Grid>

          {/* Cột phải: danh sách buổi trong ngày đã chọn */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 3,
                minHeight: 340,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                    Buổi tư vấn trong ngày {selectedDate.format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sessionsForSelectedDay.length > 0
                      ? `${sessionsForSelectedDay.length} buổi trong ngày này`
                      : "Không có buổi tư vấn nào trong ngày này"}
                  </Typography>
                </Box>

                {sessionsForSelectedDay.length > 0 && (
                  <Chip
                    size="small"
                    label="Danh sách chi tiết"
                    sx={{ fontSize: 12 }}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {sessionsForSelectedDay.length === 0 ? (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    Không có buổi tư vấn nào trong ngày này.
                  </Typography>
                </Box>
              ) : (
                <List
                  sx={{
                    mt: 0.5,
                    pr: 0.5,
                    "& .MuiListItem-root": { px: 1.2 },
                  }}
                >
                  {sessionsForSelectedDay.map((session) => (
                    <ListItem
                      key={session.id}
                      sx={{
                        mb: 1.5,
                        borderRadius: 2,
                        bgcolor: "#f5f8fb",
                        alignItems: "flex-start",
                        boxShadow: "0 2px 6px rgba(15, 23, 42, 0.05)",
                      }}
                    >
                      {/* Cột nhỏ hiển thị giờ */}
                      <Box
                        sx={{
                          minWidth: 80,
                          mr: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: "#00838f" }}
                        >
                          {session.parsedTime
                            ? session.parsedTime.format("HH:mm")
                            : session.time.split(" ")[0]}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {session.parsedTime
                            ? session.parsedTime.format("DD/MM")
                            : ""}
                        </Typography>
                      </Box>

                      {/* Nội dung chính */}
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              sx={{ fontWeight: 600, pr: 1 }}
                              noWrap
                            >
                              {session.topic}
                            </Typography>
                            <Chip
                              size="small"
                              label={
                                session.status === "Full"
                                  ? "Đã đủ chỗ"
                                  : "Còn nhận"
                              }
                              color={
                                session.status === "Full" ? "error" : "success"
                              }
                            />
                          </Box>
                        }
                        secondary={
                          <Stack spacing={0.3}>
                            <Typography variant="body2">
                              <strong>Thời gian:</strong>{" "}
                              {session.parsedTime
                                ? session.parsedTime.format("HH:mm DD/MM/YYYY")
                                : session.time}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Địa điểm:</strong> {session.location}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Số lượng:</strong>{" "}
                              {session.registered}/{session.maxStudents} sinh
                              viên
                            </Typography>
                            {session.subject && (
                              <Typography variant="body2">
                                <strong>Môn:</strong> {session.subject}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TutorSchedule;
