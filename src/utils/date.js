import dayjs from "dayjs";

// Hàm format ngày theo DD/MM/YYYY để hiển thị trong input
export const formatDate = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};
