import React from "react";
// Import các icon
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";

// 1. Định nghĩa các Item dùng chung
const COMMON_ITEMS = [
  { text: "Trang chủ", icon: <HomeIcon />, route: "/home" },
  { text: "Cài đặt", icon: <SettingsIcon />, route: "/settings" },
];

// 2. Item riêng của TUTOR
const TUTOR_SPECIFIC = [
  { text: "Đăng ký buổi tư vấn", icon: <AssignmentIcon />, route: "/register" },
  { text: "Buổi tư vấn của tôi", icon: <EventNoteIcon />, route: "/sessions" },
  { text: "Lịch", icon: <CalendarMonthIcon />, route: "/calendar" },
  { text: "Tài liệu", icon: <LibraryBooksIcon />, route: "/documents" },
  { text: "Cài đặt", icon: <SettingsIcon />, route: "/settings" },
  // ... các item khác
];

const STUDENT_SPECIFIC = [
  // ... các item
];

// 3. Item riêng của ADMIN
const ADMIN_SPECIFIC = [
  //   { text: "Quản lý User", icon: <PeopleIcon />, route: "/admin/users" },
  { text: "Cài đặt", icon: <SettingsIcon />, route: "/settings" },
];

const OTHER_SPECIFIC = [
  // ... các item
];

export const MENUS = {
  admin: [...COMMON_ITEMS, ...ADMIN_SPECIFIC],
  tutor: [...COMMON_ITEMS, ...TUTOR_SPECIFIC],
  student: [...COMMON_ITEMS, ...STUDENT_SPECIFIC],
  other: [...COMMON_ITEMS, ...OTHER_SPECIFIC],
};
