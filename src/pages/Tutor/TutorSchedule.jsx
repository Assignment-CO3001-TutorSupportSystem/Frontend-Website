// src/pages/TutorPage/TutorSchedule.jsx
import React from "react";
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
import { useTutorSchedule } from "../../hooks/useTutorSchedule.js";
import CustomDay from "../../components/CustomDay.jsx";

const TutorSchedule = () => {
  // ⭐ Lấy toàn bộ logic từ hook
  const {
    selectedDate,
    setSelectedDate,
    sessionsBySelectedDate,
    sessionsByDate,
  } = useTutorSchedule();

  return (
    <Box
      sx={{
        bgcolor:
          "linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 40%, #e8f5e9 100%)",
        minHeight: "100vh",
        py: 6,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: "1180px", mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.8 }}>
            Lịch tư vấn của tôi
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Xem và quản lý các buổi tư vấn theo lịch hằng ngày.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Calendar */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  Lịch buổi tư vấn
                </Typography>
                <Chip
                  size="small"
                  variant="outlined"
                  label="Chọn ngày để xem chi tiết"
                />
              </Box>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newDate) =>
                    setSelectedDate(newDate ? newDate.startOf("day") : dayjs())
                  }
                  slots={{
                    day: (props) => (
                      <CustomDay {...props} sessionsByDate={sessionsByDate} />
                    ),
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

          {/* Sessions list */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>
                    Buổi tư vấn ngày {selectedDate.format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sessionsBySelectedDate.length > 0
                      ? `${sessionsBySelectedDate.length} buổi`
                      : "Không có buổi nào"}
                  </Typography>
                </Box>

                {sessionsBySelectedDate.length > 0 && (
                  <Chip size="small" label="Danh sách" variant="outlined" />
                )}
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {sessionsBySelectedDate.length === 0 ? (
                <Box
                  sx={{
                    height: 260,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    Không có buổi tư vấn trong ngày.
                  </Typography>
                </Box>
              ) : (
                <List>
                  {sessionsBySelectedDate.map((s) => (
                    <ListItem
                      key={s.id}
                      sx={{
                        mb: 1.5,
                        borderRadius: 2,
                        bgcolor: "#f5f8fb",
                      }}
                    >
                      {/* Time column */}
                      <Box sx={{ minWidth: 80, mr: 2, textAlign: "center" }}>
                        <Typography sx={{ fontWeight: 700, color: "#00838f" }}>
                          {s.parsedTime.format("HH:mm")}
                        </Typography>
                        <Typography variant="caption">
                          {s.parsedTime.format("DD/MM")}
                        </Typography>
                      </Box>

                      {/* Info */}
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 600 }}>
                            {s.topic}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2">
                              <strong>Địa điểm:</strong> {s.location}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Số lượng:</strong> {s.registered}/
                              {s.maxStudents}
                            </Typography>
                          </>
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
