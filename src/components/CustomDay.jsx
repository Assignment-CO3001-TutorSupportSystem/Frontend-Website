// src/components/CustomDay.jsx
import React from "react";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";

const CustomDay = ({ day, sessionsByDate, ...props }) => {
  if (!day) return <PickersDay {...props} />;

  const key = day.format("YYYY-MM-DD");
  const hasSessions = !!sessionsByDate[key];
  const isToday = day.isSame(dayjs(), "day");

  return (
    <PickersDay
      {...props}
      day={day}
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
      }}
    />
  );
};

export default CustomDay;
