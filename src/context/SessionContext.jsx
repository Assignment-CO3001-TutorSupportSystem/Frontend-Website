// src/context/SessionContext.jsx
import React, { createContext, useContext, useState } from "react";
import { TUTOR_SESSIONS } from "../data/tutorData.js";

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  // Khởi tạo từ TUTOR_SESSIONS có sẵn
  const [sessions, setSessions] = useState(TUTOR_SESSIONS);

  const addSession = (session) => {
    setSessions((prev) => [...prev, session]);
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessions = () => useContext(SessionContext);
