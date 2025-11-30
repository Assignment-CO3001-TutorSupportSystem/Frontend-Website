// src/hooks/useTutorSchedule.js
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TUTOR_SESSIONS } from "../data/tutorData.js";

dayjs.extend(customParseFormat);

// ID giả định của gia sư hiện tại đang đăng nhập
const CURRENT_TUTOR_ID = "T002";

export const useTutorSchedule = () => {
  // Quản lý trạng thái ngày đang được chọn trên lịch, mặc định là ngày hiện tại
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Xử lý dữ liệu thô: Lọc, nhóm và sắp xếp các buổi dạy theo ngày
  // Sử dụng useMemo để ghi nhớ kết quả, tránh tính toán lại mỗi khi render trừ khi dependency thay đổi
  const sessionsByDate = useMemo(() => {
    const map = {};

    // Lọc ra các buổi dạy chỉ thuộc về gia sư hiện tại (CURRENT_TUTOR_ID)
    const sessionsForTutor = TUTOR_SESSIONS.filter(
      (s) => s.tutorId === CURRENT_TUTOR_ID
    );

    // Duyệt qua từng buổi dạy để nhóm chúng vào object theo key là ngày (YYYY-MM-DD)
    sessionsForTutor.forEach((s) => {
      // Chuyển đổi chuỗi thời gian sang đối tượng dayjs để xử lý
      const parsed = dayjs(s.time, "HH:mm DD/MM/YYYY");
      if (!parsed.isValid()) return; // Bỏ qua nếu dữ liệu thời gian không hợp lệ

      // Tạo key định dạng YYYY-MM-DD để làm khóa cho map
      const key = parsed.format("YYYY-MM-DD");
      if (!map[key]) map[key] = [];

      // Thêm buổi dạy vào danh sách của ngày tương ứng
      map[key].push({ ...s, parsedTime: parsed });
    });

    // Sắp xếp các buổi dạy trong từng ngày theo thứ tự thời gian tăng dần
    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => a.parsedTime.valueOf() - b.parsedTime.valueOf());
    });

    return map;
  }, []);

  // Chuyển đổi ngày đang chọn thành chuỗi format YYYY-MM-DD để tra cứu trong map
  const selectedKey = selectedDate.format("YYYY-MM-DD");

  // Lấy danh sách các buổi dạy tương ứng với ngày đang chọn (trả về mảng rỗng nếu không có)
  const sessionsForSelectedDay = sessionsByDate[selectedKey] || [];

  return {
    selectedDate,
    setSelectedDate,
    selectedKey,
    sessionsBySelectedDate: sessionsForSelectedDay, // Danh sách buổi dạy của ngày đang chọn
    sessionsByDate, // Toàn bộ map dữ liệu đã xử lý (dùng để đánh dấu trên lịch)
  };
};
