// hooks/useRegisterConsultation.js
import { useState } from "react";
import dayjs from "dayjs";
import { formatDate } from "../utils/date";
import { useSessions } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

// 📌 Hook tách biệt toàn bộ logic của form đăng ký tư vấn
export const useRegisterConsultation = () => {
  // State lưu dữ liệu form
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: dayjs(),
    timeSlot: "",
    duration: "",
    quantity: "",
  });

  // Quản lý mở / tắt calendar chọn ngày
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Trạng thái đang submit
  const [submitting, setSubmitting] = useState(false);

  const { addSession } = useSessions();
  const navigate = useNavigate();

  // 📌 Hàm thay đổi field chung
  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // 📌 Hàm chọn ngày từ calendar
  const handleDateChange = (newDate) => {
    setForm((prev) => ({ ...prev, date: newDate }));
    setCalendarOpen(false);
  };

  // 📌 Hàm submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Kiểm tra dữ liệu
    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.timeSlot.trim() ||
      !form.duration.trim() ||
      !form.quantity
    ) {
      alert("Vui lòng nhập đầy đủ thông tin buổi tư vấn.");
      return;
    }

    setSubmitting(true);

    // 2) Tạo session mới để demo
    const newSession = {
      id: `S_NEW_${Date.now()}`,
      tutorId: "T002",
      tutorName: "Trần Thị B",
      topic: form.title,
      subject: "Vật lý đại cương",
      status: "Còn nhận",
      time: `${form.timeSlot} ${formatDate(form.date)}`,
      location: form.location,
      maxStudents: Number(form.quantity),
      registered: 0,
    };

    // 3) Lưu vào context
    addSession(newSession);

    // 4) Điều hướng về trang danh sách
    alert("Đăng ký buổi tư vấn thành công!");
    navigate("/tutor/T002/sessions");

    setSubmitting(false);
  };

  return {
    form,
    submitting,
    calendarOpen,
    setCalendarOpen,
    handleFieldChange,
    handleDateChange,
    handleSubmit,
  };
};
