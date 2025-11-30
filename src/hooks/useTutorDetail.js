// Hook xử lý toàn bộ logic: tìm session, tìm tutor, phân trang
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TUTORS, TUTOR_SESSIONS } from "../data/tutorData";

const ITEMS_PER_PAGE = 5;

export default function useTutorDetail() {
  // Lấy sessionId từ URL
  const { sessionId } = useParams();

  // 1) Tìm buổi tư vấn hiện tại
  const currentSession =
    TUTOR_SESSIONS.find((s) => s.id === sessionId) || TUTOR_SESSIONS[0];

  // 2) Tìm tutor tương ứng với buổi tư vấn này
  const tutor = TUTORS.find((t) => t.id === currentSession.tutorId) || {
    id: "",
    name: currentSession.tutorName,
    email: "",
    gender: "",
    phone: "",
    subject: currentSession.subject,
  };

  // 3) Lọc ra các buổi tư vấn khác cùng tutor
  const sessionsOfTutor = TUTOR_SESSIONS.filter((s) => s.tutorId === tutor.id);

  // 4) State phân trang
  const [page, setPage] = useState(1);

  // Tổng số trang = tổng số session chia cho ITEMS_PER_PAGE
  const totalPages = Math.max(
    1,
    Math.ceil(sessionsOfTutor.length / ITEMS_PER_PAGE)
  );

  // 5) Tính dữ liệu trang hiện tại
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedSessions = sessionsOfTutor.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return {
    tutor,
    currentSession,
    paginatedSessions,
    page,
    totalPages,
    setPage,
  };
}
