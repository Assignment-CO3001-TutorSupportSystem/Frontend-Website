// src/pages/TutorPage/SimpleCalendar.jsx
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const weekdayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const Calendar = ({ value, onChange }) => {
  const initialDate = value instanceof Date ? value : new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = currentMonth.getDay(); // 0 = Sunday
  const totalDays = daysInMonth(currentMonth);

  const goPrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const goNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const handleSelectDay = (day) => {
    const selected = new Date(year, month, day);
    onChange && onChange(selected);
  };

  const isSelected = (day) => {
    if (!(value instanceof Date)) return false;
    const d = new Date(year, month, day);
    return d.toDateString() === value.toDateString();
  };

  return (
    <Box
      sx={{
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        bgcolor: "white",
        borderRadius: 3,
        p: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header tháng */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton size="small" onClick={goPrevMonth}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography sx={{ fontWeight: 600 }}>
          {currentMonth.toLocaleString("en-US", { month: "long" })} {year}
        </Typography>

        <IconButton size="small" onClick={goNextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Header thứ */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          mb: 1,
        }}
      >
        {weekdayLabels.map((d) => (
          <Typography
            key={d}
            sx={{ fontWeight: 600, color: "#777", fontSize: 12 }}
          >
            {d}
          </Typography>
        ))}
      </Box>

      {/* Grid ngày */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          rowGap: 0.5,
        }}
      >
        {/* ô trống trước ngày 1 */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <Box key={`empty-${i}`} sx={{ height: 32 }} />
        ))}

        {/* các ngày */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);

          return (
            <Box
              key={day}
              onClick={() => handleSelectDay(day)}
              sx={{
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 2,
                fontSize: 13,
                bgcolor: selected ? "#006571" : "transparent",
                color: selected ? "white" : "black",
                "&:hover": !selected ? { bgcolor: "#e5f3f3" } : {},
              }}
            >
              {day}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Calendar;
