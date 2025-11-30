// src/hooks/useTutorSchedule.js
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TUTOR_SESSIONS } from "../data/tutorData.js";

dayjs.extend(customParseFormat);

const CURRENT_TUTOR_ID = "T002";

export const useTutorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const sessionsByDate = useMemo(() => {
    const map = {};
    const sessionsForTutor = TUTOR_SESSIONS.filter(
      (s) => s.tutorId === CURRENT_TUTOR_ID
    );

    sessionsForTutor.forEach((s) => {
      const parsed = dayjs(s.time, "HH:mm DD/MM/YYYY");
      if (!parsed.isValid()) return;
      const key = parsed.format("YYYY-MM-DD");
      if (!map[key]) map[key] = [];
      map[key].push({ ...s, parsedTime: parsed });
    });

    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => a.parsedTime.valueOf() - b.parsedTime.valueOf());
    });

    return map;
  }, []);

  const selectedKey = selectedDate.format("YYYY-MM-DD");
  const sessionsForSelectedDay = sessionsByDate[selectedKey] || [];

  return {
    selectedDate,
    setSelectedDate,
    selectedKey,
    sessionsBySelectedDate: sessionsForSelectedDay,
    sessionsByDate,
  };
};
